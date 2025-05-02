import * as React from 'react';
import { useRef, useState } from 'react';
import { FaPlay, FaScissors } from 'react-icons/fa6';
import { motion } from 'framer-motion';
// // import Typography from '@/components/Typography';
// import Button from '@/components/Button_Old';
import UploadFileModal from '@/components/modals/UploadFileModal';
// import TextField from '@/components/TextField';
// import Select from '@/components/Select';
import { outputQualityList, videoType } from '@/lib/constants';
import { VideoUpload } from '@/components/VideoUpload';
import { useEffect } from 'react';
// import { CalendarIcon, ClockIcon, UploadIcon } from '@/components/Icons';
import {
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineAdjustments,
  // HiOutlinePhotograph,
  HiOutlineCheck,
} from 'react-icons/hi';

import toast from 'react-hot-toast';

// Import the dedicated components
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import GradientHeading from '@/components/Typography/GradientHeading';
import { useCommitJobMutation, useInitJobMutation, useJobStatusQuery } from '@/services/api/job';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';

export default function TrimVideo() {
  const [fileId, setFileId] = React.useState(null);
  const [jobId, setJobId] = React.useState(null);
  const [upload] = useUploadMutation();
  const { data, refetch } = useStatusQuery({ fileId }, { skip: !fileId });
  const { data: jobData, refetch: refetchJobData } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );
  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();

  const [uploadFileModal, setUploadFileModal] = React.useState<any>(false);
  const [progressModal, setProgressModal] = React.useState<any>(false);
  const [file, setFile] = React.useState<any>(null);
  const [startTime, setStartTime] = React.useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const videoRef = useRef(null);

  const [fetchedData, setFetchedData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState('Medium');
  const [videoContainer, setVideoContainer] = useState('mp4');

  // const [uploadedModal, setUploadedModal] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      //@ts-ignore
      if (data?.status !== 'COMMITTED' && data?.status !== 'ERROR' && fileId) {
        refetch();
      }
      // @ts-ignore
      setFetchedData(data);
      console.log('data', data);
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

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
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
    // @ts-ignore
  }, [jobId, jobData?.status]);

  async function handleTrimVideo() {
    try {
      console.log('startTime', startTime);
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
        toast.error('Failed to initialize job');
        return;
      }

      toast.success('Job initialized successfully');
      setProgressModal(true);

      const { job_id }: any = response.data;
      setJobId(job_id);

      await handleCommitJob(job_id);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  }

  async function handleCommitJob(jobId) {
    if (!jobId) {
      toast.error('Invalid job ID');
      return;
    }

    try {
      const response = await commitJob({ job_id: jobId });

      if (response.error) {
        console.error('Error committing job:', response.error);
        // @ts-ignore
        toast.error(response.error.errMsg || 'Failed to commit job');
        return;
      }

      toast.success('Job committed successfully');
    } catch (error) {
      console.error('Unexpected error in commit:', error);
      toast.error('An unexpected error occurred while committing');
    }
  }

  return (
    <div className="max-w-[900px] px-4 sm:px-8 lg:px-12 mx-auto py-6 sm:py-12">
      {/* Main Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        {/* <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-full -mr-28 -mt-28 z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-50/60 to-blue-50/60 rounded-full -ml-28 -mb-28 z-0" /> */}

        {/* Header */}
        <div className="relative z-10 pt-8 pb-4 px-8 border-b border-gray-100">
          <GradientHeading
            text="Trim Video"
            subtext="Quickly cut unwanted sections from your video to enhance its flow and impact"
            icon={<FaScissors size={18} />}
            fromColor="blue-600"
            toColor="purple-700"
          />
        </div>

        <div className="relative z-10 px-8 py-8">
          {/* Input Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-3">
                <HiOutlineVideoCamera size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Input Video</h2>
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
              />
            </motion.div>
          </div>

          {/* Timeline Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-3">
                <HiOutlineClock size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Edit Timeline</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full">
                  <label
                    htmlFor="start-time"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Time (seconds)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <HiOutlineClock size={18} />
                    </div>
                    <input
                      id="start-time"
                      type="number"
                      value={startTime || ''}
                      onChange={e => setStartTime(e.target.value)}
                      disabled={!file}
                      placeholder="0"
                      className="pl-10 text-black pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="end-time"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Time (seconds)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <HiOutlineClock size={18} />
                    </div>
                    <input
                      id="end-time"
                      type="number"
                      value={endTime || ''}
                      onChange={e => setEndTime(e.target.value)}
                      disabled={!file}
                      placeholder="10"
                      className="pl-10 text-black pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-700 flex items-center"
                >
                  <div className="rounded-full bg-blue-100 p-2 mr-3 flex-shrink-0">
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
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-3">
                <HiOutlineAdjustments size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Output Settings</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="w-full">
                  <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                    Output Quality
                  </label>
                  <div className="relative">
                    <select
                      id="quality"
                      disabled={!file}
                      value={outputQuality}
                      onChange={e => setOutputQuality(e.target.value)}
                      className="w-full text-black pl-4 pr-10 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all outline-none"
                    >
                      <option value="">Select quality</option>
                      {outputQualityList.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
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
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                    Video Format
                  </label>
                  <div className="relative">
                    <select
                      id="format"
                      disabled={!file}
                      value={videoContainer}
                      onChange={e => setVideoContainer(e.target.value)}
                      className="w-full text-black pl-4 pr-10 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all outline-none"
                    >
                      <option value="">Select format</option>
                      {videoType.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
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
              disabled={!file || !startTime || !endTime}
              onClick={handleTrimVideo}
              className={`px-10 py-4 rounded-xl font-medium text-white flex items-center shadow-lg transition-all ${
                !file || !startTime || !endTime
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Process Video
              {/* <HiOutlineCheck className="ml-2" size={20} /> */}
            </Button>
          </div>
        </div>
      </motion.div>

      <UploadFileModal
        videoRef={videoRef}
        uploadModal={uploadFileModal}
        setUploadModal={setUploadFileModal}
        file={file}
        setFile={setFile}
        upload={upload}
        setFileId={setFileId}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        setProgress={setProgress}
      />
      <FileProgressModal
        progressModal={progressModal}
        setProgressModal={setProgressModal}
        data={jobData}
        fetchedData={fetchedData}
      />
    </div>
  );
}
