import * as React from 'react';
import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import UploadFileModal from '@/components/modals/UploadFileModal';
import { outputQualityList, videoType } from '@/lib/constants';
import { VideoUpload } from '@/components/VideoUpload';
import { useEffect } from 'react';
import {
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineAdjustments,
  HiArrowRight,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import { useCommitJobMutation, useInitJobMutation, useJobStatusQuery } from '@/services/api/job';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import ComponentToolCard from '@/components/ComponentToolCard';
import ErrorModal from '@/components/modals/ErrorModal';

// Define interface for metadata
interface FileMetadata {
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    size?: number;
    thumbnail_url?: string;
    [key: string]: any;
  };
  status?: string;
  [key: string]: any;
}

export default function TrimVideo() {
  const [fileId, setFileId] = React.useState<string | null>(null);
  const [jobId, setJobId] = React.useState(null);
  const [upload] = useUploadMutation();
  const { data: _data, refetch } = useStatusQuery({ fileId }, { skip: !fileId });
  const data = fileId ? _data : null;
  const { data: jobData, refetch: refetchJobData } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );
  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();
  const [uploadFileModal, setUploadFileModal] = React.useState<boolean>(false);
  const [progressModal, setProgressModal] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<any>(null);
  const [startTime, setStartTime] = React.useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const videoRef = useRef(null);
  const [startTimeTouched, setStartTimeTouched] = useState(false);
  const [endTimeTouched, setEndTimeTouched] = useState(false);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [clearFileInfo, setClearFileInfo] = React.useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<FileMetadata | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to reset all states when a new file is uploaded
  const resetStates = () => {
    setStartTime(null);
    setEndTime(null);
    setOutputQuality('MEDIUM');
    setVideoContainer('mp4');
    setFetchedData(null);
    setStartTimeTouched(false);
    setEndTimeTouched(false);
    setFormSubmitAttempted(false);
    setProgressModal(false);
    setFile(null);
    setFileId(null);
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.src = '';
    }
  };

  // Reset states when uploading starts
  useEffect(() => {
    if (isUploading) {
      setFileId(null);
      // Immediately clear any data to prevent old thumbnails from showing
      setFetchedData(null);
      setProgress(0);
    }
  }, [isUploading]);

  // Watch for file changes in the UploadFileModal
  const handleFileChange = newFile => {
    if (newFile !== file) {
      // Clear previous file data immediately
      setFile(null);
      setFetchedData(null);
      setFileId(null);
      setProgress(0);

      // Then set the new file
      setTimeout(() => {
        setFile(newFile);
        // Reset the clearFileInfo flag when a new file is selected
        setClearFileInfo(false);
      }, 50);
    }
  };

  useEffect(() => {
    if (isUploading) return;
    const interval = setInterval(() => {
      console.log(data);
      //@ts-ignore
      if (data?.status !== 'COMMITTED' && data?.status !== 'ERROR' && fileId) {
        refetch();
        return;
      }
      setFetchedData(data);
      clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, [data, refetch, fileId, isUploading]);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(() => {
      if (
        // @ts-ignore
        jobData?.status !== 'COMMITTED' &&
        // @ts-ignore
        jobData?.status !== 'ERROR' &&
        // @ts-ignore
        jobData?.status !== 'COMPLETED' &&
        // @ts-ignore
        jobData?.status !== 'FAILED' &&
        // @ts-ignore
        jobData?.status !== 'CANCELLED'
      ) {
        refetchJobData();
      } else if (jobData?.status === 'FAILED') {
        clearInterval(interval);
        setErrorMessage('Job failed');
        setErrorModalOpen(true);
        setProgressModal(false);
      } else if (jobData?.status === 'ERROR') {
        clearInterval(interval);
        setErrorMessage('An Error Occured');
        setErrorModalOpen(true);
        setProgressModal(false);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
    // @ts-ignore
  }, [jobId, jobData?.status, refetchJobData]);

  async function handleTrimVideo() {
    try {
      // Set form submission attempted flag to true to show errors
      setFormSubmitAttempted(true);

      // Check if required fields are filled
      if (!startTime || !endTime) {
        toast.error('Please fill in all required fields');
        return;
      }

      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_TRIM',
            properties: {
              input: fileId,
              start_time: startTime,
              end_time: endTime,
            },
          },
        ],
        output_properties: {
          output_quality: outputQuality,
          video_output_format: videoContainer,
        },
      });

      if (response.error) {
        console.error('Error initializing job:', response.error);
        // Show the error message from the response if available, otherwise show a generic message
        const errorMsg =
          (response.error as any).data?.errorMsg ||
          (response.error as any).errMsg ||
          'Failed to initialize job';
        setErrorMessage(errorMsg);
        setErrorModalOpen(true);
        return;
      }

      toast.success('Job initialized successfully');
      setProgressModal(true);
      setUploadFileModal(false);

      const { job_id } = response.data;
      setJobId(job_id);

      await handleCommitJob(job_id);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An unexpected error occurred');
        setErrorModalOpen(true);
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred');
        setErrorModalOpen(true);
      }
    }
  }

  async function handleCommitJob(jobId) {
    if (!jobId) {
      setErrorMessage('Invalid job ID');
      setErrorModalOpen(true);
      return;
    }

    try {
      const response = await commitJob({ job_id: jobId });

      if (response.error) {
        console.error('Error committing job:', response.error);
        // Get the error message from the response if available
        const errorMsg =
          (response.error as any).data?.errorMsg ||
          (response.error as any).errMsg ||
          'Failed to commit job';
        setErrorMessage(errorMsg);
        setProgressModal(false);
        setErrorModalOpen(true);
        return;
      }

      toast.success('Job committed successfully');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An unexpected error occurred');
        setErrorModalOpen(true);
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred');
        setErrorModalOpen(true);
      }
    }
  }

  // Helper to determine if we should show error state
  const shouldShowError = (value, fieldTouched) => {
    return (fieldTouched || formSubmitAttempted) && !value;
  };

  return (
    <ComponentToolCard title="Trim Video">
      <div className="relative z-10 px-8 py-8">
        {/* Input Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              <HiOutlineVideoCamera size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Input</h2>
          </div>

          <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
            <VideoUpload
              videoRef={videoRef}
              file={file}
              setUploadFileModal={setUploadFileModal}
              uploadedData={data}
              progress={progress}
              fetchedData={fetchedData}
              isUploading={isUploading}
              clearFileInfo={clearFileInfo}
            />
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              <HiOutlineClock size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Tool Properties
            </h2>
          </div>

          <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full">
                <label
                  htmlFor="start-time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Start Time (seconds)
                </label>
                <div className="flex flex-col">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                      <HiOutlineClock size={18} />
                    </div>
                    <input
                      id="start-time"
                      type="number"
                      value={startTime || ''}
                      onChange={e => {
                        setStartTime(e.target.value);
                        setStartTimeTouched(true);
                      }}
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      placeholder="0"
                      className={`pl-10 text-black dark:text-white bg-white dark:bg-gray-800 pr-4 py-3 w-full border ${
                        shouldShowError(startTime, startTimeTouched)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                      } rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none`}
                    />
                  </div>
                  {shouldShowError(startTime, startTimeTouched) && (
                    <p className="mt-1 text-sm text-red-500">Start time is required</p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="end-time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  End Time (seconds)
                </label>
                <div className="flex flex-col">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                      <HiOutlineClock size={18} />
                    </div>
                    <input
                      id="end-time"
                      type="number"
                      value={endTime || ''}
                      onChange={e => {
                        setEndTime(e.target.value);
                        setEndTimeTouched(true);
                      }}
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      placeholder="10"
                      className={`pl-10 text-black dark:text-white bg-white dark:bg-gray-800 pr-4 py-3 w-full border ${
                        shouldShowError(endTime, endTimeTouched)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                      } rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none`}
                    />
                  </div>
                  {shouldShowError(endTime, endTimeTouched) && (
                    <p className="mt-1 text-sm text-red-500">End time is required</p>
                  )}
                </div>
              </div>
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden sm:flex mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 items-center"
              >
                <div className="rounded-full bg-blue-100 dark:bg-blue-800/50 p-2 mr-3 flex-shrink-0">
                  <FaPlay size={12} />
                </div>
                <p className="text-sm">
                  <span className="font-medium">Pro tip:</span> For precise trimming, play your
                  video and note the exact timestamps for clean cuts.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              <HiOutlineAdjustments size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Output Settings
            </h2>
          </div>

          <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="w-full">
                <label
                  htmlFor="quality"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Output Quality
                </label>
                <div className="relative">
                  <select
                    id="quality"
                    disabled={!file || isUploading || !fetchedData?.metadata}
                    value={outputQuality}
                    defaultValue={outputQuality}
                    onChange={e => setOutputQuality(e.target.value)}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  >
                    {outputQualityList.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="format"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Video Format
                </label>
                <div className="relative">
                  <select
                    id="format"
                    disabled={!file || isUploading || !fetchedData?.metadata}
                    value={videoContainer}
                    defaultValue={videoContainer}
                    onChange={e => setVideoContainer(e.target.value)}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  >
                    {videoType.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            disabled={!file || !startTime || !endTime || isUploading || !fetchedData?.metadata}
            onClick={handleTrimVideo}
          >
            Process <HiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      {/* // </motion.div> */}

      {uploadFileModal && (
        <UploadFileModal
          videoRef={videoRef}
          uploadModal={uploadFileModal}
          setUploadModal={setUploadFileModal}
          file={file}
          setFile={handleFileChange}
          upload={upload}
          setFileId={setFileId}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setProgress={setProgress}
          progress={progress}
        />
      )}
      <FileProgressModal
        progressModal={progressModal}
        setProgressModal={setProgressModal}
        reset={resetStates}
        data={jobData}
      />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </ComponentToolCard>
  );
}
