import * as React from "react";

import {FaAngleRight} from "react-icons/fa6";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TextField from "@/components/TextField";
import Select from "@/components/Select";

import ColorPicker from "@/components/ColorPicker";
import {useEffect} from "react";
import {aspectRatio, outputQuality, presets, videoType} from "@/lib/constants";
import {VideoUpload} from "@/components/VideoUpload";

export default function ResizeVideo() {
  const [presetWidth, setPresetWidth] = React.useState<any>(undefined);
  const [presetHeight, setPresetHeight] = React.useState<any>(undefined)
  const [uploadFileModal, setUploadFileModal] = React.useState<any>(false);
  const [file, setFile] = React.useState<any>(null);
  const [color, setColor] = React.useState<any>("#000000");
  const [isColorValid, setIsColorValid] = React.useState<any>(true);
  const [width, setWidth] = React.useState<any>(undefined);
  const [height, setHeight] = React.useState<any>(undefined);
  const [aspectX, setAspectX] = React.useState<any>(1);
  const [aspectY, setAspectY] = React.useState<any>(1);
  const [activeInput, setActiveInput] = React.useState<any>("");
  const [isCustom, setIsCustom] = React.useState<any>(true);
  const [audioSampleRate, setAudioSampleRate] = React.useState<any>(undefined);
  const [framerate, setFramerate] = React.useState<any>(undefined);
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

  useEffect(() => {
    setHeight(presetHeight * aspectY);
  }, [aspectY])

  useEffect(() => {
    setWidth(presetWidth * aspectX);
  }, [(presetWidth && aspectX)])

  const handleColorChange = (e: any) => {
    const newColor = e.target.value;
    setColor(newColor);
    setIsColorValid(/^#[0-9A-Fa-f]{6}$/.test(newColor));
  };

  return (
    <div className="max-w-[768px] px-12 lg:px-0 mx-auto">
      <div className="pt-16 flex flex-col gap-4">
        <Typography
          label="Resize Video"
          variant="h2"
          center
        />
        <Typography
          variant="b3"
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
      <VideoUpload videoRef={videoRef} setUploadFileModal={setUploadFileModal} file={file} />
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
              setIsCustom(false);
              if (e.target.value === "None") {
                return;
              }
              const [, , resolution] = e.target.value?.split(",") || [];
              const [presetWidth, presetHeight] = resolution.split("x").map(Number);

              setWidth(presetWidth);
              setPresetWidth(presetWidth)
              setHeight(presetHeight);
              setPresetHeight(presetHeight)
              setActiveInput("preset");
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
            value={width}
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
            value={height}
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
            value={framerate}
            onChange={e => setFramerate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <TextField
            type="number"
            disabled={!file}
            placeholder="480000"
            variant="t2"
            label="Audio Sample Rate"
            value={audioSampleRate}
            onChange={(e) => setAudioSampleRate(e.target.value)}
          />
        </div>
      </div>
      <div className="max-w-[171px] mx-auto py-16">
        <Button
          disabled={!isColorValid || !file}
          label="Proceed" variant="contained" filled
          rightIcon={<FaAngleRight/>}/>
      </div>
      <UploadFileModal videoRef={videoRef} uploadModal={uploadFileModal} setUploadModal={setUploadFileModal} file={file}
                       setFile={setFile}/>
    </div>
  )
}
