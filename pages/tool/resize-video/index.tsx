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
import {useEffect} from "react";
import {aspectRatio, outputQuality, presets, videoType} from "@/lib/constants";

export default function ResizeVideo() {
  const [uploadFileModal, setUploadFileModal] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [color, setColor] = React.useState("#000000");
  const [isColorValid, setIsColorValid] = React.useState(true);
  const [width, setWidth] = React.useState(undefined);
  const [height, setHeight] = React.useState(undefined);
  const [aspectX, setAspectX] = React.useState(1);
  const [aspectY, setAspectY] = React.useState(1);
  const [activeInput, setActiveInput] = React.useState("");
  const [isCustom, setIsCustom] = React.useState(true);
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (!isCustom) {
      if (activeInput === "width" && width > 0) {
        setHeight(Math.floor(width * (aspectY / aspectX)));
      } else if (activeInput === "height" && height > 0) {
        setWidth(Math.floor(height * (aspectX / aspectY)));
      }
    }
  }, [width, height, aspectX, aspectY, activeInput, isCustom]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    setIsColorValid(/^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

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
            <video ref={videoRef} className="col-span-1 min-w-[80px] min-h-[45px] max-w-[80px] max-h-[45px]">
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
        <div className="w-[360px]">
          <Select
            onChange={(e) => {
              const [presetName, , resolution] = e.target.value?.split(",") || [];
              const [presetWidth, presetHeight] = resolution.split("x").map(Number);

              setWidth(presetWidth);
              setHeight(presetHeight);
              setIsCustom(false);
              setActiveInput("");
            }}
            variant="t2"
            label="Preset Options"
            options={presets}
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
        <div className="w-[360px]">
          <Select
            variant="t2"
            label="Aspect Ratio"
            onChange={(e) => {
              const field = e.target.value;
              if (field !== "Custom") {
                setIsCustom(false)
                const aspect = field.split(":")
                const x = aspect[0];
                const y = aspect[1];
                setAspectX(Number(x))
                setAspectY(Number(y));
              } else {
                setIsCustom(true)
              }
            }}
            options={aspectRatio}
            disabled={!file}
          />
        </div>
      </div>
      <UploadFileModal uploadModal={uploadFileModal} setUploadModal={setUploadFileModal}/>
      <div className="flex justify-between gap-6">
        <div className="w-full">
          <TextField
            type="number"
            disabled={!file}
            placeholder="1920"
            variant="t2"
            label="Width"
            value={isCustom ? width : width * aspectX}
            onChange={(e) => {
              setActiveInput("width")
              setWidth(e.target.value)
            }}
          />
        </div>
        <div className="w-full">
          <TextField
            type="number"
            disabled={!file}
            placeholder="1080"
            variant="t2"
            label="Height"
            value={isCustom ? height : height * aspectY}
            onChange={(e) => {
              setActiveInput("height")
              setHeight(e.target.value)
            }}/>
        </div>
      </div>
      <div className="flex justify-between gap-6 py-8">
        <div className="w-full">
          <ColorPicker
            disabled={!file}
            isColorValid={isColorValid}
            setIsColorValid={setIsColorValid}
            color={color}
            handleColorChange={handleColorChange}
            placeholder="#000000"
          />
        </div>
        <div className="w-full">
          <Select
            variant="t2"
            label="Stretch Strategy"
            options={[
              {label: "Fit", value: "Fit"},
              {label: "Fill", value: "Fill"}
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
            variant="t2"
            label="Output Quality"
            options={outputQuality}
            disabled={!file}
          />
        </div>
        <div className="w-full">
          <Select
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
            type="number"
            disabled={!file}
            placeholder="30"
            variant="t2"
            label="Framerate"
          />
        </div>
        <div className="w-full">
          <TextField
            type="number"
            disabled={!file}
            placeholder="480000"
            variant="t2"
            label="Audio Sample Rate"
          />
        </div>
      </div>
      <div className="max-w-[171px] mx-auto py-16">
        <Button disabled={!isColorValid || !file} label="Proceed" variant="contained" filled rightIcon={<FaAngleRight/>}/>
      </div>
      <UploadFileModal videoRef={videoRef} uploadModal={uploadFileModal} setUploadModal={setUploadFileModal} file={file} setFile={setFile}/>
    </div>
  )
}
