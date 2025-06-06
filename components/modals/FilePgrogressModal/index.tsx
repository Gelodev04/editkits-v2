import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Fade, Modal } from '@mui/material';
import { HiOutlineX, HiX, HiOutlineInformationCircle } from 'react-icons/hi';
import Copy from '@/components/icons/Copy';
import Download from '@/components/icons/Download';

import { lato, montserrat, opensans } from '@/lib/fonts';
import Button from '@/components/ui/button/Button';
import Rocket from '@/public/images/rocket.gif';
import { useLazyPreviewVideoQuery, useStatusQuery } from '@/services/api/file';
import { downloadFile } from '@/lib/utils';
import VideoPreviewModal from '../VideoPreviewModal';
import { SpinnerOne } from '@/components/Spinner';
import Play from '@/components/icons/Play';

export default function FileProgressModal({ progressModal, setProgressModal, data, reset }) {
  const router = useRouter();
  const [jobStarted, setJobStarted] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);

  const [triggerPreview] = useLazyPreviewVideoQuery();

  const { refetch: refetchStatus } = useStatusQuery({ fileId }, { skip: !fileId });

  useEffect(() => {
    // if(!fileId){return}
    if (data?.output_file_ids?.[0]) {
      const newFileId = data.output_file_ids[0];
      setFileId(newFileId);
    }
  }, [data]);

  const pollFileStatus = useCallback(async () => {
    if (!fileId) return;

    try {
      const result = await refetchStatus();
      const status = result.data?.status;

      console.log('Polling file result:', result);

      if (status === 'COMMITTED') {
        // Stop polling
        setStatus(status);

        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }

        // Set thumbnail URL if available
        if (result.data?.metadata?.thumbnail_url) {
          setThumbnailUrl(result.data.metadata.thumbnail_url);
          // await fetchData()
          setFileId(null);
        }
      } else if (status === 'ERROR') {
        // Stop polling in case of error
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
    } catch (error) {
      console.error('Error polling file status:', error);
      // Stop polling in case of error
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  }, [fileId, pollingInterval, refetchStatus]);

  // Start polling when fileId is set
  useEffect(() => {
    // Clear any existing interval

    if (pollingInterval) {
      clearInterval(pollingInterval);
    }

    // If we have a fileId, start polling
    if (fileId) {
      // Initial immediate check
      pollFileStatus();

      // Then set up interval polling
      const interval = setInterval(pollFileStatus, 5000); // Poll every 5 seconds
      setPollingInterval(interval);

      // Cleanup function
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [fileId]);

  useEffect(() => {
    // If we receive valid job data with status, mark the job as started
    if (data && data.output_file_ids && data.status && progressModal) {
      setJobStarted(true);
      setThumbnailUrl(null);
    } else if (!progressModal) {
      // Reset the job started flag when modal is closed
      setJobStarted(false);
      // Clear polling interval
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  }, [data, progressModal]);

  const copyToClipboard = text => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const handleClose = () => {
    setProgressModal(false);
    reset();
  };

  const goToJobsDashboard = () => {
    handleClose();
    router.push('dashboard/job-status');
  };

  const goToTools = () => {
    handleClose();
    router.push('/tools');
  };

  // Determine current state of the job - added jobStarted check
  // Only show completion if the job was actually started and is now complete
  const isPending = jobStarted && (data?.status === 'PENDING' || data?.status === 'IN_PROGRESS');
  const isCompleted = jobStarted && data?.status === 'COMPLETED';
  const isFailed = jobStarted && (data?.status === 'FAILED' || data?.status === 'CANCELLED');

  // Default to processing state if no other state is determined but modal is open
  const isProcessing = progressModal && !isPending && !isCompleted && !isFailed;

  // Calculate progress percentage safely
  const progressPercentage =
    isPending || isProcessing ? Math.min(Math.max(0, data?.progress || 0), 100).toFixed(0) : 0;

  return (
    <Modal
      open={progressModal}
      hideBackdrop
      className="flex items-center justify-center px-4 sm:px-0"
    >
      <Fade in={progressModal}>
        <div
          className={`${montserrat.variable} ${lato.variable} ${opensans.variable} bg-white dark:bg-gray-900`}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-sm transition-opacity" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8"
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  aria-label="Close modal"
                >
                  <HiX className="w-5 h-5" />
                </button>

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {/* Processing State */}
                    {(isPending || isProcessing) && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="flex justify-center py-4 mb-2">
                          <Image
                            src={Rocket}
                            width={100}
                            height={100}
                            alt="Processing"
                            className="rounded-lg"
                            priority
                          />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                          Processing Your Video
                        </h3>

                        <div className="w-full mt-4 mb-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {progressPercentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${progressPercentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                          Your video is being processed. This may take a few moments depending on
                          the file size.
                        </p>

                        <div className="m-6 flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full">
                          <HiOutlineInformationCircle className="text-blue-600 dark:text-blue-400 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            You can close this modal and continue using the app. We'll notify you
                            when processing is complete.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Completed State */}
                    {isCompleted && (
                      <motion.div
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="relative flex items-center justify-center z-1 mb-7">
                          <svg
                            className="fill-success-50 dark:fill-success-500/15"
                            width="90"
                            height="90"
                            viewBox="0 0 90 90"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                              fill=""
                              fillOpacity=""
                            />
                          </svg>

                          <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                            <svg
                              className="fill-success-600 dark:fill-success-500"
                              width="38"
                              height="38"
                              viewBox="0 0 38 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 17.0575C25.3713 16.4717 25.3713 15.522 24.7855 14.9362C24.1997 14.3504 23.25 14.3504 22.6642 14.9362L17.7177 19.8827L15.3387 17.5037C14.7529 16.9179 13.8031 16.9179 13.2173 17.5037C12.6316 18.0894 12.6316 19.0392 13.2173 19.625L16.657 23.0647C16.9383 23.346 17.3199 23.504 17.7177 23.504C18.1155 23.504 18.4971 23.346 18.7784 23.0647L24.7855 17.0575Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-1">
                          Processing Complete!
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                          Your video has been successfully processed and is ready to use.
                        </p>

                        {thumbnailUrl ? (
                          <div className="relative w-full rounded-lg overflow-hidden mb-5 border border-gray-200 dark:border-gray-700">
                            <Image
                              src={thumbnailUrl}
                              width={400}
                              height={225}
                              alt="Processed video thumbnail"
                              style={{
                                objectFit: 'contain',
                                objectPosition: 'center',
                              }}
                              className="w-full h-auto object-cover aspect-video"
                              priority
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center mb-4">
                            <SpinnerOne.lg />
                          </div>
                        )}

                        {data?.id && (
                          <div className="p-3 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <span className="text-xs px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                                  # {data.id.substring(0, 4)}...
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  onClick={() => copyToClipboard(data.id)}
                                  className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                                  aria-label="Copy ID"
                                  title="Copy ID to clipboard"
                                >
                                  <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
                                </button>
                                <button
                                  onClick={async () => {
                                    if (url) {
                                      console.log('Video URL:', url);
                                      setVideo(url);
                                      setVideoPreviewModal(true);
                                    } else {
                                      const newFileId = data?.output_file_ids?.[0];
                                      if (!newFileId) return;
                                      setStatus('COMMITTED');
                                      console.log(status);

                                      try {
                                        console.log('Fetching video URL for file ID:', newFileId);
                                        const response = await triggerPreview({
                                          fileId: newFileId,
                                        }).unwrap();
                                        console.log('Preview response:', response);
                                        const url = (response as { url: string }).url;

                                        setUrl(url);
                                        setVideo(url);
                                        setVideoPreviewModal(true);
                                      } catch (err) {
                                        console.error('Error fetching video URL:', err);
                                        // optionally surface a toast/toaster here
                                      }
                                    }
                                  }}
                                  className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                                >
                                  <Play className="w-5 h-5 text-[#1C274C] dark:text-white" />
                                </button>

                                <button
                                  onClick={async e => {
                                    e.preventDefault();

                                    if (url) {
                                      downloadFile(url, 'video.mp4');
                                    } else {
                                      const newFileId = data?.output_file_ids?.[0];
                                      if (!newFileId) return;
                                      setStatus('COMMITTED');
                                      console.log(status);

                                      try {
                                        console.log('Fetching video URL for file ID:', newFileId);
                                        const response = await triggerPreview({
                                          fileId: newFileId,
                                        }).unwrap();
                                        console.log('Preview response:', response);
                                        const url = (response as { url: string }).url;

                                        setUrl(url);
                                        setVideo(url);
                                        downloadFile(url, 'video.mp4');
                                      } catch (err) {
                                        console.error('Error fetching video URL:', err);
                                        // optionally surface a toast/toaster here
                                      }
                                    }
                                  }}
                                  className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                                >
                                  <Download className="w-5 h-5 text-[#1C274C] dark:text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Failed State */}
                    {isFailed && (
                      <motion.div
                        key="failed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                          <HiOutlineX className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                          Processing Failed
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                          We encountered an error while processing your video. Please try again.
                        </p>

                        <div className="w-full p-4 mb-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <p className="text-sm text-red-800 dark:text-red-300">
                            {data?.error_message || 'An unknown error occurred during processing.'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer Actions - Always Present */}
                  {data && (
                    <div className="flex flex-col justify-end sm:flex-row gap-3 sm:justify-center">
                      <button
                        onClick={goToJobsDashboard}
                        className="w-full sm:w-auto order-2 sm:order-1 py-2.5 px-4 text-black bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg font-medium text-sm"
                      >
                        Dashboard
                      </button>

                      <Button
                        onClick={goToTools}
                        className="w-full sm:w-auto order-1 sm:order-2 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium text-sm"
                      >
                        Explore Tools
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
          <VideoPreviewModal
            open={videoPreviewModal}
            setOpen={setVideoPreviewModal}
            url={video}
            fileType={'VIDEO'}
          />
        </div>
      </Fade>
    </Modal>
  );
}
