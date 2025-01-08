import * as React from "react";
import Image from "next/image";
import PlayIcon from "@/assets/img/icons/play.png";
import RetryIcon from "@/assets/img/icons/retry.svg";
import Button from "@/components/Button";

type VideoUploadProps = {
  file: any;
  videoRef: React.Ref<any>;
  setUploadFileModal: any;

}

const videoProps = [
  {name: "Duration", value: "122 Seconds"},
  {name: "Resolution", value: "1020x1080"},
  {name: "Size", value: "10 MB"},
]

export function VideoUpload(props: VideoUploadProps) {
  return (
    <div className="pt-4">
      {props.file && (
        <div className="mt-4 grid grid-cols-12">
          <div className="relative bg-[#000000] w-[138%] rounded-md p-1">
            <video ref={props.videoRef} className="col-span-1 min-w-[80px] min-h-[45px] max-w-[80px] max-h-[45px]">
              <source src={URL.createObjectURL(props.file)} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            <Image className="absolute inset-0 bottom-1 m-auto object-contain" src={PlayIcon} alt="Play Icon"/>
          </div>
          <div className="pl-8 col-span-10">
            <p className="text-base font-lato font-bold text-[#2c2c2c] leading-[24px]">{props.file.name}</p>
            <div className="flex gap-3">
              {videoProps.map(prop => (
                <div className="flex items-end gap-1">
                  <p className="text-sm font-lato font-bold text-[#A0AEC0] leading-[21px]">{prop.name}: </p>
                  <p className="text-sm font-lato font-normal text-[#A0AEC0] leading-[21px]">{prop.value}, </p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 place-items-end">
            <Image onClick={() => props.setUploadFileModal(true)} src={RetryIcon} alt="retry"
                   className="cursor-pointer"/>
          </div>
        </div>
      )}
      {!props.file && (
        <Button
          onClick={() => props.setUploadFileModal(true)}
          className="max-w-[113px] py-[6.5px] font-bold border border-2 border-neutral-300 text-[#4f4f4f]"
          label="Add File"
          variant="contained"
          border
        />
      )}
    </div>
  )
}