import * as React from "react";
import Image from "next/image";

import {FaAngleRight} from "react-icons/fa6";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TextField from "@/components/TextField";
import Select from "@/components/Select";

import RetryIcon from '@/assets/img/icons/retry.svg'
import {outputQuality, videoType} from "@/lib/constants";
import PlayIcon from "@/assets/img/icons/play.png";

export default function TrimVideo() {
  const [uploadFileModal, setUploadFileModal] = React.useState<any>(false);
  const [file, setFile] = React.useState<any>(null);
  const [startTime, setStartTime] = React.useState<any>(null);
  const [endTime, setEndTime] = React.useState<any>(null);
  const [frameRate, setFramerate] = React.useState<any>(null);
  const [audioSampleRate, setAudioSampleRate] = React.useState<any>(null);
  const videoRef = React.useRef(null)


  const props = [
    {name: "Duration", value: "122 Seconds"},
    {name: "Resolution", value: "1020x1080"},
    {name: "Size", value: "10 MB"},
  ]

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
      <div className="pt-4">
        {file && (
          <div className="mt-4 grid grid-cols-12">
            <div className="relative bg-[#000000] w-[138%] rounded-md p-1">
              <video ref={videoRef} className="col-span-1 min-w-[80px] min-h-[45px] max-w-[80px] max-h-[45px]">
                <source src={URL.createObjectURL(file)} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              <Image className="absolute inset-0 left-3 bottom-1 m-auto object-contain" src={PlayIcon} alt="Play Icon"/>
            </div>
            <div className="pl-8 col-span-10">
              <p className="text-base font-lato font-bold text-[#2c2c2c]">{file.name}</p>
              <div className="flex gap-3">
                {props.map(prop => (
                  <div className="flex items-end gap-1">
                    <p className="text-base font-lato font-bold text-[#a0aec9]">{prop.name}: </p>
                    <p className="text-sm font-lato font-normal text-[#a0aec9]">{prop.value}: </p>
                  </div>
                ) )}
              </div>
            </div>
            <div className="col-span-1 place-items-end">
              <Image onClick={() => setUploadFileModal(true)} src={RetryIcon} alt="retry" className="cursor-pointer" />
            </div>
          </div>
        )}
        {!file && (
          <Button
            onClick={() => setUploadFileModal(true)}
            className="max-w-[113px] py-[6.5px] font-bold border border-2 border-neutral-300 text-[#4f4f4f]"
            label="Add File"
            variant="contained"
            border
          />
        )}
      </div>
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
      />
    </div>
  )
}
