import * as React from "react";
import Image from "next/image";

import {FaAngleRight} from "react-icons/fa6";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TextField from "@/components/TextField";
import Select from "@/components/Select";

import RetryIcon from '@/assets/img/icons/retry.svg'
import ColorPicker from "@/components/ColorPicker";

export default function ResizeVideo() {
  const [uploadFileModal, setUploadFileModal] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const props = [
    {name: "Duration", value: "122 Seconds"},
    {name: "Resolution", value: "1020x1080"},
    {name: "Size", value: "10 MB"},
  ]

  return (
    <div className="max-w-[768px] px-12 lg:px-0 mx-auto">
      <div className="pt-16">
        <Typography
          label="Resize Video"
          variant="h2"
          center
        />
        <Typography
          className="font-lato text-[#000] pt-3"
          label="Easily change the dimensions of your video to fit any platform"
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
            <video controls width="80" className="col-span-1 min-w-[80px]">
              <source src={URL.createObjectURL(file)} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            <div className="pl-8 col-span-10">
              <p className="text-base font-lato font-bold text-[#2c2c2c]">{file.name}</p>
              <div className="flex gap-3">
                {props.map(prop => (
                  <div className="flex items-end gap-1">
                    <p className="text-base font-lato font-bold text-[#a0aec9]">{prop.name}: </p>
                    <p className="text-sm font-lato font-normal text-[#a0aec9]">{prop.value}: </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 place-items-end">
              <Image onClick={() => setUploadFileModal(true)} src={RetryIcon} alt="retry" className="cursor-pointer"/>
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
      <div className="flex justify-between gap-6 pt-8">
        <div className="w-[324px]">
          <Select
            placeholder="Instagram, 9:16, 1080x1920"
            variant="t2"
            label="Preset Properties"
            options={[
              {label: "Instagram, 9:16, 1080x1920", value: "Instagram, 9:16, 1080x1920"},
              {label: "Tiktok, 9:16, 1080x1920", value: "Instagram, 9:16, 1080x1920"},
              {label: "Facebook, 9:16, 1080x1920", value: "Instagram, 9:16, 1080x1920"}
            ]}
            disabled={!file}
          />
        </div>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 rounded bg-gray-400"/>
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
          <Typography label="OR" variant="b4"/>
        </div>
      </div>
      <div className="flex justify-between gap-6 py-4">
        <div className="w-[324px]">
          <Select
            placeholder="16:9"
            variant="t2"
            label="Aspect Ratio"
            options={[
              {label: "16:9 (Widescreen)", value: "16:9"},
              {label: "4:3 (Standard)", value: "4:3"},
              {label: "21:9 (Ultrawide)", value: "21:9"},
              {label: "1:1 (Square)", value: "1:1"},
              {label: "3:2", value: "3:2"},
              {label: "5:4", value: "5:4"},
              {label: "16:10", value: "16:10"},
              {label: "32:9 (Super Ultrawide)", value: "32:9"},
              {label: "9:16 (Portrait)", value: "9:16"},
            ]}
            disabled={!file}
          />
        </div>
      </div>
      <UploadFileModal uploadModal={uploadFileModal} setUploadModal={setUploadFileModal}/>
      <div className="flex justify-between gap-6">
        <div className="w-full">
          <TextField
            disabled={!file}
            placeholder="1920"
            variant="t2"
            label="Width"
          />
        </div>
        <div className="w-full">
          <TextField
            disabled={!file}
            placeholder="1080"
            variant="t2"
            label="Height"
          />
        </div>
      </div>
      <div className="flex justify-between gap-6 py-8">
        <div className="w-full">
        <ColorPicker disabled={!file} />
        </div>
        <div className="w-full">
          <Select
            placeholder="Fit"
            variant="t2"
            label="Stretch Strategy"
            options={[
              {label: "Fit", value: "fit"},
              {label: "Fill", value: "fill"},
              {label: "Original", value: "original"},
              {label: "Stretch", value: "stretch"},
            ]}
            disabled={!file}
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
            options={[
              {label: "Low", value: "low"},
              {label: "Medium", value: "medium"},
              {label: "High", value: "high"}
            ]}
            disabled={!file}
          />
        </div>
        <div className="w-full">
          <Select
            placeholder="Mp4"
            variant="t2"
            label="Video Container"
            options={[
              {label: "Mp4", value: "mp4"},
              {label: "Mov", value: "mov"},
              {label: "AVI", value: "avi"}
            ]}
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
            label="Frame rate"
          />
        </div>
        <div className="w-full">
          <TextField
            disabled={!file}
            placeholder="480000"
            variant="t2"
            label="Audio Sample Rate"
          />
        </div>
      </div>
      <div className="max-w-[171px] mx-auto py-16">
        <Button label="Proceed" variant="contained" filled rightIcon={<FaAngleRight/>}/>
      </div>
      <UploadFileModal uploadModal={uploadFileModal} setUploadModal={setUploadFileModal} file={file} setFile={setFile}/>
    </div>
  )
}
