import { useState, useEffect, useRef } from "react";

import {FaAngleRight} from "react-icons/fa6";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import UploadFileModal from "@/components/modals/UploadFileModal";
import InputField from "@/components/InputField";
import Select from "@/components/Select";

import {outputQualityList, videoType} from "@/lib/constants";
import {VideoUpload} from "@/components/VideoUpload";
import {
  useCommitJobMutation,
  useInitJobMutation,
  useJobStatusQuery,
} from "@/services/api/job";

import {useStatusQuery, useUploadMutation} from "@/services/api/file";
import toast from "react-hot-toast";
import FileProgressModal from "@/components/modals/FilePgrogressModal";
import PopUp from "@/components/modals/Popup";

export default function TrimVideo() {
  const [fileId, setFileId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [upload] = useUploadMutation();
  const { data , refetch } = useStatusQuery({ fileId }, { skip: !fileId });
  const { data: jobData, refetch: refetchJobData } = useJobStatusQuery({ job_id: jobId }, { skip: !jobId})
  const [initJob, {isLoading: isInitLoading}] = useInitJobMutation();
  const [commitJob, {isLoading: isCommitLoading}] = useCommitJobMutation();

  const [uploadFileModal, setUploadFileModal] = useState<any>(false);
  const [progressModal, setProgressModal] = useState<any>(false);
  const [file, setFile] = useState<any>(null);
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const videoRef = useRef(null);

  const [fetchedData, setFetchedData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [outputQuality, setOutputQuality] = useState("LOW");
  const [videoContainer, setVideoContainer] = useState("mp4");

  const [uploadedModal, setUploadedModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      //@ts-ignore
      if(data?.status !== "COMMITTED" && data?.status !== "ERROR" && fileId) {
        refetch();
      }
      // @ts-ignore
      setFetchedData(data)
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(() => {
      if (
        // @ts-ignore
        jobData?.status !== "COMMITTED" &&
        // @ts-ignore
        jobData?.status !== "ERROR" &&
        // @ts-ignore
        jobData?.status !== "COMPLETED" &&
        // @ts-ignore
        jobData?.status !== "FAILED" &&
        // @ts-ignore
        jobData?.status !== "CANCELLED"
      ) {
        refetchJobData();
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
    // @ts-ignore
  }, [jobId, jobData?.status]);

  async function handleTrimVideo() {
    try {
      const response = await initJob({
        pipeline: [
          {
            tool_id: "VIDEO_TRIM",
            properties: {
              input: fileId,
              start_time: startTime,
              end_time: endTime,
            },
          },
        ],
        output_properties: {
          output_quality: outputQuality,
          video_output_format: videoContainer,
        },
      });

      if (response.error) {
        console.error("Error initializing job:", response.error);
        toast.error("Failed to initialize job");
        return;
      }

      toast.success("Job initialized successfully");
      setProgressModal(true)

      const { job_id } : any = response.data;
      setJobId(job_id);

      await handleCommitJob(job_id);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  async function handleCommitJob(jobId) {
    if (!jobId) {
      toast.error("Invalid job ID");
      return;
    }

    try {
      const response = await commitJob({ job_id: jobId });

      if (response.error) {
        console.error("Error committing job:", response.error);
        // @ts-ignore
        toast.error(response.error.errMsg || "Failed to commit job");
        return;
      }

      toast.success("Job committed successfully");
    } catch (error) {
      console.error("Unexpected error in commit:", error);
      toast.error("An unexpected error occurred while committing");
    }
  }



  return (
    <div className="max-w-[768px] px-12 lg:px-0 mx-auto">
      <div className="pt-16">
        <p className="font-montserrat font-extrabold text-[32px] leading-[45px] text-[#262628] text-center">Trim Video</p>
        <Typography
          className="font-lato text-[#000] pt-3"
          label="Quickly cut unwanted sections from your video to enhance its flow"
          center
        />
        <Typography
          label="Input Properties"
          variant="bb1"
          className="text-[#2c2c2c] pt-16"
        />
      </div>
      <div className="w-full border-b-2 pt-4 border-[#D9D9D9]"/>
      <VideoUpload videoRef={videoRef} file={file} setUploadFileModal={setUploadFileModal} uploadedData={data} progress={progress} fetchedData={fetchedData} isUploading={isUploading} />
      <div className="pt-14">
        <Typography
          label="Tools Properties"
          variant="bb1"
          className="text-[#2c2c2c]"
        />
      </div>
      <UploadFileModal
        uploadModal={uploadFileModal}
        setUploadModal={setUploadFileModal}
      />
      <div className="w-full border-b-2 pt-4 border-[#D9D9D9]"/>
      <div className="flex justify-between gap-6 py-8">
        <div className="w-full">
          <InputField
            type="text"
            value={startTime}
            onChange={(e) => setStartTime((e.target.value))}
            disabled={!file}
            placeholder="0 second"
            label="Start time"
          />
        </div>
        <div className="w-full">
          <InputField
            disabled={!file}
            type="text"
            placeholder="1000 seconds"
            label="End time"
            value={endTime}
            onChange={(e) => setEndTime((e.target.value))}
          />
        </div>
      </div>
      <div className="pt-14">
        <Typography
          label="Output Properties"
          variant="bb1"
          className="text-[#2c2c2c]"
        />
      </div>
      <div className="w-full border-b-2 pt-4 border-[#D9D9D9]"/>
      <div className="flex justify-between gap-6 py-8">
        <div className="w-full">
          <Select
            placeholder="Medium"
            variant="t2"
            label="Output Quality"
            options={outputQualityList}
            disabled={!file}
            onChange={(e) => setOutputQuality(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Select
            placeholder="Mp4"
            variant="t2"
            label="Video Container"
            options={videoType}
            disabled={!file}
            onChange={(e) => setVideoContainer(e.target.value)}
          />
        </div>
      </div>
      <div className="max-w-[171px] mx-auto py-16">
        <Button
          onClick={handleTrimVideo}
          disabled={!file || isInitLoading || isCommitLoading || isInitLoading}
          label="Proceed"
          variant="primary"
          filled
          rightIcon={<FaAngleRight/>}
          isLoading={isInitLoading}
        />
      </div>
      <UploadFileModal
        videoRef={videoRef}
        uploadModal={uploadFileModal}
        setUploadModal={setUploadFileModal}
        file={file}
        setFile={setFile}
        upload={upload}
        setFileId={setFileId}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        setProgress={setProgress}
        uploadedModal={uploadedModal}
        setUploadedModal={setUploadedModal}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
      />
      <FileProgressModal
        progressModal={progressModal}
        setProgressModal={setProgressModal}
        data={jobData}
        fetchedData={fetchedData}
      />
      <PopUp
        open={uploadedModal}
        description={modalMessage}
        title={modalTitle}
        setOpen={setUploadedModal}
      />
    </div>
  )
}