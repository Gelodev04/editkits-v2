import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoUpload } from '@/components/VideoUpload';
import UploadFileModal from '@/components/modals/UploadFileModal';
import { aspectRatio, outputQualityList, presets, videoType } from '@/lib/constants';
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import { useCommitJobMutation, useInitJobMutation, useJobStatusQuery } from '@/services/api/job';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import {
  HiOutlineVideoCamera,
  HiOutlineAdjustments,
  HiOutlineTemplate,
  HiArrowRight,
  HiOutlineColorSwatch,
} from 'react-icons/hi';

import toast from 'react-hot-toast';
import ToggleButton from '@/components/ToggleButton';
import ComponentToolCard from '@/components/ComponentToolCard';

// Define interface for metadata
interface FileMetadata {
  metadata?: {
    width?: number;
    height?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export default function ResizeVideo() {
  const [fileId, setFileId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [upload] = useUploadMutation();
  const { data, refetch } = useStatusQuery({ fileId }, { skip: !fileId });
  const { data: jobData, refetch: refetchJobData } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );
  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();

  const [settings, setSettings] = useState({
    width: undefined,
    height: undefined,
    aspectX: 1,
    aspectY: 1,
    color: '#000000',
    isColorValid: true,
    stretchStrategy: 'fit',
  });

  const [fetchedData, setFetchedData] = useState<FileMetadata | null>(null);
  const [presetWidth, setPresetWidth] = useState<number | undefined>(undefined);
  const [presetHeight, setPresetHeight] = useState<number | undefined>(undefined);
  const [uploadFileModal, setUploadFileModal] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [file, setFile] = useState(null);
  const [activeInput, setActiveInput] = useState('');
  const [isCustom, setIsCustom] = useState(true);
  const [toggleName, setToggleName] = useState('Custom');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const videoRef = useRef(null);

  // Add state variable to track whether file info should be cleared
  const [clearFileInfo, setClearFileInfo] = useState<boolean>(false);

  const calculateHeight = (width, aspectX, aspectY) => Math.floor(width * (aspectY / aspectX));
  const calculateWidth = (height, aspectX, aspectY) => Math.floor(height * (aspectX / aspectY));

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Function to reset all states when a new file is uploaded
  const resetStates = () => {
    setSettings({
      width: undefined,
      height: undefined,
      aspectX: 1,
      aspectY: 1,
      color: '#000000',
      isColorValid: true,
      stretchStrategy: 'fit',
    });
    setFetchedData(null);
    setPresetWidth(undefined);
    setPresetHeight(undefined);
    setActiveInput('');
    setIsCustom(true);
    setOutputQuality('MEDIUM');
    setVideoContainer('mp4');
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.src = '';
    }
  };

  // Add this function to completely reset all file states
  const resetAllFileStates = () => {
    setFile(null);
    setFileId(null);
    setFetchedData(null);
    setProgress(0);
    resetStates();
    // Set clear file info to true
    setClearFileInfo(true);
  };

  // Listen for direct file metadata from file ID uploads
  useEffect(() => {
    const handleFileMetadataReady = event => {
      const fileData = event.detail;

      // If resetPrevious flag is set, ensure we clear existing data first
      if (fileData.resetPrevious) {
        setFetchedData(null);
        // Short delay to ensure state is updated before setting new data
        setTimeout(() => {
          if (fileData && fileData.metadata) {
            console.log('File metadata received directly (after reset):', fileData);
            setFetchedData(fileData);
          }
        }, 50);
      } else if (fileData && fileData.metadata) {
        setFetchedData(fileData);
        console.log('File metadata received directly:', fileData);
      }
    };

    window.addEventListener('file-metadata-ready', handleFileMetadataReady);

    return () => {
      window.removeEventListener('file-metadata-ready', handleFileMetadataReady);
    };
  }, []);

  // Reset states when file changes
  useEffect(() => {
    if (file === null) {
      resetStates();
    }
  }, [file]);

  // Reset states when uploading starts
  useEffect(() => {
    if (isUploading) {
      resetStates();
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
      resetStates();
    }
  };

  useEffect(() => {
    if (fetchedData && fetchedData.metadata && !isUploading) {
      updateSettings('width', fetchedData.metadata.width);
      updateSettings('height', fetchedData.metadata.height);
    }
  }, [fetchedData?.metadata, isUploading]);

  useEffect(() => {
    // Don't fetch data while uploading
    if (isUploading) return;

    const interval = setInterval(() => {
      //@ts-ignore // Ignore type issues with the API response
      if (data?.status !== 'COMMITTED' && data?.status !== 'ERROR' && fileId) {
        refetch();
      }

      // Only update fetchedData if we have actual data and not uploading
      if (data && !isUploading) {
        //@ts-ignore // Ignore type issues with the API response
        setFetchedData(data);
        console.log('data', data);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [data, fileId, refetch, isUploading]);

  // When width or height changes, update the other dimension to maintain aspect ratio
  useEffect(() => {
    if (!isCustom) {
      return; // Skip aspect ratio calculation for presets
    }

    if (
      activeInput === 'width' &&
      typeof settings.width === 'number' &&
      settings.width > 0 &&
      settings.aspectX > 0 &&
      settings.aspectY > 0
    ) {
      const calculatedHeight = calculateHeight(settings.width, settings.aspectX, settings.aspectY);
      updateSettings('height', calculatedHeight);
    } else if (
      activeInput === 'height' &&
      typeof settings.height === 'number' &&
      settings.height > 0 &&
      settings.aspectX > 0 &&
      settings.aspectY > 0
    ) {
      const calculatedWidth = calculateWidth(settings.height, settings.aspectX, settings.aspectY);
      updateSettings('width', calculatedWidth);
    }
  }, [settings.width, settings.height, settings.aspectX, settings.aspectY, activeInput, isCustom]);

  useEffect(() => {
    if (presetHeight !== undefined) {
      updateSettings('height', presetHeight);
    }
  }, [presetHeight]);

  useEffect(() => {
    if (presetWidth !== undefined) {
      updateSettings('width', presetWidth);
    }
  }, [presetWidth]);

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
  }, [jobId, jobData?.status, refetchJobData]);

  const handleColorChange = e => {
    const newColor = e.target.value;
    updateSettings('color', newColor);
    updateSettings('isColorValid', /^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

  // Fix the toggle logic
  const toggleMode = newIsCustom => {
    setIsCustom(newIsCustom);
    setToggleName(newIsCustom ? 'Custom' : 'Preset');

    // Reset active input when switching modes
    setActiveInput('');

    if (!newIsCustom) {
      // Switching to preset mode - reset aspect ratio to default
      updateSettings('aspectX', 1);
      updateSettings('aspectY', 1);
    } else {
      // Switching to custom mode - keep the current dimensions but allow manual editing
      // No need to change anything as dimensions are already set
    }
  };

  async function handleResizeVideo() {
    try {
      // Validate required fields
      if (!settings.width || !settings.height) {
        toast.error('Width and height are required');
        return;
      }

      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_RESIZE',
            properties: {
              input: fileId,
              output_width: settings.width ? parseInt(String(settings.width)) : undefined,
              output_height: settings.height ? parseInt(String(settings.height)) : undefined,
              background_color: settings.color,
              stretch_strategy: settings.stretchStrategy,
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
        let errorMsg = 'Failed to initialize job';
        if (
          'data' in response.error &&
          response.error.data &&
          typeof response.error.data === 'object'
        ) {
          const data = response.error.data as any;
          if (data.errorMsg) {
            errorMsg = data.errorMsg;
          }
        } else if ('errMsg' in response.error) {
          errorMsg = (response.error as any).errMsg;
        }
        toast.error(errorMsg);
        return;
      }

      toast.success('Job initialized successfully');
      setProgressModal(true);
      setUploadFileModal(false);
      resetAllFileStates();

      const { job_id } = response.data;
      setJobId(job_id);

      await handleCommitJob(job_id);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unexpected error:', error);
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
    }
  }

  async function handleCommitJob(jobId: string) {
    if (!jobId) {
      toast.error('Invalid job ID');
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
        toast.error(errorMsg);
        return;
      }

      toast.success('Job committed successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
    }
  }

  return (
    <ComponentToolCard title="Resize Video">
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

        {/* Dimensions Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                <HiOutlineTemplate size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                Tool Properties
              </h2>
            </div>
            <div className="flex items-center justify-end">
              <ToggleButton
                label={toggleName}
                checked={isCustom}
                onChange={() => toggleMode(!isCustom)}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            {!isCustom ? (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="preset"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Preset Options
                  </label>
                  <div className="relative">
                    <select
                      id="preset"
                      onChange={e => {
                        if (e.target.value === 'None') {
                          return;
                        }
                        const [, , resolution] = e.target.value?.split(',') || [];
                        const [width, height] = resolution.split('x').map(Number);

                        // Update settings directly
                        updateSettings('width', width || undefined);
                        updateSettings('height', height || undefined);
                        setActiveInput('preset');
                      }}
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    >
                      {presets.map(opt => (
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
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="aspectRatio"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Aspect Ratio
                  </label>
                  <div className="relative">
                    <select
                      id="aspectRatio"
                      onChange={e => {
                        const field = e.target.value;
                        if (field !== 'Custom') {
                          const aspect = field.split(':');
                          const x = Number(aspect[0]);
                          const y = Number(aspect[1]);
                          updateSettings('aspectX', x);
                          updateSettings('aspectY', y);

                          // Recalculate height based on selected aspect ratio if width exists
                          if (typeof settings.width === 'number' && settings.width > 0) {
                            const calculatedHeight = calculateHeight(settings.width, x, y);
                            updateSettings('height', calculatedHeight);
                            setActiveInput('width'); // Set active input to width to maintain calculations
                          }
                        }
                      }}
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    >
                      {aspectRatio.map(opt => (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="width"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Width
                    </label>
                    <input
                      id="width"
                      type="number"
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      placeholder="1920"
                      value={settings.width || ''}
                      onChange={e => {
                        setActiveInput('width');
                        updateSettings('width', e.target.value);
                      }}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Height
                    </label>
                    <input
                      id="height"
                      type="number"
                      disabled={!file || isUploading || !fetchedData?.metadata}
                      placeholder="1080"
                      value={settings.height || ''}
                      onChange={e => {
                        setActiveInput('height');
                        updateSettings('height', e.target.value);
                      }}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="color"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Background Color
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="color"
                        type="text"
                        disabled={!file || isUploading || !fetchedData?.metadata}
                        placeholder="#000000"
                        value={settings.color}
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
                            backgroundColor: settings.isColorValid ? settings.color : 'red',
                          }}
                        ></div>
                      </div>
                      <input
                        type="color"
                        value={settings.color}
                        disabled={!file || isUploading || !fetchedData?.metadata}
                        onChange={e => {
                          updateSettings('color', e.target.value);
                          updateSettings('isColorValid', true);
                        }}
                        className="absolute right-2 w-8 h-8 cursor-pointer opacity-0"
                        aria-label="Select color"
                      />
                      <div className="absolute right-2 w-6 h-6 rounded-md pointer-events-none">
                        <HiOutlineColorSwatch size={20} />
                      </div>
                    </div>
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
                        onChange={e => updateSettings('stretchStrategy', e.target.value)}
                        disabled={!file || isUploading || !fetchedData?.metadata}
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
              </>
            )}
          </div>
        </div>

        {/* Output Settings */}
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
            disabled={
              !file ||
              !settings.width ||
              !settings.height ||
              !settings.isColorValid ||
              isUploading ||
              !fetchedData?.metadata
            }
            onClick={handleResizeVideo}
          >
            Process Video <HiArrowRight className="ml-2" />
          </Button>
          {(!settings.width || !settings.height) &&
            file &&
            fetchedData?.metadata &&
            !isUploading && (
              <p className="text-red-500 text-sm mt-2">Width and height are required</p>
            )}
        </div>
      </div>
      {/* </motion.div> */}

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
      <FileProgressModal
        progressModal={progressModal}
        setProgressModal={value => {
          setProgressModal(value);
          if (!value) {
            resetAllFileStates();
          }
        }}
        data={jobData}
        fetchedData={fetchedData}
      />
    </ComponentToolCard>
  );
}
