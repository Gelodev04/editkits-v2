import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoUpload } from '@/components/VideoUpload';
import UploadFileModal from '@/components/modals/UploadFileModal';
import { aspectRatio, presets } from '@/lib/constants';
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import { useCommitJobMutation, useInitJobMutation, useJobStatusQuery } from '@/services/api/job';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import {
  HiOutlineVideoCamera,
  HiOutlineAdjustments,
  HiArrowRight,
  HiOutlineColorSwatch,
} from 'react-icons/hi';

import toast from 'react-hot-toast';
import ToggleButton from '@/components/ToggleButton';
import ComponentToolCard from '@/components/ComponentToolCard';
import ErrorModal from '@/components/modals/ErrorModal';
import { HeaderToolInput, HeaderToolProperties } from '@/components/HeaderTool';
import OutputQualityVideo from '@/components/OutputQualityVideo';

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

  // Add state to track if fields have been touched
  const [widthTouched, setWidthTouched] = useState(false);
  const [heightTouched, setHeightTouched] = useState(false);
  // Track form submission attempts
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);

  const [fetchedData, setFetchedData] = useState<FileMetadata | null>(null);
  const [presetWidth, setPresetWidth] = useState<number | undefined>(undefined);
  const [presetHeight, setPresetHeight] = useState<number | undefined>(undefined);
  const [uploadFileModal, setUploadFileModal] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [file, setFile] = useState(null);
  const [activeInput, setActiveInput] = useState('');
  const [isCustom, setIsCustom] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('Custom');
  const [selectedPreset, setSelectedPreset] = useState('None');
  const videoRef = useRef(null);

  // Add state variable to track whether file info should be cleared
  const [clearFileInfo, setClearFileInfo] = useState<boolean>(false);

  // Add error modal state
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Improved calculation functions with proper type handling and precision
  const calculateHeight = (width, aspectX, aspectY) => {
    if (typeof width !== 'number' || isNaN(width) || width <= 0) return undefined;
    if (typeof aspectX !== 'number' || aspectX <= 0 || typeof aspectY !== 'number' || aspectY <= 0)
      return undefined;
    return Math.floor(width * (aspectY / aspectX));
  };

  const calculateWidth = (height, aspectX, aspectY) => {
    if (typeof height !== 'number' || isNaN(height) || height <= 0) return undefined;
    if (typeof aspectX !== 'number' || aspectX <= 0 || typeof aspectY !== 'number' || aspectY <= 0)
      return undefined;
    return Math.floor(height * (aspectX / aspectY));
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Helper to determine if we should show error state
  const shouldShowError = (value, fieldTouched) => {
    return (fieldTouched || formSubmitAttempted) && !value;
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
    setSelectedAspectRatio('1:1');
    setSelectedPreset('None');
    setWidthTouched(false);
    setHeightTouched(false);
    setFormSubmitAttempted(false);

    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.src = '';
    }
  };

  // Add this function to completely reset all file states
  const resetAllFileStates = () => {
    setFile(null);
    setFileId(null);
    setJobId(null);
    setFetchedData(null);
    setProgress(0);
    setIsCustom(true);
    setOutputQuality('MEDIUM');
    setVideoContainer('mp4');
    resetStates();
    // Set clear file info to true
    setClearFileInfo(true);
  };

  // Reset states when file changes
  useEffect(() => {
    if (file === null) {
      resetStates();
    }
  }, [file]);

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
    if (fetchedData && fetchedData.metadata && !isUploading) {
      const originalWidth = fetchedData.metadata.width;
      const originalHeight = fetchedData.metadata.height;

      updateSettings('width', originalWidth);
      updateSettings('height', originalHeight);

      // If in custom mode and using default 1:1 aspect ratio, try to determine the original aspect ratio
      if (isCustom && selectedAspectRatio === '1:1' && originalWidth && originalHeight) {
        // Calculate GCD for the most accurate aspect ratio
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(originalWidth, originalHeight);

        if (divisor > 0) {
          const aspectX = originalWidth / divisor;
          const aspectY = originalHeight / divisor;

          // Only update if we get a reasonable aspect ratio (avoid extreme values)
          if (aspectX < 100 && aspectY < 100) {
            updateSettings('aspectX', aspectX);
            updateSettings('aspectY', aspectY);

            // Try to find a matching standard aspect ratio
            const aspectString = `${aspectX}:${aspectY}`;
            const matchingAspect = aspectRatio.find(a => a.value === aspectString);
            if (matchingAspect) {
              setSelectedAspectRatio(matchingAspect.value);
            } else if (Math.abs(aspectX / aspectY - 16 / 9) < 0.01) {
              // Close to 16:9
              setSelectedAspectRatio('16:9');
            } else if (Math.abs(aspectX / aspectY - 4 / 3) < 0.01) {
              // Close to 4:3
              setSelectedAspectRatio('4:3');
            } else {
              // If no standard aspect ratio matches, set to Custom
              setSelectedAspectRatio('Custom');
            }
          }
        }
      }
    }
  }, [fetchedData?.metadata, isUploading, isCustom, selectedAspectRatio]);

  useEffect(() => {
    // Don't fetch data while uploading
    if (isUploading) return;

    const interval = setInterval(() => {
      // Only poll if we have a fileId
      if (fileId) {
        // Continue polling until we get a final status (COMMITTED or ERROR)
        // or until we have the metadata we need
        const shouldContinuePolling =
          !data?.status ||
          (data.status !== 'COMMITTED' && data.status !== 'ERROR') ||
          !data?.metadata;

        if (shouldContinuePolling) {
          refetch();
        }

        // Update fetchedData if we have new data
        if (data && !isUploading) {
          setFetchedData(data);
          console.log('data', data);
        }
      }
    }, 2000);

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [data, fileId, refetch, isUploading]);

  // Enhanced effect for maintaining aspect ratio when width or height changes
  useEffect(() => {
    if (selectedAspectRatio === 'Custom') return;
    if (!isCustom) {
      return; // Skip aspect ratio calculation for presets
    }

    // Skip calculation if we're not in an active input state
    if (!activeInput) {
      return;
    }

    // Convert values to numbers for safe calculation
    const width =
      typeof settings.width === 'string' ? parseInt(settings.width, 10) : settings.width;
    const height =
      typeof settings.height === 'string' ? parseInt(settings.height, 10) : settings.height;
    const aspectX = settings.aspectX;
    const aspectY = settings.aspectY;

    if (activeInput === 'width' && width && width > 0 && aspectX > 0 && aspectY > 0) {
      const calculatedHeight = calculateHeight(width, aspectX, aspectY);
      if (calculatedHeight && calculatedHeight !== settings.height) {
        updateSettings('height', calculatedHeight);
      }
    } else if (activeInput === 'height' && height && height > 0 && aspectX > 0 && aspectY > 0) {
      const calculatedWidth = calculateWidth(height, aspectX, aspectY);
      if (calculatedWidth && calculatedWidth !== settings.width) {
        updateSettings('width', calculatedWidth);
      }
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

  // Add a new useEffect to monitor job status changes and reset when completed
  useEffect(() => {
    // Check if job has completed, failed, or been cancelled
    if (
      jobData?.status === 'COMPLETED' ||
      jobData?.status === 'FAILED' ||
      jobData?.status === 'CANCELLED' ||
      jobData?.status === 'ERROR'
    ) {
      // Job is done - we should reset here too, as an additional safety measure
      // This ensures reset even if modal is closed programmatically
      console.log('Job status changed to:', jobData?.status, '- resetting form');
      // Don't reset immediately to allow user to see the completion status
      // setTimeout to allow UI to update first showing completion
      setTimeout(() => {
        // Only reset all states after modal is closed to ensure thumbnail remains visible
        if (!progressModal) {
          resetAllFileStates();
        }
      }, 500);
    }
  }, [jobData?.status, progressModal]);

  const handleColorChange = e => {
    const newColor = e.target.value;
    updateSettings('color', newColor);
    updateSettings('isColorValid', /^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

  // Fix the toggle logic
  const toggleMode = newIsCustom => {
    setIsCustom(newIsCustom);

    // Reset active input when switching modes
    setActiveInput('');

    if (!newIsCustom) {
      // Switching to preset mode - reset aspect ratio to default
      updateSettings('aspectX', 1);
      updateSettings('aspectY', 1);
      // Reset preset selection
      setSelectedPreset('None');
    } else {
      setSelectedAspectRatio('Custom');
      // Reset dimension settings to current video dimensions if available
      if (fetchedData?.metadata?.width && fetchedData?.metadata?.height) {
        updateSettings('width', fetchedData.metadata.width);
        updateSettings('height', fetchedData.metadata.height);
      }
    }
  };

  async function handleResizeVideo() {
    try {
      // Set form submission attempted flag to show validation errors
      setFormSubmitAttempted(true);

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
        setErrorMessage(errorMsg);
        setErrorModalOpen(true);
        return;
      }

      toast.success('Job initialized successfully');
      setProgressModal(true);
      setUploadFileModal(false);

      // Store job ID first before resetting other states
      const { job_id } = response.data;
      setJobId(job_id);

      // Only reset UI state but keep the data needed for the progress modal
      setFile(null);
      setFileId(null);
      // Don't clear fetchedData as it's needed for the thumbnail in the completion state
      // setFetchedData(null);
      setProgress(0);
      setClearFileInfo(true);

      await handleCommitJob(job_id);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unexpected error:', error);
        setErrorMessage(error.message || 'An unexpected error occurred');
        setErrorModalOpen(true);
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred');
        setErrorModalOpen(true);
      }
    }
  }

  async function handleCommitJob(jobId: string) {
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
        setProgressModal(false);
        setErrorMessage(errorMsg);
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

  return (
    <ComponentToolCard title="Resize Video">
      <div className="relative z-10 px-8 py-8">
        {/* Input Section */}
        <div className="mb-10">
          <HeaderToolInput>
            <HiOutlineVideoCamera size={20} />
          </HeaderToolInput>

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
          <HeaderToolProperties>
            <ToggleButton
              label={isCustom ? 'Custom' : 'Preset'}
              checked={isCustom}
              onChange={() => {
                toggleMode(!isCustom);
              }}
            />
          </HeaderToolProperties>

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
                      value={selectedPreset}
                      onChange={e => {
                        const value = e.target.value;
                        setSelectedPreset(value);

                        if (value === 'None') {
                          return;
                        }
                        const [, , resolution] = value?.split(',') || [];
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
                      value={selectedAspectRatio}
                      onChange={e => {
                        const field = e.target.value;
                        setSelectedAspectRatio(field);

                        if (field !== 'Custom') {
                          const aspect = field.split(':');
                          const x = Number(aspect[0]);
                          const y = Number(aspect[1]);
                          updateSettings('aspectX', x);
                          updateSettings('aspectY', y);

                          // Recalculate dimensions based on the new aspect ratio
                          if (typeof settings.width === 'number' && settings.width > 0) {
                            // If width exists, calculate height based on width
                            const calculatedHeight = calculateHeight(settings.width, x, y);
                            updateSettings('height', calculatedHeight);
                            setActiveInput('width'); // Set active input to width to maintain calculations
                          } else if (typeof settings.height === 'number' && settings.height > 0) {
                            // If only height exists, calculate width based on height
                            const calculatedWidth = calculateWidth(settings.height, x, y);
                            updateSettings('width', calculatedWidth);
                            setActiveInput('height'); // Set active input to height to maintain calculations
                          } else if (
                            fetchedData?.metadata?.width &&
                            fetchedData?.metadata?.height
                          ) {
                            // If neither width nor height exists but we have original dimensions,
                            // use the original width and calculate new height
                            updateSettings('width', fetchedData.metadata.width);
                            const calculatedHeight = calculateHeight(
                              fetchedData.metadata.width,
                              x,
                              y
                            );
                            updateSettings('height', calculatedHeight);
                            setActiveInput('width');
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
                        setWidthTouched(true);
                      }}
                      className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                        shouldShowError(settings.width, widthTouched)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                      }`}
                    />
                    {shouldShowError(settings.width, widthTouched) && (
                      <p className="mt-1 text-sm text-red-500">Width is required</p>
                    )}
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
                        setHeightTouched(true);
                      }}
                      className={`w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none ${
                        shouldShowError(settings.height, heightTouched)
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                      }`}
                    />
                    {shouldShowError(settings.height, heightTouched) && (
                      <p className="mt-1 text-sm text-red-500">Height is required</p>
                    )}
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
            Process <HiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      {/* </motion.div> */}

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
      {progressModal && (
        <FileProgressModal
          progressModal={progressModal}
          setProgressModal={setProgressModal}
          reset={resetStates}
          data={jobData}
        />
      )}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </ComponentToolCard>
  );
}
