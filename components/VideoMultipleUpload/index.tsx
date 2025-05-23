import * as React from 'react';
import Image from 'next/image';
import {
  HiOutlineCloudUpload,
  HiOutlineRefresh,
  HiOutlineVideoCamera,
  HiOutlinePlusCircle,
  HiOutlineX,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from 'react-icons/hi';
import Button from '../ui/button/Button';

type MultipleMediaUploadProps = {
  files: any[];
  videoRef: React.Ref<any>;
  setUploadFileModal: (open: boolean) => void;
  setUploadFileIndex: (index: number) => void;
  progress: number;
  uploadedData: any;
  fetchedData: any[];
  setFetchedData: (data: any[]) => void;
  isUploading?: boolean;
  clearFileInfo?: boolean;
  handleRemoveFile: (index: number) => void;
  selectedFileIndex?: number;
  setSelectedFileIndex?: (index: number) => void;
  durations?: number[];
  setDurations?: (durations: number[]) => void;
  reorderFiles?: (startIndex: number, endIndex: number) => void;
};

export function VideoMultipleUpload(props: MultipleMediaUploadProps) {
  // Track when data is loading to prevent flashing of old data
  const [isDataTransitioning, setIsDataTransitioning] = React.useState(false);
  console.log('props.fetchedData', props.fetchedData);

  // Watch for changes in fetchedData or files to handle transitions
  React.useEffect(() => {
    if (!props.fetchedData || !props.files || props.files.length === 0) {
      setIsDataTransitioning(false);
    } else {
      setIsDataTransitioning(false);
    }
  }, [props.fetchedData, props.files]);

  // Handle duration change for a specific file
  const handleDurationChange = (index: number, value: string) => {
    if (!props.setDurations || !props.durations) return;

    const newDurations = [...props.durations];
    newDurations[index] = parseFloat(value) || 0;
    props.setDurations(newDurations);
  };

  // Move a file up in the order
  const moveFileUp = (index: number) => {
    if (index <= 0 || !props.reorderFiles) return;
    props.reorderFiles(index, index - 1);
  };

  // Move a file down in the order
  const moveFileDown = (index: number) => {
    if (!props.files || index >= props.files.length - 1 || !props.reorderFiles) return;
    props.reorderFiles(index, index + 1);
  };

  // Determine if we have valid files to show, but respect clearFileInfo flag
  const hasValidFiles = !props.clearFileInfo && props.files && props.files.length > 0;

  // Get current file name from best available source
  const getFileName = (index: number) => {
    if (props.files && props.files[index]) {
      return props.files[index].name;
    }
    return 'Media file';
  };

  // Check if a file has metadata
  const fileHasMetadata = (index: number) => {
    return (
      props.fetchedData &&
      props.fetchedData[index] &&
      props.fetchedData[index].metadata &&
      props.fetchedData[index].metadata.thumbnail_url
    );
  };

  // Render a single file item
  const renderFileItem = (file: any, index: number) => {
    const isSelected = props.selectedFileIndex === index;
    let metadata = fileHasMetadata(index) ? props.fetchedData[index].metadata : null;

    const showFileData = fileHasMetadata(index);

    return (
      <div
        className={`mt-4 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border ${
          isSelected
            ? 'border-blue-500 dark:border-blue-400'
            : 'border-gray-200 dark:border-gray-800'
        } shadow-sm hover:shadow-md transition-shadow duration-300`}
        onClick={() => props.setSelectedFileIndex && props.setSelectedFileIndex(index)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail/Preview */}
          <div className="relative bg-white dark:bg-gray-900 w-full sm:w-48 flex-shrink-0 h-36 flex items-center justify-center overflow-hidden">
            {showFileData ? (
              <div className="relative w-full h-full">
                <Image
                  src={props.fetchedData[index].metadata.thumbnail_url}
                  fill={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 800px) 192px, 192px"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  alt="Media thumbnail"
                />
              </div>
            ) : (
              <div className="relative bg-gray-50 dark:bg-gray-800 w-full h-36 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-3 flex items-center justify-center">
                  <HiOutlineCloudUpload className="text-blue-500 dark:text-blue-400 text-2xl animate-pulse" />
                </div>
                {props.isUploading && isSelected ? (
                  <div className="w-32 flex flex-col items-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
                      Uploading...
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${props.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                      {props.progress}%
                    </p>
                  </div>
                ) : (
                  <div className="w-32">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                      {metadata ? 'Ready' : 'Analyzing...'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* File Details */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              {/* Filename & Actions */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-900 dark:text-white/90 font-semibold text-lg truncate pr-4 overflow-hidden">
                  {getFileName(index).slice(0, 20)}...
                </h3>
                <div className="flex">
                  {/* Reorder buttons */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      moveFileUp(index);
                    }}
                    disabled={index === 0 || props.isUploading}
                    className={`p-2 rounded-full ${
                      index === 0 || props.isUploading
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    } transition-colors flex items-center justify-center`}
                    aria-label="Move up"
                  >
                    <HiOutlineArrowUp className="text-lg" />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      moveFileDown(index);
                    }}
                    disabled={index === props.files.length - 1 || props.isUploading}
                    className={`p-2 rounded-full ${
                      index === props.files.length - 1 || props.isUploading
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    } transition-colors flex items-center justify-center`}
                    aria-label="Move down"
                  >
                    <HiOutlineArrowDown className="text-lg" />
                  </button>

                  {/* Remove button */}
                  {props.handleRemoveFile && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        props.handleRemoveFile(index);
                      }}
                      disabled={props.isUploading}
                      className={`p-2 rounded-full mr-1 ${
                        props.isUploading
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      } transition-colors flex items-center justify-center`}
                      aria-label="Remove file"
                    >
                      <HiOutlineX className="text-lg" />
                    </button>
                  )}

                  {/* Replace button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (props.setSelectedFileIndex) props.setSelectedFileIndex(index);
                      if (props.setUploadFileIndex) props.setUploadFileIndex(index);
                      props.setUploadFileModal(true);
                    }}
                    disabled={props.isUploading}
                    className={`p-2 rounded-full ${
                      props.isUploading
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    } transition-colors flex items-center justify-center`}
                    aria-label="Replace media"
                  >
                    <HiOutlineRefresh className="text-lg" />
                  </button>
                </div>
              </div>
              {/* Duration input for images */}
              {props.durations && file.type.startsWith('image/') && (
                <div className="mb-2 flex items-center gap-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (seconds) :
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={props.durations[index] || ''}
                    onChange={e => handleDurationChange(index, e.target.value)}
                    className="w-full max-w-[50px] text-black dark:text-white bg-white dark:bg-gray-800 pl-3 pr-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md outline-none transition-all"
                  />
                </div>
              )}

              {/* File Metadata */}
              {metadata ? (
                <div className="flex flex-col md:flex-row gap-6 mb-1">
                  {!file.type.startsWith('image/') && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Duration:</span>
                      <span>{Math.floor(metadata?.duration ?? 0)} sec</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span className="mr-1.5 font-medium">Resolution:</span>
                    <span>
                      {metadata?.width ?? 0} × {metadata?.height ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span className="mr-1.5 font-medium">Size:</span>
                    <span>{((metadata?.size ?? 0) / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 mb-1">
                  {!file.type.startsWith('image/') && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <span className="mr-1.5 font-medium">Duration:</span>
                      <span>0 sec</span>
                    </div>
                  )}

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
            </div>

            {/* Status Indicator */}
            <div className="mt-3">
              {fileHasMetadata(index) && (
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-1.5"></span>
                  Ready to process
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {hasValidFiles ? (
        <div className="space-y-4">
          {props.files.map((file, index) => (
            <div key={index}>{renderFileItem(file, index)}</div>
          ))}
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800/30">
          <div className="mb-4 w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <HiOutlineVideoCamera className="text-blue-500 dark:text-blue-400 text-3xl" />
          </div>
          <h3 className="text-gray-800 dark:text-white/90 font-medium text-lg mb-2">
            No media selected
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 text-center">
            Upload media files to start joining
          </p>
          <Button
            onClick={() => {
              if (props.setSelectedFileIndex) props.setSelectedFileIndex(0);
              if (props.setUploadFileIndex) props.setUploadFileIndex(0);
              props.setUploadFileModal(true);
            }}
          >
            Select Media
          </Button>
        </div>
      )}
    </div>
  );
}
