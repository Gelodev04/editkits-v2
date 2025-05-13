import React, { useState, useRef, useCallback } from 'react';
import { Fade, Box } from '@mui/material';
// import {  } from 'react-icons/tb';
import { lato, montserrat, opensans } from '@/lib/fonts';
import toast from 'react-hot-toast';
import { fileUploader } from '@/lib/uploadFile';
import DropzoneComponent from '@/components/DropZone.tsx';
import { HiFingerPrint, HiOutlineDeviceMobile, HiX } from 'react-icons/hi';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/Modal';
import { useStatusQuery } from '@/services/api/file';

export type UploadModalProps = {
  uploadModal: boolean;
  setUploadModal: (e: React.SetStateAction<boolean>) => void;
  videoRef?: React.Ref<string>;
  file?: any;
  setFile?: (e: React.SetStateAction<any>) => void;
  setFileId?: (e: React.SetStateAction<any>) => void;
  upload?: any;
  isUploading?: boolean;
  setIsUploading?: any;
  setProgress?: (e: React.SetStateAction<number>) => void;
  progress?: number;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 580,
  maxWidth: '95vw',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' as any,
  borderRadius: '16px',
  zIndex: 1500,
  p: 0,
  overflow: 'hidden',
};

export default function UploadFileModal(props: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'fileId'>('device');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileIdInputRef = useRef<HTMLInputElement>(null);
  const [fileIdError, setFileIdError] = useState<string | null>(null);
  const [fileIdToCheck, setFileIdToCheck] = useState<string | null>(null);

  // Use the query hook to fetch file status
  const result = useStatusQuery({ fileId: fileIdToCheck }, { skip: !fileIdToCheck });

  const fileStatusData = result.data;
  const isFileStatusLoading = result.isLoading;
  const reqError = result.error as { data: { errorMsg: string } } | null;

  console.log(error)

  // Create a ref to track if a file upload is in progress
  const isUploadingRef = useRef(false);

  async function handleFileUpload(file: File) {
    if (!props.setIsUploading || !props.upload || isProcessing || isUploadingRef.current) return;

    try {
      isUploadingRef.current = true;
      setIsProcessing(true);
      setUploadedFileName(file.name);
      props.setIsUploading(true);

      const response = await props.upload({
        file_name: file.name,
        mime_type: file.type,
        ext: file.name.split('.').pop(),
        content_length: file.size,
      });

      if (response?.error) {
        // Handle 404 and other errors
        const errorMsg = response.error.data?.errorMsg || 'An error occurred during upload';
        setError(errorMsg);
        toast.error(errorMsg);
        isUploadingRef.current = false;
        setIsProcessing(false);
        props.setIsUploading(false);
        return;
      }

      if (props.setFileId) {
        props.setFileId(response.data.file_id);
      }

      // Close modal immediately but continue upload in background
      props.setUploadModal(false);

      try {
        await fileUploader(
          response.data.url,
          file,
          null,
          props.setIsUploading,
          props.setProgress,
          true
        );

        setIsProcessing(false);
        setUploadedFileName(null);
        isUploadingRef.current = false;
        console.log('File uploaded successfully!', uploadedFileName);
        toast.success('File uploaded successfully!');
      } catch (error: any) {
        console.error('Upload error:', error);
        const errorMsg = error.response?.data?.errorMsg || 'An error occurred during upload';
        setError(errorMsg);
        toast.error(errorMsg);
        setIsProcessing(false);
        setUploadedFileName(null);
        props.setIsUploading(false);
        isUploadingRef.current = false;
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMsg = error.response?.data?.errorMsg || 'An error occurred during upload';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsProcessing(false);
      setUploadedFileName(null);
      props.setIsUploading(false);
      isUploadingRef.current = false;
    }
  }

  // Use useCallback to prevent recreating this function on each render
  const handleFileChange = useCallback(
    async (acceptedFiles: File[]) => {
      // Prevent handling if already processing or no files
      if (
        !props.setFile ||
        !acceptedFiles.length ||
        isProcessing ||
        isUploadingRef.current ||
        fileSelected
      )
        return;

      // Set fileSelected to true to prevent multiple calls
      setFileSelected(true);

      const file = acceptedFiles[0];
      if (file) {
        if (file.type.startsWith('video/')) {
          props.setFile(file);
          await handleFileUpload(file);

          if (
            props.videoRef &&
            typeof props.videoRef === 'object' &&
            'current' in props.videoRef &&
            props.videoRef.current
          ) {
            // @ts-ignore - Safer approach but TypeScript might still complain
            props.videoRef.current.load();
          }
        } else {
          toast.error('Please upload a valid video file.');
          setFileSelected(false);
          isUploadingRef.current = false;
        }
      } else {
        setFileSelected(false);
      }
    },
    [props, isProcessing, fileSelected]
  );

  // Validate if the string is a valid UUID v4
  const isValidUUID = (uuid: string): boolean => {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(uuid);
  };

  // Watch for changes in fileStatusData and handle accordingly
  React.useEffect(() => {
    if (!fileStatusData || !fileIdToCheck) {
      // Reset processing state if there's an error
      if (reqError) {
        setIsProcessing(false);
        isUploadingRef.current = false;
        setFileIdError(reqError?.data?.errorMsg || 'File not found');
        setFileIdToCheck(null);
      }
      return;
    }

    console.log('fileStatusData :', fileStatusData);
    console.log('error :', reqError?.data?.errorMsg);
    try {
      // Process the file status data
      console.log(fileStatusData);
      if (fileStatusData.status === 'EXPIRED') {
        setFileIdError('File has expired, please upload it again');
      } else if (fileStatusData.status === 'COMMITTED') {
        // Close the modal immediately since we've verified the file ID is valid
        props.setUploadModal(false);

        // First, clear any existing data by setting fileId to null
        // This will trigger the parent component to clear fetchedData
        if (props.setFileId) {
          props.setFileId(null);
        }

        // Create a mock file object so the VideoUpload component can display it
        if (props.setFile) {
          // Clear existing file first
          props.setFile(null);

          // Small delay to ensure state updates properly
          setTimeout(() => {
            // Then create and set the new mock file
            const mockFile = new File(
              [new Blob([''], { type: fileStatusData.mime_type || 'video/mp4' })],
              fileStatusData.file_name || 'video.mp4',
              { type: fileStatusData.mime_type || 'video/mp4' }
            );
            if (props.setFile) {
              props.setFile(mockFile);
            }

            // Now set the fileId after the file is set
            if (props.setFileId) {
              props.setFileId(fileIdToCheck);
            }

            // If file data has metadata, pass it directly to avoid waiting for parent component's fetch
            if (fileStatusData.metadata) {
              const eventData = new CustomEvent('file-metadata-ready', {
                detail: { ...fileStatusData, resetPrevious: true },
              });
              window.dispatchEvent(eventData);
            }

            toast.success('File ID accepted successfully!');
          }, 50);
        } else {
          // If no setFile function, just set the fileId
          if (props.setFileId) {
            props.setFileId(fileIdToCheck);
          }
          toast.success('File ID accepted successfully!');
        }
      } else {
        setFileIdError('File is not available');
      }
    } catch (error) {
      console.error('Error processing file status:', error);
      setFileIdError('Error processing file status');
    } finally {
      // Always clean up regardless of success or failure
      setIsProcessing(false);
      isUploadingRef.current = false;
      // Reset fileIdToCheck after processing
      setFileIdToCheck(null);
    }
  }, [fileStatusData, fileIdToCheck, props, reqError]);

  const handleFileIdUpload = () => {
    if (reqError) {
      setError(reqError?.data?.errorMsg || 'An error occurred');
    }
    if (isProcessing || isFileStatusLoading || !fileIdInputRef.current?.value) return;

    const fileId = fileIdInputRef.current.value.trim();

    // Validate UUID format
    if (!isValidUUID(fileId)) {
      setFileIdError('Incorrect file ID');
      return;
    }

    setIsProcessing(true);
    isUploadingRef.current = true;
    setFileIdError(null);

    // Set the fileId to trigger the query
    setFileIdToCheck(fileId);
  };

  const videoFileTypes = {
    'video/mp4': [],
    'video/quicktime': [],
    'video/x-msvideo': [],
    'video/webm': [],
    'video/mpeg': [],
    'video/x-matroska': [],
  };

  // const handleManualUpload = () => {
  //   if (isProcessing || isUploadingRef.current) return;
  //   props.setUploadModal(false);
  //   props.setFile?.(null);
  // };

  // Reset the fileSelected state when the modal opens or closes
  React.useEffect(() => {
    if (!props.uploadModal) {
      // Small delay to ensure the modal is fully closed
      setTimeout(() => {
        setFileSelected(false);
        setFileIdError(null);
        // Only reset the uploading ref if we're not actively uploading
        if (!props.isUploading) {
          isUploadingRef.current = false;
        }
      }, 100);
    }
  }, [props.uploadModal, props.isUploading]);

  // Don't allow closing the modal while upload is in progress
  const handleClose = () => {
    if (!isProcessing && !isUploadingRef.current && !props.isUploading) {
      props.setUploadModal(false);
      setFileIdToCheck(null);
      setFileIdError(null);
    } else {
      toast.error("Upload in progress. Please wait until it's complete.");
    }
  };

  return (
    <Modal
      isOpen={props.uploadModal}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      showCloseButton={false}
    >
      <Fade in={props.uploadModal}>
        <Box
          sx={style}
          className={`${montserrat.variable} ${lato.variable} ${opensans.variable} bg-white dark:bg-gray-900`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 py-6 relative border-b border-gray-100 dark:border-gray-800">
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              disabled={isProcessing || isUploadingRef.current || props.isUploading}
              className={`absolute right-6 top-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors" ${
                isProcessing || isUploadingRef.current || props.isUploading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              aria-label="Close modal"
            >
              <HiX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl text-gray-900 dark:text-white/90 font-bold">Upload Media</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm">
              Select a video file to upload and edit
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={e => {
                e.preventDefault();
                if (!isProcessing && !isUploadingRef.current) setActiveTab('device');
              }}
              disabled={isProcessing || isUploadingRef.current}
              className={`flex items-center justify-center py-4 px-6 text-sm font-medium focus:outline-none ${
                isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                activeTab === 'device'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <HiOutlineDeviceMobile className="mr-2" size={18} />
              Device
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                if (!isProcessing && !isUploadingRef.current) setActiveTab('fileId');
              }}
              disabled={isProcessing || isUploadingRef.current}
              className={`flex items-center justify-center py-4 px-6 text-sm font-medium focus:outline-none ${
                isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                activeTab === 'fileId'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <HiFingerPrint className="mr-2" size={18} />
              File ID
            </button>
          </div>

          <div className="p-8">
            {/* Device Upload */}
            {activeTab === 'device' && (
              <div>
                <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-md mr-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10C17 10.5523 16.5523 11 16 11H8C7.44772 11 7 10.5523 7 10V8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 14V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="4"
                        y="11"
                        width="16"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  Upload from your device
                </h4>

                <>
                  <DropzoneComponent
                    showCard={false}
                    onFileSelect={handleFileChange}
                    acceptTypes={videoFileTypes}
                    title=""
                    className="border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-200"
                  />
                  <div className="mt-2 mb-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supported formats: MP4, MOV, AVI, WEBM, FLV and many more.
                    </p>
                  </div>
                </>
              </div>
            )}

            {/* File ID Upload */}
            {activeTab === 'fileId' && (
              <div>
                <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-md mr-2">
                    <HiFingerPrint size={18} />
                  </span>
                  Upload by File ID
                </h4>

                <div className="mb-1">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Video File ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-500 dark:text-gray-400">
                      <HiFingerPrint size={18} />
                    </span>
                    <input
                      ref={fileIdInputRef}
                      type="text"
                      placeholder="Enter file ID"
                      disabled={isProcessing || isUploadingRef.current || isFileStatusLoading}
                      className={`w-full pl-11 pr-4 py-3 border ${
                        fileIdError
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all ${
                        isProcessing || isUploadingRef.current || isFileStatusLoading
                          ? 'bg-gray-100 dark:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 cursor-not-allowed'
                          : ''
                      }`}
                      onChange={() => fileIdError && setFileIdError(null)}
                    />
                  </div>
                  {fileIdError && (
                    <div className="mt-1 flex items-start pl-2 text-red-500 text-sm">
                      {/* <HiExclamation className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" /> */}
                      <span>{fileIdError}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter previously uploaded file ID
                  </p>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleFileIdUpload}
                    disabled={isProcessing || isUploadingRef.current || isFileStatusLoading}
                    className={` ${
                      isProcessing || isUploadingRef.current || isFileStatusLoading
                        ? 'opacity-70 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {isProcessing || isFileStatusLoading ? 'Processing...' : 'Use File ID'}
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end">
              {/* Add any action buttons here if needed */}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
