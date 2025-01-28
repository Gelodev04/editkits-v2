import * as React from "react";

import {FaAngleRight} from "react-icons/fa6";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TextField from "@/components/TextField";
import Select from "@/components/Select";

import {outputQuality, videoType} from "@/lib/constants";
import {VideoUpload} from "@/components/VideoUpload";
import {useStatusQuery, useUploadMutation} from "@/services/api";
import {useEffect} from "react";

export default function TrimVideo() {
  const [uploadFileModal, setUploadFileModal] = React.useState<any>(false);
  const [file, setFile] = React.useState<any>(null);
  const [startTime, setStartTime] = React.useState<any>(null);
  const [endTime, setEndTime] = React.useState<any>(null);
  const [frameRate, setFramerate] = React.useState<any>(null);
  const [audioSampleRate, setAudioSampleRate] = React.useState<any>(null);
  const videoRef = React.useRef(null);

  const [fileId, setFileId] = React.useState(null);
  const [upload] = useUploadMutation();
  const { data , refetch } = useStatusQuery({ fileId }, { skip: !fileId });
  const [fetchedData, setFetchedData] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

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

  return (
    <div className="max-w-[768px] px-12 lg:px-0 mx-auto">
      <div className="pt-16">
        <Typography
          label="Trim Video"
          variant="h2"
          center
        />
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
      <UploadFileModal uploadModal={uploadFileModal} setUploadModal={setUploadFileModal} />
      <div className="w-full border-b-2 pt-4 border-[#D9D9D9]"/>
      <div className="flex justify-between gap-6 py-8">
        <div className="w-full">
          <TextField
            type="number"
            value={startTime}
            onChange={(e) => setStartTime((e.target.value))}
            disabled={!file}
            placeholder="0 second"
            variant="t2"
            label="Start time"
          />
        </div>
        <div className="w-full">
          <TextField
            disabled={!file}
            type="number"
            placeholder="1000 seconds"
            variant="t2"
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
            options={outputQuality}
            disabled={!file}
          />
        </div>
        <div className="w-full">
          <Select
            placeholder="Mp4"
            variant="t2"
            label="Video Container"
            options={videoType}
            disabled={!file}

          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full">
          <TextField
            disabled={!file}
            placeholder="30"
            variant="t2"
            label="Framerate"
            type="number"
            value={frameRate}
            onChange={(e) => setFramerate((e.target.value))}
          />
        </div>
        <div className="w-full">
          <TextField
            disabled={!file}
            placeholder="480000"
            variant="t2"
            label="Audio Sample Rate"
            type="number"
            value={audioSampleRate}
            onChange={(e) => setAudioSampleRate(e.target.value)}
          />
        </div>
      </div>
      <div className="max-w-[171px] mx-auto py-16">
        <Button disabled={!file} label="Proceed" variant="contained" filled rightIcon={<FaAngleRight/>} />
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
      />
    </div>
  )
}