import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import {
  HiOutlineVideoCamera,
  HiOutlineAdjustments,
  HiArrowRight,
  HiOutlineColorSwatch,
} from 'react-icons/hi';

import { HiPlus } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ComponentToolCard from '@/components/ComponentToolCard';
import ErrorModal from '@/components/modals/ErrorModal';
import { HeaderToolInput, HeaderToolProperties } from '@/components/HeaderTool';
import { useStatusQuery, useUploadMutation, useLazyStatusQuery } from '@/services/api/file';
import { useInitJobMutation, useCommitJobMutation, useJobStatusQuery } from '@/services/api/job';
import OutputQualityVideo from '@/components/OutputQualityVideo';
import UploadMultipleFileModal from '@/components/modals/UploadMultipleFileModal';
import { VideoMultipleUpload } from '@/components/VideoMultipleUpload';

export default function JoinMedia() {
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [upload] = useUploadMutation();

  // Add lazy status query hook for manually fetching file status
  const [triggerStatusQuery] = useLazyStatusQuery();

  // Only fetch status for the selected file
  const { data: fileData } = useStatusQuery(
    { fileId: fileIds[selectedFileIndex] },
    { skip: !fileIds[selectedFileIndex] }
  );

  const { data: jobData, refetch: refetchJob } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );

  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();

  // Output settings
  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  // Join video settings from VJoinProperties
  const [settings, setSettings] = useState({
    outputWidth: 1280,
    outputHeight: 720,
    stretchStrategy: 'fit',
    backgroundColor: '#000000',
    frameRate: 30,
    isColorValid: true,
  });
  const [touched, setTouched] = useState({
    outputWidth: false,
    outputHeight: false,
    frameRate: false,
  });
  const [formAttempted, setFormAttempted] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
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
    return (touched[key] || formAttempted) && (val === undefined || isNaN(val) || val <= 0);
  };

  const handleColorChange = e => {
    const newColor = e.target.value;
    updateSetting('backgroundColor', newColor);
    updateSetting('isColorValid', /^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

  // Function to reset all states
  const resetAllStates = () => {
    setFiles([]);
    setFileIds([]);
    setJobId(null);
    setFetchedData([]);
    setDurations([]);
    setProgress(0);
    setClearInfo(true);
    setSelectedFileIndex(0);
    setUploadIndex(0);
    setSettings({
      outputWidth: 1280,
      outputHeight: 720,
      stretchStrategy: 'fit',
      backgroundColor: '#000000',
      frameRate: 30,
      isColorValid: true,
    });
    setTouched({
      outputWidth: false,
      outputHeight: false,
      frameRate: false,
    });
    setFormAttempted(false);

    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  // Handle adding a new file
  const handleFileChange = (newFile: any, index: number) => {
    if (!newFile) return;

    // Create new files array with updated file at index
    const newFiles = [...files];
    newFiles[index] = newFile;
    setFiles(newFiles);

    // Ensure fetchedData array is expanded to match file array length
    const newFetchedData = [...fetchedData];
    while (newFetchedData.length < newFiles.length) {
      newFetchedData.push(null);
    }

    // Explicitly set the data for this index to null to clear previous data
    newFetchedData[index] = null;
    setFetchedData(newFetchedData);

    // Initialize duration for image files
    if (newFile.type.startsWith('image/')) {
      const newDurations = [...durations];
      newDurations[index] = 5; // Default 5 seconds
      setDurations(newDurations);
    }

    setClearInfo(false);
  };

  // Handle removing a file
  const handleRemoveFile = (index: number) => {
    // Create a copy of the arrays
    const newFiles = [...files];
    const newFileIds = [...fileIds];
    const newDurations = [...durations];
    const newFetchedData = [...fetchedData];

    // Remove the file and its associated data
    newFiles.splice(index, 1);
    newFileIds.splice(index, 1);
    newDurations.splice(index, 1);
    newFetchedData.splice(index, 1);

    // Update state
    setFiles(newFiles);
    setFileIds(newFileIds);
    setDurations(newDurations);
    setFetchedData(newFetchedData);

    // Adjust selected index if needed
    if (selectedFileIndex >= newFiles.length) {
      setSelectedFileIndex(Math.max(0, newFiles.length - 1));
    }

    // If we removed the last file, set clearInfo to true
    if (newFiles.length === 0) {
      setClearInfo(true);
    }
  };

  // Reorder files
  const reorderFiles = (startIndex: number, endIndex: number) => {
    // Create copies of all arrays
    const newFiles = [...files];
    const newFileIds = [...fileIds];
    const newDurations = [...durations];
    const newFetchedData = [...fetchedData];

    // Reorder files
    const [movedFile] = newFiles.splice(startIndex, 1);
    newFiles.splice(endIndex, 0, movedFile);

    // Reorder fileIds if we have them
    if (newFileIds.length > 0) {
      const [movedFileId] = newFileIds.splice(startIndex, 1);
      newFileIds.splice(endIndex, 0, movedFileId);
    }

    // Reorder durations if we have them
    if (newDurations.length > 0) {
      const [movedDuration] = newDurations.splice(startIndex, 1);
      newDurations.splice(endIndex, 0, movedDuration);
    }

    // Reorder fetchedData if we have them
    if (newFetchedData.length > 0) {
      const [movedMeta] = newFetchedData.splice(startIndex, 1);
      newFetchedData.splice(endIndex, 0, movedMeta);
    }

    // Update state
    setFiles(newFiles);
    setFileIds(newFileIds);
    setDurations(newDurations);
    setFetchedData(newFetchedData);

    // Update selected index to follow the moved item
    if (selectedFileIndex === startIndex) {
      setSelectedFileIndex(endIndex);
    }
  };

  // Update file ID after upload
  const updateFileId = (fileId: string, index: number) => {
    const newFileIds = [...fileIds];
    newFileIds[index] = fileId;
    setFileIds(newFileIds);

    // Clear the fetchedData for this index to prevent showing previous data
    const newFetchedData = [...fetchedData];
    newFetchedData[index] = null;
    setFetchedData(newFetchedData);
  };

  // Poll file status and fetch metadata for each file using RTK
  useEffect(() => {
    console.log('isUploading', isUploading);
    if (isUploading || fileIds.length === 0) return;

    const interval = setInterval(async () => {
      let statusofFile = true;

      const promises = fileIds.map((fileId, index) => {
        if (!fileId) return Promise.resolve();

        return (async () => {
          try {
            const result = await triggerStatusQuery({ fileId });
            const data = result.data;

            if (data.status !== 'COMMITTED' && data.status !== 'ERROR') {
              statusofFile = false;
            }

            if (data && data.metadata) {
              // Use functional update to avoid stale closure issues
              setFetchedData(prevData => {
                const newData = [...prevData];
                newData[index] = data;
                return newData;
              });
            }
          } catch (error) {
            console.error(`Error fetching status for file ${fileId}:`, error);
          }
        })();
      });

      await Promise.all(promises);

      if (!isUploading && statusofFile) {
        console.log('statusofFile', statusofFile);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isUploading, fileIds, triggerStatusQuery]);

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

  const handleJoinVideos = async () => {
    setFormAttempted(true);

    if (files.length < 2) {
      toast.error('Please upload at least 2 files to join');
      return;
    }

    // Check if we have fileIds for all files
    if (fileIds.length !== files.length || fileIds.some(id => !id)) {
      toast.error('Some files are still uploading or processing');
      return;
    }

    // Check if all image files have durations set
    const allDurationsSet = files.every(
      (file, index) => !file.type.startsWith('image/') || (durations[index] && durations[index] > 0)
    );

    if (!allDurationsSet) {
      toast.error('Please set durations for all image files');
      return;
    }

    // Validate required settings
    const { outputWidth, outputHeight, frameRate } = settings;
    if ([outputWidth, outputHeight, frameRate].some(v => v === undefined || isNaN(v) || v <= 0)) {
      toast.error('All output settings are required and must be positive numbers');
      return;
    }

    try {
      // console.log('fileIds', fileIds);

      console.log('files', files);
      // Prepare input array for the VIDEO_JOIN tool with proper structure
      const input_data = fileIds.map((fileId, index) => {
        const input: any = {
          input: fileId,
        };

        // Only add duration for image files
        if (files[index] && files[index].type.startsWith('image/')) {
          input.duration = durations[index];
        }

        return input;
      });

      console.log('input_data', input_data);

      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_JOIN',
            properties: {
              input_data,
              output_width: settings.outputWidth,
              output_height: settings.outputHeight,
              stretch_strategy: settings.stretchStrategy,
              background_color: settings.backgroundColor,
              frame_rate: settings.frameRate,
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

      const commitResp = await commitJob({ job_id: jid });
      if (commitResp.error) throw commitResp.error;
      toast.success('Join job committed');
    } catch (err) {
      if (err) {
        console.error('Error processing video:', err);
        const apiError = err as any;
        const msg = apiError?.data?.errorMsg || (err as Error).message || 'Failed to join videos';
        const errLog = apiError?.data?.errorLog || apiError?.error || 'No error log available';
        setErrorLog(errLog);
        setErrorMessage(msg);
        setErrorModalOpen(true);
        setProgressModalOpen(false);
      }
    }
  };

  return (
    <ComponentToolCard title="Join Videos">
      <div className="relative z-10 px-8 py-8 ">
        <div className="mb-10">
          <div className="flex justify-between items-center ">
            <HeaderToolInput>
              <HiOutlineVideoCamera size={20} />
            </HeaderToolInput>
            {files.length > 0 && (
              <Button
                onClick={() => {
                  setSelectedFileIndex(files.length);
                  setUploadIndex(files.length);
                  setUploadModalOpen(true);
                }}
                className="flex items-center"
              >
                <HiPlus className="mr-1" />
                Add Media
              </Button>
            )}
          </div>
          <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
            <VideoMultipleUpload
              videoRef={videoRef}
              files={files}
              setUploadFileModal={setUploadModalOpen}
              setUploadFileIndex={setUploadIndex}
              uploadedData={fileData}
              progress={progress}
              fetchedData={fetchedData}
              setFetchedData={setFetchedData}
              isUploading={isUploading}
              clearFileInfo={clearInfo}
              handleRemoveFile={handleRemoveFile}
              selectedFileIndex={selectedFileIndex}
              setSelectedFileIndex={setSelectedFileIndex}
              durations={durations}
              setDurations={setDurations}
              reorderFiles={reorderFiles}
            />
          </motion.div>
        </div>

        <div className="mb-10">
          <HeaderToolProperties />
          <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="w-full">
                <label
                  htmlFor="outputWidth"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Output Width
                </label>
                <input
                  id="outputWidth"
                  type="number"
                  disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                  value={settings.outputWidth !== undefined ? settings.outputWidth : ''}
                  placeholder="1280"
                  onChange={e => {
                    touch('outputWidth');
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    updateSetting('outputWidth', value);
                  }}
                  className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                    shouldError('outputWidth')
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                  }`}
                />
                {shouldError('outputWidth') && (
                  <p className="mt-1 text-sm text-red-500">
                    Output width is required and must be positive
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="outputHeight"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Output Height
                </label>
                <input
                  id="outputHeight"
                  type="number"
                  disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                  value={settings.outputHeight !== undefined ? settings.outputHeight : ''}
                  placeholder="720"
                  onChange={e => {
                    touch('outputHeight');
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    updateSetting('outputHeight', value);
                  }}
                  className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                    shouldError('outputHeight')
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                  }`}
                />
                {shouldError('outputHeight') && (
                  <p className="mt-1 text-sm text-red-500">
                    Output height is required and must be positive
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="w-full">
                <label
                  htmlFor="frameRate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Frame Rate (FPS)
                </label>
                <input
                  id="frameRate"
                  type="number"
                  disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                  value={settings.frameRate !== undefined ? settings.frameRate : ''}
                  placeholder="30"
                  onChange={e => {
                    touch('frameRate');
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    updateSetting('frameRate', value);
                  }}
                  className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                    shouldError('frameRate')
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                  }`}
                />
                {shouldError('frameRate') && (
                  <p className="mt-1 text-sm text-red-500">
                    Frame rate is required and must be positive
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="stretchStrategy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Stretch Strategy
                </label>
                <div className="relative">
                  <select
                    id="stretchStrategy"
                    value={settings.stretchStrategy}
                    onChange={e => updateSetting('stretchStrategy', e.target.value)}
                    disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  >
                    <option value="fit">Fit</option>
                    <option value="fill">Fill</option>
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
            <div className="mb-6">
              <label
                htmlFor="backgroundColor"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Background Color
              </label>
              <div className="relative flex items-center">
                <input
                  id="backgroundColor"
                  type="text"
                  disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                  placeholder="#000000"
                  value={settings.backgroundColor}
                  onChange={handleColorChange}
                  className={`pl-10 text-black dark:text-white bg-white dark:bg-gray-800 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                    settings.isColorValid
                      ? 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                      : 'border-red-500 focus:ring-red-500'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div
                    className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700"
                    style={{
                      backgroundColor: settings.isColorValid ? settings.backgroundColor : 'red',
                    }}
                  ></div>
                </div>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  disabled={files.length === 0 || isUploading || fileIds.length !== files.length}
                  onChange={e => {
                    updateSetting('backgroundColor', e.target.value);
                    updateSetting('isColorValid', true);
                  }}
                  className="absolute right-2 w-8 h-8 cursor-pointer opacity-0"
                  aria-label="Select color"
                />
                <div className="absolute right-2 w-6 h-6 rounded-md pointer-events-none">
                  <HiOutlineColorSwatch size={20} />
                </div>
              </div>
            </div>
          </div>
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
              file={files[selectedFileIndex]}
              isUploading={isUploading}
              fetchedData={fetchedData[selectedFileIndex]}
              outputQuality={outputQuality}
              setOutputQuality={setOutputQuality}
              videoContainer={videoContainer}
              setVideoContainer={setVideoContainer}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            disabled={files.length < 2 || isUploading || fileIds.length !== files.length}
            onClick={handleJoinVideos}
          >
            Process <HiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {uploadModalOpen && (
        <UploadMultipleFileModal
          videoRef={videoRef}
          uploadModal={uploadModalOpen}
          setUploadModal={setUploadModalOpen}
          fileIndex={uploadIndex}
          setFile={handleFileChange}
          setFileId={updateFileId}
          upload={upload}
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
