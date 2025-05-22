import { Modal } from '@/components/Modal';
import { Box, Fade } from '@mui/material';
import { lato, montserrat, opensans } from '@/lib/fonts';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonNew from '@/components/ButtonClose';
import { HiFingerPrint, HiOutlineDeviceMobile, HiPlus } from 'react-icons/hi';
import Lock from '@/components/icons/lock';
import DropzoneComponent from '@/components/DropZone.tsx';
import Button from '@/components/ui/button/Button';
import { fileUploader } from '@/lib/uploadFile';
import { useStatusQuery } from '@/services/api/file';

export type UploadModalProps = {
  uploadModal: boolean;
  setUploadModal: (e: React.SetStateAction<boolean>) => void;
  videoRef?: React.Ref<HTMLVideoElement>;
  file?: any;
  setFile: (e: React.SetStateAction<any>) => void;
  setFileId?: (e: React.SetStateAction<any>) => void;
  upload: any;
  isUploading?: boolean;
  setIsUploading: any;
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

export default function UploadFileModalBuffer(props: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'fileId'>('device');
  const [allFile, setAllFile] = useState<File[] | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const isUploadingRef = useRef(false);
  const [fileSelected, setFileSelected] = useState(false);
  const fileIdInputRef = useRef<HTMLInputElement>(null);
  const [fileIdError, setFileIdError] = useState<string | null>(null);
  const [fileIdToCheck, setFileIdToCheck] = useState<string | null>(null);
  const result = useStatusQuery({ fileId: fileIdToCheck }, { skip: !fileIdToCheck });

  const fileStatusData = result.data;
  const isFileStatusLoading = result.isLoading;

  async function handleFileUpload(file: File) {
    if (!props.setIsUploading || !props.upload || isProcessing || isUploadingRef.current) return;

    try {
      isUploadingRef.current = true;
      setIsProcessing(true);
      setUploadedFileName(uploadedFileName ? [...uploadedFileName, file.name] : [file.name]);
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
        isUploadingRef.current = false;
        console.log('File uploaded successfully!', uploadedFileName);
        toast.success('File uploaded successfully!');
      } catch (error: any) {
        console.error('Upload error:', error);
        const errorMsg = error.response?.data?.errorMsg || 'An error occurred during upload';
        toast.error(errorMsg);
        setIsProcessing(false);
        props.setIsUploading(false);
        isUploadingRef.current = false;
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMsg = error.response?.data?.errorMsg || 'An error occurred during upload';
      toast.error(errorMsg);
      setIsProcessing(false);
      props.setIsUploading(false);
      isUploadingRef.current = false;
    }
  }

  const handleFileChange = async (acceptedFiles: File[]) => {
    if (isProcessing || isUploadingRef.current) return;
    for (let i = 0; i < acceptedFiles.length; i++) {
      let file = acceptedFiles[i];
      if ((file && file.type.startsWith('video/')) || file.type.startsWith('image/')) {
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
        } else {
          toast.error('Please upload a valid video file.');
          setFileSelected(false);
          isUploadingRef.current = false;
        }
      }
    }
  };

  const isValidUUID = (uuid: string): boolean => {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(uuid);
  };

  const handleFileIdUpload = () => {
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

  const AddFileID = () => {
    if (isProcessing || isFileStatusLoading || !fileIdInputRef.current?.value) return;
    const fileId = fileIdInputRef.current.value.trim();

    if (!isValidUUID(fileId)) {
      setFileIdError('Incorrect file ID');
      return;
    }
    // Validate UUID format
  };

  const handleClose = () => {
    // if (!isProcessing && !isUploadingRef.current && !props.isUploading) {
    //   props.setUploadModal(false);
    //   setFileIdToCheck(null);
    //   setFileIdError(null);
    // } else {
    //   toast.error("Upload in progress. Please wait until it's complete.");
    // }
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
          <div className="px-8 py-6 relative border-b border-gray-100 dark:border-gray-800">
            <ButtonNew
              handleClose={handleClose}
              disabled={isProcessing || isUploadingRef.current || props.isUploading}
            />
            <h3 className="text-2xl text-gray-900 dark:text-white/90 font-bold">Upload Media</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm">
              Select a video file to upload and edit
            </p>
          </div>
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
                  ? 'text-blue-500 border-b-2 border-blue-500'
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
                  ? 'text-blue-500 border-b-2 border-blue-500'
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
                    <Lock />
                  </span>
                  Upload from your device
                </h4>

                <>
                  <DropzoneComponent
                    showCard={false}
                    onFileSelect={handleFileChange}
                    title=""
                    className="border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-200"
                  />
                  <div className="mt-2 mb-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supported formats: MP4, MOV, WEBM, PNG, JPG, JPEG and many more.
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
                    <Button onClick={AddFileID}>
                      Add File <HiPlus size={18} className="ml-2" />
                    </Button>
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
            <div className="flex justify-end">{/* Add any action buttons here if needed */}</div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
