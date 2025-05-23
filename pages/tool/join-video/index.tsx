import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FileProgressModal from '@/components/modals/FilePgrogressModal';
import Button from '@/components/ui/button/Button';
import { HiOutlineVideoCamera, HiOutlineAdjustments, HiArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ComponentToolCard from '@/components/ComponentToolCard';
import ErrorModal from '@/components/modals/ErrorModal';
import { HeaderToolInput, HeaderToolProperties } from '@/components/HeaderTool';
import { useStatusQuery, useUploadMutation, useLazyStatusQuery } from '@/services/api/file';
import { useInitJobMutation, useCommitJobMutation, useJobStatusQuery } from '@/services/api/job';
import OutputQualityVideo from '@/components/OutputQualityVideo';
import UploadMultipleFileModal from '@/components/modals/UploadMultipleFileModal';
import { VideoMultipleUpload } from '@/components/VideoMultipleUpload';

export default function JoinMedia() {
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [upload] = useUploadMutation();

  // Add lazy status query hook for manually fetching file status
  const [triggerStatusQuery] = useLazyStatusQuery();

  // Only fetch status for the selected file
  const { data: fileData, refetch: refetchFile } = useStatusQuery(
    { fileId: fileIds[selectedFileIndex] },
    { skip: !fileIds[selectedFileIndex] }
  );

  const { data: jobData, refetch: refetchJob } = useJobStatusQuery(
    { job_id: jobId },
    { skip: !jobId }
  );

  const [initJob] = useInitJobMutation();
  const [commitJob] = useCommitJobMutation();

  const [outputQuality, setOutputQuality] = useState('MEDIUM');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [clearInfo, setClearInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  interface ImageMeta {
    width: number;
    height: number;
  }

  // Function to reset all states
  const resetAllStates = () => {
    setFiles([]);
    setFileIds([]);
    setJobId(null);
    setFetchedData([]);
    setDurations([]);
    setProgress(0);
    setClearInfo(true);
    setSelectedFileIndex(0);
    setUploadIndex(0);

    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  // Handle adding a new file
  const handleFileChange = (newFile: any, index: number) => {
    if (!newFile) return;

    // Create new files array with updated file at index
    const newFiles = [...files];
    newFiles[index] = newFile;
    setFiles(newFiles);

    // Ensure fetchedData array is expanded to match file array length
    const newFetchedData = [...fetchedData];
    while (newFetchedData.length < newFiles.length) {
      newFetchedData.push(null);
    }
    setFetchedData(newFetchedData);

    // Initialize duration for image files
    if (newFile.type.startsWith('image/')) {
      const newDurations = [...durations];
      newDurations[index] = 3; // Default 3 seconds
      setDurations(newDurations);
    }

    setClearInfo(false);
  };

  // Handle removing a file
  const handleRemoveFile = (index: number) => {
    // Create a copy of the arrays
    const newFiles = [...files];
    const newFileIds = [...fileIds];
    const newDurations = [...durations];
    const newFetchedData = [...fetchedData];

    // Remove the file and its associated data
    newFiles.splice(index, 1);
    newFileIds.splice(index, 1);
    newDurations.splice(index, 1);
    newFetchedData.splice(index, 1);

    // Update state
    setFiles(newFiles);
    setFileIds(newFileIds);
    setDurations(newDurations);
    setFetchedData(newFetchedData);

    // Adjust selected index if needed
    if (selectedFileIndex >= newFiles.length) {
      setSelectedFileIndex(Math.max(0, newFiles.length - 1));
    }

    // If we removed the last file, set clearInfo to true
    if (newFiles.length === 0) {
      setClearInfo(true);
    }
  };

  // Reorder files
  const reorderFiles = (startIndex: number, endIndex: number) => {
    // Create copies of all arrays
    const newFiles = [...files];
    const newFileIds = [...fileIds];
    const newDurations = [...durations];
    const newFetchedData = [...fetchedData];

    // Reorder files
    const [movedFile] = newFiles.splice(startIndex, 1);
    newFiles.splice(endIndex, 0, movedFile);

    // Reorder fileIds if we have them
    if (newFileIds.length > 0) {
      const [movedFileId] = newFileIds.splice(startIndex, 1);
      newFileIds.splice(endIndex, 0, movedFileId);
    }

    // Reorder durations if we have them
    if (newDurations.length > 0) {
      const [movedDuration] = newDurations.splice(startIndex, 1);
      newDurations.splice(endIndex, 0, movedDuration);
    }

    // Reorder fetchedData if we have them
    if (newFetchedData.length > 0) {
      const [movedMeta] = newFetchedData.splice(startIndex, 1);
      newFetchedData.splice(endIndex, 0, movedMeta);
    }

    // Update state
    setFiles(newFiles);
    setFileIds(newFileIds);
    setDurations(newDurations);
    setFetchedData(newFetchedData);

    // Update selected index to follow the moved item
    if (selectedFileIndex === startIndex) {
      setSelectedFileIndex(endIndex);
    }
  };

  // Update file ID after upload
  const updateFileId = (fileId: string, index: number) => {
    const newFileIds = [...fileIds];
    newFileIds[index] = fileId;
    setFileIds(newFileIds);
  };

  // Poll file status and fetch metadata for each file using RTK
  useEffect(() => {
    console.log('isUploading', isUploading);
    if (isUploading || fileIds.length === 0) return;

    const interval = setInterval(async () => {
      let statusofFile = true;

      const promises = fileIds.map((fileId, index) => {
        if (!fileId) return Promise.resolve();

        return (async () => {
          try {
            const result = await triggerStatusQuery({ fileId });
            const data = result.data;

            if (data.status !== 'COMMITTED' && data.status !== 'ERROR') {
              statusofFile = false;
            }

            if (data && data.metadata) {
              const newFetchedData = [...fetchedData];
              newFetchedData[index] = data;
              setFetchedData(newFetchedData);
            }
          } catch (error) {
            console.error(`Error fetching status for file ${fileId}:`, error);
          }
        })();
      });

      await Promise.all(promises);

      if (!isUploading && statusofFile) {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isUploading]);

  // Poll job status and reset on completion
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(() => {
      if (
        jobData?.status !== 'COMMITTED' &&
        jobData?.status !== 'ERROR' &&
        jobData?.status !== 'COMPLETED' &&
        jobData?.status !== 'FAILED' &&
        jobData?.status !== 'CANCELLED'
      ) {
        refetchJob();
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId, jobData?.status, refetchJob]);

  // Add a new useEffect to monitor job status changes and reset when completed
  useEffect(() => {
    // Check if job has completed, failed, or been cancelled
    if (
      jobData?.status === 'COMPLETED' ||
      jobData?.status === 'FAILED' ||
      jobData?.status === 'CANCELLED' ||
      jobData?.status === 'ERROR'
    ) {
      // Don't reset immediately to allow user to see the completion status
      // Only reset all states after modal is closed to ensure thumbnail remains visible
      if (!progressModalOpen) {
        resetAllStates();
      }
    }
  }, [jobData?.status, progressModalOpen]);

  const handleJoinVideos = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 files to join');
      return;
    }

    // Check if we have fileIds for all files
    if (fileIds.length !== files.length || fileIds.some(id => !id)) {
      toast.error('Some files are still uploading or processing');
      return;
    }

    // Check if all image files have durations set
    const allDurationsSet = files.every(
      (file, index) => !file.type.startsWith('image/') || (durations[index] && durations[index] > 0)
    );

    if (!allDurationsSet) {
      toast.error('Please set durations for all image files');
      return;
    }

    try {
      // Prepare input array for the VIDEO_JOIN tool
      const inputs = fileIds.map((fileId, index) => {
        const input: any = { file_id: fileId };

        // Only add duration for image files
        if (files[index] && files[index].type.startsWith('image/')) {
          input.duration = durations[index];
        }

        return input;
      });

      const response = await initJob({
        pipeline: [
          {
            tool_id: 'VIDEO_JOIN',
            properties: {
              inputs: inputs,
            },
          },
        ],
        output_properties: {
          output_quality: outputQuality,
          video_output_format: videoContainer,
        },
      });

      if (response.error) {
        throw response.error;
      }

      toast.success('Job initialized successfully');
      setProgressModalOpen(true);
      setUploadModalOpen(false);

      // Store job ID before resetting other states
      const jid = response.data.job_id;
      setJobId(jid);

      const commitResp = await commitJob({ job_id: jid });
      if (commitResp.error) throw commitResp.error;
      toast.success('Join job committed');
    } catch (err) {
      if (err) {
        console.error('Error processing video:', err);
        const apiError = err as any;
        const msg = apiError?.data?.errorMsg || (err as Error).message || 'Failed to join videos';
        const errLog = apiError?.data?.errorLog || apiError?.error || 'No error log available';
        setErrorLog(errLog);
        setErrorMessage(msg);
        setErrorModalOpen(true);
        setProgressModalOpen(false);
      }
    }
  };

  return (
    <ComponentToolCard title="Join Videos">
      <div className="relative z-10 px-8 py-8 ">
        <div className="mb-10">
          <HeaderToolInput>
            <HiOutlineVideoCamera size={20} />
          </HeaderToolInput>
          <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
            <VideoMultipleUpload
              videoRef={videoRef}
              files={files}
              setUploadFileModal={setUploadModalOpen}
              setUploadFileIndex={setUploadIndex}
              uploadedData={fileData}
              progress={progress}
              fetchedData={fetchedData}
              setFetchedData={setFetchedData}
              isUploading={isUploading}
              clearFileInfo={clearInfo}
              handleRemoveFile={handleRemoveFile}
              selectedFileIndex={selectedFileIndex}
              setSelectedFileIndex={setSelectedFileIndex}
              durations={durations}
              setDurations={setDurations}
              reorderFiles={reorderFiles}
            />
          </motion.div>
        </div>

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
            <OutputQualityVideo
              file={files[selectedFileIndex]}
              isUploading={isUploading}
              fetchedData={fetchedData[selectedFileIndex]}
              outputQuality={outputQuality}
              setOutputQuality={setOutputQuality}
              videoContainer={videoContainer}
              setVideoContainer={setVideoContainer}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            disabled={files.length < 2 || isUploading || fileIds.length !== files.length}
            onClick={handleJoinVideos}
          >
            Join Media <HiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {uploadModalOpen && (
        <UploadMultipleFileModal
          videoRef={videoRef}
          uploadModal={uploadModalOpen}
          setUploadModal={setUploadModalOpen}
          fileIndex={uploadIndex}
          setFile={handleFileChange}
          setFileId={updateFileId}
          upload={upload}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setProgress={setProgress}
          progress={progress}
        />
      )}
      {progressModalOpen && (
        <FileProgressModal
          progressModal={progressModalOpen}
          setProgressModal={setProgressModalOpen}
          data={jobData}
          reset={resetAllStates}
        />
      )}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
        errorLog={errorLog}
      />
    </ComponentToolCard>
  );
}
