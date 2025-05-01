import React, { useState, useRef, useCallback } from 'react';
import { Fade, Modal, Box } from '@mui/material';
import { TbXboxX } from 'react-icons/tb';
import { lato, montserrat, opensans } from '@/lib/fonts';
import toast from 'react-hot-toast';
import { fileUploader } from '@/lib/uploadFile';
import DropzoneComponent from '@/components/DropZone.tsx';
import { HiLink, HiFingerPrint, HiOutlineDeviceMobile } from 'react-icons/hi';

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
  bgcolor: 'background.paper',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' as any,
  borderRadius: '16px',
  zIndex: 1500,
  p: 0,
  overflow: 'hidden',
};

export default function UploadFileModal(props: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'url' | 'fileId'>('device');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
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
        return;
      }

      await fileUploader(
        response.data.presigned_url,
        file,
        props.setUploadModal,
        props.setIsUploading,
        props.setProgress
      );

      if (props.setFileId) {
        props.setFileId(response.data.file_id);
      }

      toast.success('File uploaded successfully!');

      // Close the modal after a delay
      setTimeout(() => {
        props.setUploadModal(false);
        setIsProcessing(false);
        setUploadedFileName(null);
        // Reset the uploading flag only after the modal is closed
        isUploadingRef.current = false;
      }, 500);
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

  const handleUrlUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProcessing || !urlInputRef.current?.value) return;

    // Implement URL upload logic
    setIsProcessing(true);
    isUploadingRef.current = true;
    toast.success('URL upload functionality will be implemented');

    setTimeout(() => {
      props.setUploadModal(false);
      setIsProcessing(false);
      isUploadingRef.current = false;
    }, 500);
  };

  const handleFileIdUpload = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleManualUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProcessing || isUploadingRef.current) return;
    props.setUploadModal(false);
  };

  // Reset the fileSelected state when the modal opens or closes
  React.useEffect(() => {
    if (!props.uploadModal) {
      // Small delay to ensure the modal is fully closed
      setTimeout(() => {
        setFileSelected(false);
        isUploadingRef.current = false;
      }, 100);
    }
  }, [props.uploadModal]);

  return (
    <Modal
      open={props.uploadModal}
      onClose={() => {
        // Only close if not processing
        if (!isProcessing && !isUploadingRef.current) {
          props.setUploadModal(false);
        }
      }}
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
          className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white relative">
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (!isProcessing && !isUploadingRef.current) props.setUploadModal(false);
              }}
              disabled={isProcessing || isUploadingRef.current}
              className={`absolute right-6 top-6 text-white/80 hover:text-white transition-colors ${
                isProcessing || isUploadingRef.current ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Close modal"
            >
              <TbXboxX size={24} />
            </button>
            <h3 className="text-2xl font-bold">Upload Media</h3>
            <p className="mt-1 text-white/80 text-sm">Select a video file to upload and edit</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
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
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HiOutlineDeviceMobile className="mr-2" size={18} />
              Device
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                if (!isProcessing && !isUploadingRef.current) setActiveTab('url');
              }}
              disabled={isProcessing || isUploadingRef.current}
              className={`flex items-center justify-center py-4 px-6 text-sm font-medium focus:outline-none ${
                isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                activeTab === 'url'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HiLink className="mr-2" size={18} />
              URL
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
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
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
                <h4 className="text-gray-700 font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-md mr-2">
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
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <div className="animate-pulse flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="animate-spin w-8 h-8 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-1">Processing</h3>
                      <p className="text-sm text-gray-500 mb-2">Uploading {uploadedFileName}</p>
                      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
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
                      className="border-gray-300 hover:border-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <div className="mt-2 mb-2 text-center">
                      <p className="text-xs text-gray-500">
                        Supported formats: MP4, MOV, AVI, WEBM, FLV
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* URL Upload */}
            {activeTab === 'url' && (
              <div>
                <h4 className="text-gray-700 font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-md mr-2">
                    <HiLink size={18} />
                  </span>
                  Upload from URL
                </h4>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Video URL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                      <HiLink size={18} />
                    </span>
                    <input
                      ref={urlInputRef}
                      type="text"
                      placeholder="https://example.com/video.mp4"
                      disabled={isProcessing || isUploadingRef.current}
                      className={`w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        isProcessing || isUploadingRef.current
                          ? 'bg-gray-100 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter a direct link to a video file</p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleUrlUpload}
                    disabled={isProcessing || isUploadingRef.current}
                    className={`w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg ${
                      isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing || isUploadingRef.current ? 'Processing...' : 'Upload from URL'}
                  </button>
                </div>
              </div>
            )}

            {/* File ID Upload */}
            {activeTab === 'fileId' && (
              <div>
                <h4 className="text-gray-700 font-medium mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-md mr-2">
                    <HiFingerPrint size={18} />
                  </span>
                  Upload by File ID
                </h4>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Video File ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                      <HiFingerPrint size={18} />
                    </span>
                    <input
                      ref={fileIdInputRef}
                      type="text"
                      placeholder="Enter file ID"
                      disabled={isProcessing || isUploadingRef.current}
                      className={`w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        isProcessing || isUploadingRef.current
                          ? 'bg-gray-100 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter previously uploaded file ID</p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleFileIdUpload}
                    disabled={isProcessing || isUploadingRef.current}
                    className={`w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg ${
                      isProcessing || isUploadingRef.current ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing || isUploadingRef.current ? 'Processing...' : 'Use File ID'}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isProcessing && !isUploadingRef.current) props.setUploadModal(false);
                }}
                disabled={isProcessing || isUploadingRef.current}
                className={`flex-1 py-3 px-6 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                  isProcessing || isUploadingRef.current ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Cancel
              </button>
              {activeTab === 'device' && !isProcessing && !isUploadingRef.current && (
                <button
                  onClick={handleManualUpload}
                  className="flex-1 py-3 px-6 text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
