import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { FaAngleRight, FaRuler } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { VideoUpload } from '@/components/VideoUpload';
import UploadFileModal from '@/components/modals/UploadFileModal';
import { aspectRatio, outputQualityList, presets, videoType } from '@/lib/constants';
import { useStatusQuery, useUploadMutation } from '@/services/api/file';
import GradientHeading from '@/components/Typography/GradientHeading';
import { useCommitJobMutation, useInitJobMutation, useJobStatusQuery } from '@/services/api/job';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import { HiOutlineVideoCamera, HiOutlineAdjustments, HiOutlineTemplate } from 'react-icons/hi';

import toast from 'react-hot-toast';

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
    framerate: undefined,
    audioSampleRate: undefined,
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
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState('Medium');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const videoRef = useRef(null);

  const calculateHeight = (width, aspectX, aspectY) => Math.floor(width * (aspectY / aspectX));
  const calculateWidth = (height, aspectX, aspectY) => Math.floor(height * (aspectX / aspectY));

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (fetchedData && fetchedData.metadata) {
      updateSettings('width', fetchedData.metadata.width);
      updateSettings('height', fetchedData.metadata.height);
    }
  }, [fetchedData?.metadata]);

  useEffect(() => {
    const interval = setInterval(() => {
      //@ts-ignore // Ignore type issues with the API response
      if (data?.status !== 'COMMITTED' && data?.status !== 'ERROR' && fileId) {
        refetch();
      }
      //@ts-ignore // Ignore type issues with the API response
      setFetchedData(data);
      console.log('data', data);
    }, 2000);

    return () => clearInterval(interval);
  }, [data, fileId, refetch]);

  useEffect(() => {
    if (!isCustom) {
      //@ts-ignore
      if (activeInput === 'width' && settings?.width > 0) {
        updateSettings(
          'height',
          calculateHeight(settings.width, settings.aspectX, settings.aspectY)
        );
        //  @ts-ignore
      } else if (activeInput === 'height' && settings?.height > 0) {
        updateSettings(
          'width',
          calculateWidth(settings.height, settings.aspectX, settings.aspectY)
        );
      }
    }
  }, [settings.width, settings.height, settings.aspectX, settings.aspectY, activeInput, isCustom]);

  useEffect(() => {
    if (presetHeight !== undefined) {
      updateSettings('height', presetHeight * settings.aspectY);
    }
  }, [settings.aspectY, presetHeight]);

  useEffect(() => {
    if (presetWidth !== undefined) {
      updateSettings('width', presetWidth * settings.aspectX);
    }
  }, [presetWidth, settings.aspectX]);

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

  const handleColorChange = e => {
    const newColor = e.target.value;
    updateSettings('color', newColor);
    updateSettings('isColorValid', /^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

  async function handleResizeVideo() {
    try {
      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_RESIZE',
            properties: {
              input: fileId,
              width: settings.width ? parseInt(String(settings.width)) : undefined,
              height: settings.height ? parseInt(String(settings.height)) : undefined,
              padding_color: settings.color,
              stretch_strategy: settings.stretchStrategy,
              framerate: settings.framerate ? parseInt(String(settings.framerate)) : undefined,
              audio_sample_rate: settings.audioSampleRate
                ? parseInt(String(settings.audioSampleRate))
                : undefined,
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

      const { job_id } = response.data;
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
        className="bg-white dark:bg-white/[0.03] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
      >
        {/* Header */}
        <div className="relative z-10 pt-8 pb-4 px-8 border-b border-gray-100 dark:border-gray-800">
          <GradientHeading
            text="Resize Video"
            subtext="Easily change the dimensions of your video to fit any platform"
            icon={<FaRuler size={18} />}
            fromColor="blue-600"
            toColor="purple-700"
          />
        </div>

        <div className="relative z-10 px-8 py-8">
          {/* Input Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                <HiOutlineVideoCamera size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                Input Video
              </h2>
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

          {/* Dimensions Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                <HiOutlineTemplate size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Dimensions</h2>
            </div>

            <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
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
                      setIsCustom(false);
                      if (e.target.value === 'None') {
                        return;
                      }
                      const [, , resolution] = e.target.value?.split(',') || [];
                      const [presetWidth, presetHeight] = resolution.split('x').map(Number);

                      updateSettings('width', presetWidth || undefined);
                      setPresetWidth(presetWidth || undefined);
                      updateSettings('height', presetHeight || undefined);
                      setPresetHeight(presetHeight || undefined);
                      setActiveInput('preset');
                    }}
                    disabled={!file}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  >
                    <option value="">Select preset</option>
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

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

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
                        setIsCustom(false);
                        const aspect = field.split(':');
                        const x = aspect[0];
                        const y = aspect[1];
                        updateSettings('aspectX', Number(x));
                        updateSettings('aspectY', Number(y));
                      } else {
                        setIsCustom(true);
                      }
                    }}
                    disabled={!file}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  >
                    <option value="">Select aspect ratio</option>
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
                    disabled={!file}
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
                    disabled={!file}
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
                    Padding Color
                  </label>
                  <div className="relative">
                    <input
                      id="color"
                      type="text"
                      disabled={!file}
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
                        style={{ backgroundColor: settings.isColorValid ? settings.color : 'red' }}
                      ></div>
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
                      disabled={!file}
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
                      disabled={!file}
                      value={outputQuality}
                      onChange={e => setOutputQuality(e.target.value)}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    >
                      <option value="">Select quality</option>
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
                      disabled={!file}
                      value={videoContainer}
                      onChange={e => setVideoContainer(e.target.value)}
                      className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                    >
                      <option value="">Select format</option>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full">
                  <label
                    htmlFor="framerate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Framerate
                  </label>
                  <input
                    id="framerate"
                    type="number"
                    disabled={!file}
                    placeholder="30"
                    value={settings.framerate || ''}
                    onChange={e => updateSettings('framerate', e.target.value)}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="audioSampleRate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Audio Sample Rate
                  </label>
                  <input
                    id="audioSampleRate"
                    type="number"
                    disabled={!file}
                    placeholder="48000"
                    value={settings.audioSampleRate || ''}
                    onChange={e => updateSettings('audioSampleRate', e.target.value)}
                    className="w-full text-black dark:text-white bg-white dark:bg-gray-800 pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              disabled={!file || !settings.width || !settings.height || !settings.isColorValid}
              onClick={handleResizeVideo}
              className={`px-10 py-4 rounded-xl font-medium text-white flex items-center shadow-lg transition-all ${
                !file || !settings.width || !settings.height || !settings.isColorValid
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              }`}
            >
              Process Video
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
