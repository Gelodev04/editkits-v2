import React, { useState, useRef, useCallback } from 'react';
import { Fade, Modal, Box } from '@mui/material';
// import {  } from 'react-icons/tb';
import { lato, montserrat, opensans } from '@/lib/fonts';
import toast from 'react-hot-toast';
import { fileUploader } from '@/lib/uploadFile';
import DropzoneComponent from '@/components/DropZone.tsx';
import { HiFingerPrint, HiOutlineDeviceMobile, HiX } from 'react-icons/hi';
import Button from '@/components/ui/button/Button';
import { SpinnerOne } from '@/components/Spinner';

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
  // const urlInputRef = useRef<HTMLInputElement>(null);
  const fileIdInputRef = useRef<HTMLInputElement>(null);

  // Create a ref to track if a file upload is in progress
  const isUploadingRef = useRef(false);

  async function handleFileUpload(file: File) {
    if (!props.setIsUploading || !props.upload || isProcessing || isUploadingRef.current) return;

    try {
      // Set the ref to indicate uploading is in progress
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
        toast.error(response.error.data.errorMsg);
        isUploadingRef.current = false;
        setIsProcessing(false);
        props.setIsUploading(false);
        return;
      }

      if (props.setFileId) {
        props.setFileId(response.data.file_id);
      }

      // Note: fileUploader now handles closing the modal after the upload is complete
      await fileUploader(
        response.data.url,
        file,
        props.setUploadModal,
        props.setIsUploading,
        props.setProgress
      );

      // Reset states only after upload is complete (moved from fileUploader)
      setIsProcessing(false);
      setUploadedFileName(null);
      isUploadingRef.current = false;
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during upload');
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

  // const handleUrlUpload = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (isProcessing || !urlInputRef.current?.value) return;

  //   // Implement URL upload logic
  //   setIsProcessing(true);
  //   isUploadingRef.current = true;
  //   toast.success('URL upload functionality will be implemented');

  //   setTimeout(() => {
  //     props.setUploadModal(false);
  //     setIsProcessing(false);
  //     isUploadingRef.current = false;
  //   }, 500);
  // };

  const handleFileIdUpload = () => {
    if (isProcessing || !fileIdInputRef.current?.value) return;

    // Implement File ID upload logic
    setIsProcessing(true);
    isUploadingRef.current = true;
    toast.success('File ID upload functionality will be implemented');

    setTimeout(() => {
      props.setUploadModal(false);
      setIsProcessing(false);
      isUploadingRef.current = false;
    }, 500);
  };

  const videoFileTypes = {
    'video/mp4': [],
    'video/quicktime': [],
    'video/x-msvideo': [],
    'video/webm': [],
    'video/mpeg': [],
    'video/x-matroska': [],
  };

  const handleManualUpload = () => {
    if (isProcessing || isUploadingRef.current) return;
    props.setUploadModal(false);
    props.setFile?.(null);
  };

  // Reset the fileSelected state when the modal opens or closes
  React.useEffect(() => {
    if (!props.uploadModal) {
      // Small delay to ensure the modal is fully closed
      setTimeout(() => {
        setFileSelected(false);
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
    } else {
      toast.error("Upload in progress. Please wait until it's complete.");
    }
  };

  return (
    <Modal
      open={props.uploadModal}
      onClose={handleClose}
      aria-labelledby="upload-modal-title"
      closeAfterTransition
      disableAutoFocus={true}
      disableEnforceFocus={true}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
      }}
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

                {isProcessing || isUploadingRef.current ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
                    <div className="animate-pulse flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <SpinnerOne.md />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Processing
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {uploadedFileName}
                      </p>
                      <p>Uploading... {props.progress}%</p>
                      <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${props.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
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
                )}
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
                      disabled={isProcessing || isUploadingRef.current}
                      className={`w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all ${
                        isProcessing || isUploadingRef.current
                          ? 'bg-gray-100 dark:bg-gray-800/50 disabled:text-gray-500 dark:disabled:text-gray-400 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter previously uploaded file ID
                  </p>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleFileIdUpload}
                    disabled={isProcessing || isUploadingRef.current}
                    className={` ${
                      isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing || isUploadingRef.current ? 'Processing...' : 'Use File ID'}
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end">
              {/* <Button
                onClick={() => {
                  if (!isProcessing && !isUploadingRef.current) props.setUploadModal(false);
                }}
                disabled={isProcessing || isUploadingRef.current}
                variant="outline"
                className={
                  isProcessing || isUploadingRef.current ? 'opacity-50 cursor-not-allowed' : ''
                }
              >
                Cancel
              </Button> */}
              {activeTab === 'device' && !isProcessing && !isUploadingRef.current && (
                <Button onClick={handleManualUpload}>Upload</Button>
              )}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
