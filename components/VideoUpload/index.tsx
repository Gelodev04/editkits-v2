import * as React from "react";
import Image from "next/image";
import PlayIcon from "@/public/assets/icons/play.png";
import RetryIcon from "@/public/assets/icons/retry.svg";
import UploadingIcon from "@/public/assets/icons/cloud.svg"

import Button from "@/components/Button";

type VideoUploadProps = {
  file: any;
  videoRef: React.Ref<any>;
  setUploadFileModal: any;
  progress: number;
  uploadedData: any;
  fetchedData: any;
  isUploading?: boolean
}

export function VideoUpload(props: VideoUploadProps) {
  return (
    <div className="pt-4">
      {props.file && (
        <div className="mt-4 grid grid-cols-12">
          {props.uploadedData?.status === "COMMITTED" && !props.isUploading && (
            <div className="relative bg-[#000000] w-[138%] rounded-md p-1">
              <div className="col-span-1 min-w-[80px] min-h-[45px] max-w-[80px] max-h-[45px]">
                {props.fetchedData?.metadata?.thumbnail_url && (
                  <Image
                    src={props.fetchedData?.metadata?.thumbnail_url}
                    className="object-contain h-[45px] w-[80px]"
                    width={80}
                    height={45}
                    alt="uploaded_file"
                    priority
                    quality={75}
                  />
                )}
              </div>
              <Image priority className="absolute inset-0 bottom-1 m-auto object-contain" src={PlayIcon} alt="Play icon"/>
            </div>
          )}
          {props.isUploading && (
            <div className="relative w-[138%] rounded-md p-1">
              <Image priority className=" inset-0 bottom-1 m-auto object-contain" src={UploadingIcon} alt="Play icon"/>
              <p
                className="font-lato font-bold text-[10px] leading-[15px] text-[#7D3CDE]">Uploading... {props.progress}%</p>
            </div>)}
          <div className="pl-8 col-span-10">
            <p className="text-base font-lato font-bold text-[#2c2c2c] leading-[24px]">
              {(() => {
                const fileName = props.file.name;
                const extIndex = fileName.lastIndexOf(".");

                if (extIndex !== -1) {
                  const namePart = fileName.slice(0, 20);
                  const extPart = fileName.slice(extIndex);
                  return `${namePart}...${extPart}`;
                }

                return fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName;
              })()}
            </p>
            <div className="flex gap-3">
              <div className="flex items-end gap-1">
                <p className="text-sm font-lato font-bold text-[#A0AEC0] leading-[21px]">Duration: </p>
                <p
                  className="text-sm font-lato font-normal text-[#A0AEC0] leading-[21px]">{Math.floor(props.fetchedData?.metadata?.duration ?? 0)} seconds, </p>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-sm font-lato font-bold text-[#A0AEC0] leading-[21px]">Resolution: </p>
                <p
                  className="text-sm font-lato font-normal text-[#A0AEC0] leading-[21px]">{props.fetchedData?.metadata?.width ?? 0} x {props.fetchedData?.metadata?.height ?? 0} </p>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-sm font-lato font-bold text-[#A0AEC0] leading-[21px]">Size: </p>
                <p
                  className="text-sm font-lato font-normal text-[#A0AEC0] leading-[21px]">{Math.floor((props.fetchedData?.metadata?.size ?? 0) / (1024 * 1024)).toFixed(1)} MB </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 place-items-end">
            <Image
              onClick={() => {
                props.setUploadFileModal(true)
              }}
              src={RetryIcon}
              alt="Retry icon"
              className="cursor-pointer"
              priority
            />
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