import * as React from 'react';
import Image from 'next/image';
import {
  HiOutlineCloudUpload,
  HiOutlineRefresh,
  HiPlay,
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
  console.log('props: ', props);
  return (
    <div className="pt-2">
      {props.file ? (
        <div className="mt-4 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row">
            {/* Video Thumbnail/Preview */}
            <div className="relative bg-gray-800 w-full sm:w-48 h-36 flex items-center justify-center overflow-hidden">
              {props.uploadedData?.status === 'COMMITTED' &&
              !props.isUploading &&
              props.fetchedData?.metadata?.thumbnail_url ? (
                <>
                  <Image
                    src={props.fetchedData?.metadata?.thumbnail_url}
                    className="w-full h-full object-cover"
                    width={200}
                    height={150}
                    alt="Video thumbnail"
                    style={{ objectFit: 'cover', width: 'fit', height: 'fit' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-40 transition-all cursor-pointer">
                      <HiPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative bg-gray-50 w-full h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 mb-3 flex items-center justify-center">
                    <HiOutlineCloudUpload className="text-blue-500 text-2xl" />
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${props.isUploading ? props.progress : 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-1">
                      {props.isUploading ? `Uploading: ${props.progress}%` : 'Processing video...'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Filename & Delete/Replace */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-900 font-semibold text-lg truncate pr-4">
                    {props.file.name}
                  </h3>
                  <button
                    onClick={() => props.setUploadFileModal(true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700"
                    aria-label="Replace video"
                  >
                    <HiOutlineRefresh className="text-lg" />
                  </button>
                </div>

                {/* Video Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-1">
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-1.5 font-medium">Duration:</span>
                    <span>{Math.floor(props.fetchedData?.metadata?.duration ?? 0)} seconds</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-1.5 font-medium">Resolution:</span>
                    <span>
                      {props.fetchedData?.metadata?.width ?? 0} ×{' '}
                      {props.fetchedData?.metadata?.height ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-1.5 font-medium">Size:</span>
                    <span>
                      {((props.fetchedData?.metadata?.size ?? 0) / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              {props.uploadedData?.status === 'COMMITTED' &&
                !props.isUploading &&
                props.fetchedData?.metadata?.thumbnail_url && (
                  <div className="mt-3">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                      Ready to process
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
          <div className="mb-4 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <HiOutlineVideoCamera className="text-blue-500 text-3xl" />
          </div>
          <h3 className="text-gray-800 font-medium text-lg mb-2">No video selected</h3>
          <p className="text-gray-700 text-sm mb-6 text-center">
            Upload a video file to start editing
          </p>
          <Button
            onClick={() => props.setUploadFileModal(true)}
            className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Select Video
          </Button>
        </div>
      )}
    </div>
  );
}
