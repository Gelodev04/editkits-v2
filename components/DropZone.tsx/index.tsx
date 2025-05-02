'use client';
import React from 'react';
import ComponentCard from '@/components/cards/ComponentCard';
import { useDropzone } from 'react-dropzone';
import { HiOutlineUpload } from 'react-icons/hi';
import { BsFileEarmarkImage, BsFileEarmarkPlay } from 'react-icons/bs';

interface DropzoneComponentProps {
  title?: string;
  onFileSelect?: (files: File[]) => void;
  acceptTypes?: Record<string, string[]>;
  showCard?: boolean;
  className?: string;
  maxSize?: number;
  desc?: string;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  title = 'Dropzone',
  onFileSelect,
  acceptTypes,
  showCard = true,
  className = '',
  maxSize = 1024 * 1024 * 100, // Default 100MB
  desc = '',
}) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      console.log('Files dropped:', acceptedFiles);
      if (onFileSelect && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles);
      }
    },
    [onFileSelect]
  );

  const defaultAcceptTypes = {
    'image/png': [],
    'image/jpeg': [],
    'image/webp': [],
    'image/svg+xml': [],
    'video/mp4': [],
    'video/quicktime': [],
    'video/x-msvideo': [],
    'video/webm': [],
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    onDrop,
    accept: acceptTypes || defaultAcceptTypes,
    noClick: false,
    noKeyboard: false,
    maxSize,
  });

  const hasVideo = acceptTypes && Object.keys(acceptTypes).some(type => type.startsWith('video/'));
  const hasImage = acceptTypes && Object.keys(acceptTypes).some(type => type.startsWith('image/'));

  const FileIcon = () => {
    if (hasVideo) return <BsFileEarmarkPlay className="text-blue-500" size={28} />;
    if (hasImage) return <BsFileEarmarkImage className="text-blue-500" size={28} />;
    return <HiOutlineUpload className="text-blue-500" size={28} />;
  };

  // Format accepted file types for display
  const getAcceptedFileTypes = () => {
    const types = acceptTypes || defaultAcceptTypes;
    const fileTypes = Object.keys(types);

    if (fileTypes.every(type => type.startsWith('video/'))) {
      return 'videos (MP4, MOV, AVI, WEBM)';
    } else if (fileTypes.every(type => type.startsWith('image/'))) {
      return 'images (JPG, PNG, WebP, SVG)';
    } else {
      return 'media files';
    }
  };

  const dropzoneContent = (
    <div
      className={`transition border-2 border-dashed rounded-xl overflow-hidden ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : isDragReject
          ? 'border-red-500 bg-red-50'
          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30'
      } ${className}`}
    >
      <div
        {...getRootProps()}
        className="px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-all outline-none"
      >
        <input {...getInputProps()} />

        <div className="mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <FileIcon />
        </div>

        <div className="space-y-2 text-center">
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600">Drop files here</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-800">Drag & drop your files</p>
              <p className="text-sm text-gray-500">
                <span className="text-blue-500 font-medium">Browse files</span> from your device
              </p>
            </>
          )}

          {isDragReject && (
            <p className="text-sm text-red-500">
              File type not supported. Please upload {getAcceptedFileTypes()}.
            </p>
          )}

          {acceptedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg w-full max-w-xs">
              <p className="text-sm text-blue-700 truncate">Selected: {acceptedFiles[0].name}</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <input
            id="dropzone-file-input"
            type="file"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0 && onFileSelect) {
                onFileSelect(Array.from(e.target.files));
              }
            }}
            accept={Object.keys(acceptTypes || defaultAcceptTypes).join(',')}
          />
        </div>
      </div>
    </div>
  );

  return showCard ? (
    <ComponentCard title={title} desc={desc}>
      {dropzoneContent}
    </ComponentCard>
  ) : (
    dropzoneContent
  );
};

export default DropzoneComponent;
