import * as React from 'react';
import Image from 'next/image';
import {
  HiOutlineCloudUpload,
  HiOutlineRefresh,
  // HiPlay,
  HiOutlineVideoCamera,
} from 'react-icons/hi';
import Button from '../ui/button/Button';

type VideoUploadProps = {
  file: any;
  videoRef: React.Ref<any>;
  setUploadFileModal: any;
  progress: number;
  uploadedData: any;
  fetchedData: any;
  isUploading?: boolean;
};

export function VideoUpload(props: VideoUploadProps) {
  // Don't show any video data while uploading is in progress
  const showVideoData = props.file && props.fetchedData?.metadata && !props.isUploading;

  return (
    <div className="pt-2">
      {props.file ? (
        <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row">
            {/* Video Thumbnail/Preview */}
            <div className="relative bg-gray-800 dark:bg-gray-900 w-full sm:w-48 h-36 flex items-center justify-center overflow-hidden">
              {showVideoData && props.fetchedData?.metadata?.thumbnail_url ? (
                <Image
                  src={props.fetchedData?.metadata?.thumbnail_url}
                  className="w-full h-full object-cover"
                  width={192}
                  height={144}
                  alt="Video thumbnail"
                />
              ) : (
                <div className="relative bg-gray-50 dark:bg-gray-800 w-full h-36 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-3 flex items-center justify-center">
                    <HiOutlineCloudUpload className="text-blue-500 dark:text-blue-400 text-2xl animate-pulse" />
                  </div>
                  <div className="w-32">
                    {/* <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300 animate-pulse"
                        style={{ width: props.isUploading ? `${props.progress}%` : '100%' }}
                      ></div>
                    </div> */}
                    {!props.isUploading && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                        Analyzing...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* File Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Filename & Delete/Replace */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-900 dark:text-white/90 font-semibold text-lg truncate pr-4">
                    {props.file.name}
                  </h3>
                  <button
                    onClick={() => props.setUploadFileModal(true)}
                    disabled={props.isUploading}
                    className={`p-2 rounded-full ${
                      props.isUploading
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    } transition-colors flex items-center justify-center`}
                    aria-label="Replace video"
                  >
                    <HiOutlineRefresh className="text-lg" />
                  </button>
                </div>

                {/* Video Metadata */}
                {showVideoData && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-1">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Duration:</span>
                      <span>{Math.floor(props.fetchedData?.metadata?.duration ?? 0)} sec</span>
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Resolution:</span>
                      <span>
                        {props.fetchedData?.metadata?.width ?? 0} ×{' '}
                        {props.fetchedData?.metadata?.height ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Size:</span>
                      <span>
                        {((props.fetchedData?.metadata?.size ?? 0) / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                )}

                {!showVideoData && !props.isUploading && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-1">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Duration:</span>
                      <span>0 sec</span>
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Resolution:</span>
                      <span>0 × 0</span>
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Size:</span>
                      <span>0 MB</span>
                    </div>
                  </div>
                )}

                {props.isUploading && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uploading: {props.progress}% complete
                  </p>
                )}
              </div>

              {/* Status Indicator */}
              <div className="mt-3">
                {showVideoData && props.fetchedData?.metadata?.thumbnail_url && (
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-1.5"></span>
                    Ready to process
                  </div>
                )}

                {props.isUploading && (
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-1.5 animate-pulse"></span>
                    Uploading
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800/30">
          <div className="mb-4 w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <HiOutlineVideoCamera className="text-blue-500 dark:text-blue-400 text-3xl" />
          </div>
          <h3 className="text-gray-800 dark:text-white/90 font-medium text-lg mb-2">
            No video selected
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 text-center">
            Upload a video file to start editing
          </p>
          <Button
            onClick={() => props.setUploadFileModal(true)}
            className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Select Video
          </Button>
        </div>
      )}
    </div>
  );
}
