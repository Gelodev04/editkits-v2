import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoUpload } from '@/components/VideoUpload';
import UploadFileModal from '@/components/modals/UploadFileModal';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import { HiOutlineVideoCamera, HiOutlineAdjustments, HiArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ComponentToolCard from '@/components/ComponentToolCard';
import ErrorModal from '@/components/modals/ErrorModal';
import { HeaderToolInput, HeaderToolProperties } from '@/components/HeaderTool';
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import { useInitJobMutation, useCommitJobMutation, useJobStatusQuery } from '@/services/api/job';
import OutputQualityVideo from '@/components/OutputQualityVideo';

export default function CropVideo() {
  const [fileId, setFileId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [upload] = useUploadMutation();
  const { data: fileData, refetch: refetchFile } = useStatusQuery({ fileId }, { skip: !fileId });
  const { data: jobData, refetch: refetchJob } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );
  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();

  const [settings, setSettings] = useState({
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
  });
  const [touched, setTouched] = useState({ x: false, y: false, width: false, height: false });
  const [formAttempted, setFormAttempted] = useState(false);
  const [fetchedMeta, setFetchedMeta] = useState<ImageMeta | null>(null);
  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [fetchedData, setFetchedData] = useState(null);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [clearInfo, setClearInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const touch = key => {
    setTouched(prev => ({ ...prev, [key]: true }));
  };

  const shouldError = key => {
    const val = settings[key];
    return (touched[key] || formAttempted) && (val === undefined || isNaN(val));
  };

  interface ImageMeta {
    width: number;
    height: number;
  }

  // Function to reset just UI states but not file-related data
  const resetUiStates = () => {
    setSettings({ x: undefined, y: undefined, width: undefined, height: undefined });
    setTouched({ x: false, y: false, width: false, height: false });
    setFormAttempted(false);
  };

  // Function to reset all states
  const resetAllStates = () => {
    setFile(null);
    setFileId(null);
    setJobId(null);
    setFetchedMeta(null);
    setFetchedData(null);
    resetUiStates();
    setProgress(0);
    setClearInfo(true);

    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  // Handle file changes properly, with delay between clearing and setting
  const handleFileChange = newFile => {
    if (newFile !== file) {
      // Clear previous file data immediately
      setFile(null);
      setFetchedMeta(null);
      setFileId(null);
      setProgress(0);

      // Then set the new file after a short delay
      setTimeout(() => {
        setFile(newFile);
        setClearInfo(false); // Important to reset clearInfo flag
      }, 50);
    }
  };

  // Poll file status and fetch metadata
  useEffect(() => {
    if (!fileId || isUploading) return;

    const interval = setInterval(() => {
      const shouldContinuePolling =
        !fileData?.status ||
        (fileData.status !== 'COMMITTED' && fileData.status !== 'ERROR') ||
        !fileData?.metadata;

      if (shouldContinuePolling) {
        refetchFile();
      }

      if (fileData?.metadata) {
        console.log('File data:', fileData);
        setFetchedMeta(fileData.metadata);
        setFetchedData(fileData);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [fileId, fileData, refetchFile, isUploading]);

  // Poll job status and reset on completion
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(() => {
      if (
        jobData?.status !== 'COMMITTED' &&
        jobData?.status !== 'ERROR' &&
        jobData?.status !== 'COMPLETED' &&
        jobData?.status !== 'FAILED' &&
        jobData?.status !== 'CANCELLED'
      ) {
        refetchJob();
      } else if (jobData?.status === 'FAILED') {
        clearInterval(interval);
        setErrorMessage('Job failed');
        setErrorModalOpen(true);
        setProgressModalOpen(false);
      } else if (jobData?.status === 'ERROR') {
        clearInterval(interval);
        setErrorMessage('An Error Occured');
        setErrorModalOpen(true);
        setProgressModalOpen(false);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId, jobData?.status, refetchJob]);

  // Add a new useEffect to monitor job status changes and reset when completed
  useEffect(() => {
    // Check if job has completed, failed, or been cancelled
    if (
      jobData?.status === 'COMPLETED' ||
      jobData?.status === 'FAILED' ||
      jobData?.status === 'CANCELLED' ||
      jobData?.status === 'ERROR'
    ) {
      // Don't reset immediately to allow user to see the completion status
      // Only reset all states after modal is closed to ensure thumbnail remains visible
      if (!progressModalOpen) {
        resetAllStates();
      }
    }
  }, [jobData?.status, progressModalOpen]);

  const handleCrop = async () => {
    setFormAttempted(true);
    const { x, y, width, height } = settings;
    if ([x, y, width, height].some(v => v === undefined || isNaN(v))) {
      toast.error('All crop fields are required');
      return;
    }

    try {
      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_CROP',
            properties: {
              input: fileId,
              x,
              y,
              width,
              height,
            },
          },
        ],
        output_properties: {
          output_quality: outputQuality,
          video_output_format: videoContainer,
        },
      });

      if (response.error) {
        throw response.error;
      }

      toast.success('Job initialized successfully');
      setProgressModalOpen(true);
      setUploadModalOpen(false);

      // Store job ID before resetting other states
      const jid = response.data.job_id;
      setJobId(jid);

      // Only reset UI state but keep the data needed for the progress modal
      resetUiStates();
      setFile(null);
      setFileId(null);
      setProgress(0);
      setClearInfo(true);

      const commitResp = await commitJob({ job_id: jid });
      if (commitResp.error) throw commitResp.error;
      toast.success('Crop job committed');
    } catch (err) {
      if (err) {
        console.error('Error processing video:', err);
        const apiError = err as any;
        const msg = apiError?.data?.errorMsg || (err as Error).message || 'Failed to crop video';
        const errLog = apiError?.data?.errorLog || apiError?.error || 'No error log available';
        setErrorLog(errLog);
        setErrorMessage(msg);
        setErrorModalOpen(true);
        setProgressModalOpen(false);
      }
    }
  };

  return (
    <ComponentToolCard title="Crop Video">
      <div className="relative z-10 px-8 py-8 ">
        <div className="mb-10">
          <HeaderToolInput>
            <HiOutlineVideoCamera size={20} />
          </HeaderToolInput>
          <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
            <VideoUpload
              videoRef={videoRef}
              file={file}
              setUploadFileModal={setUploadModalOpen}
              uploadedData={fileData}
              progress={progress}
              fetchedData={fetchedMeta ? { metadata: fetchedMeta } : undefined}
              isUploading={isUploading}
              clearFileInfo={clearInfo}
            />
          </motion.div>
        </div>

        <div className="mb-10">
          <HeaderToolProperties >
          <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {['x', 'y'].map(key => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {key === 'x' ? 'X-Coordinate' : key === 'y' ? 'Y-Coordinate' : key}
                  </label>
                  <input
                    type="number"
                    disabled={!fetchedMeta}
                    value={settings[key] !== undefined ? settings[key] : ''}
                    placeholder={
                      (fetchedMeta as any)
                        ? `0 to ${key === 'x' ? fetchedMeta?.width : fetchedMeta?.height}`
                        : 'Enter value'
                    }
                    onChange={e => {
                      touch(key);
                      const value =
                        e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                      updateSetting(key, value);
                    }}
                    className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                      shouldError(key)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                    } rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none`}
                  />
                  {shouldError(key) && (
                    <p className="mt-1 text-sm text-red-500">{key} is required</p>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {['width', 'height'].map(key => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {key === 'width' ? 'Width' : key === 'height' ? 'Height' : key}
                  </label>
                  <input
                    type="number"
                    disabled={!fetchedMeta}
                    value={settings[key] !== undefined ? settings[key] : ''}
                    placeholder={fetchedMeta ? `Max ${fetchedMeta[key]}` : 'Enter value'}
                    onChange={e => {
                      touch(key);
                      const value =
                        e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                      updateSetting(key, value);
                    }}
                    className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                      shouldError(key)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                    }rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none `}
                  />
                  {shouldError(key) && (
                    <p className="mt-1 text-sm text-red-500">{key} is required</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          </HeaderToolProperties>
        </div>

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
            <OutputQualityVideo
              file={file}
              isUploading={isUploading}
              fetchedData={fetchedData}
              outputQuality={outputQuality}
              setOutputQuality={setOutputQuality}
              videoContainer={videoContainer}
              setVideoContainer={setVideoContainer}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button disabled={!fetchedMeta} onClick={handleCrop}>
            Process <HiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {uploadModalOpen && (
        <UploadFileModal
          videoRef={videoRef}
          uploadModal={uploadModalOpen}
          setUploadModal={setUploadModalOpen}
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
      {progressModalOpen && (
        <FileProgressModal
          progressModal={progressModalOpen}
          setProgressModal={setProgressModalOpen}
          data={jobData}
          reset={resetAllStates}
        />
      )}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
        errorLog={errorLog}
      />
    </ComponentToolCard>
  );
}
