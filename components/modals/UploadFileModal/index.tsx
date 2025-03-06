import React, {useState} from "react";
import {Fade, Modal} from "@mui/material";
import Typography from "@/components/Typography";
import Upload from "@/public/assets/icons/upload.svg"
import Image from "next/image";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import {lato, montserrat, opensans} from "@/lib/fonts";
import toast from "react-hot-toast";
import {fileUploader} from "@/lib/uploadFile";
import {IoIosCloseCircleOutline} from "react-icons/io";

export type UploadModalProps = {
  uploadModal: boolean;
  setUploadModal: (e: React.SetStateAction<boolean>) => void;
  videoRef?: React.Ref<string>;
  file?: any;
  setFile?: (e: React.SetStateAction<any>) => void;
  setFileId?: (e: React.SetStateAction<any>) => void;
  upload?: any;
  isUploading?: boolean;
  setIsUploading?: any
  setProgress?: (e: React.SetStateAction<number>) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UploadFileModal(props: UploadModalProps) {
  const fileInputRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDivClick = () => {
    //@ts-ignore
    fileInputRef.current.click();
  };

  async function handleFileUpload(file) {
    const file_name = file.name.split(".")[0]

    props.setIsUploading(true)
    const response = await props.upload({
      file_name,
      mime_type: file.type,
      ext: file.name.split('.').pop(),
      content_length: file.size
    });

    if (response.error) {
      toast.error(response.error.data.errorMsg);
      return;
    }


    await fileUploader(response.data.presigned_url, file, props.setUploadModal, props.setIsUploading, props.setProgress)
    if (props.setFileId) {
      props.setFileId(response.data.file_id);
    }
    toast.success("File uploaded");
    props.setUploadModal(false);
  }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        // @ts-ignore
        props.setFile(file);
        await handleFileUpload(file)
        // props.setUploadModal(false);
        // @ts-ignore
        if (props.videoRef.current) {
          // @ts-ignore
          props.videoRef.current.load();
        }
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      // @ts-ignore
      props.setFile(file);
      props.setUploadModal(false);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Modal open={props.uploadModal} onClose={() => props.setUploadModal(false)}>
      <Fade in={props.uploadModal}>
        {/*@ts-ignore*/}
        <div className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`} style={style}>
          <input
            type="file"
            style={{display: "none"}}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/"
          />
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="relative transform rounded-[23px] bg-white text-left shadow-xl transition-all w-[540px] h-[583px] ">
                <div className="absolute right-[24.14px] top-[22.22px]">
                  <IoIosCloseCircleOutline size={24} color="#000" onClick={() => props.setUploadModal(false)}/>
                </div>
                <div className="pt-[35px] pb-[6px]">
                  <Typography label="Choose file" center variant="h3"/>
                </div>
                <div className="w-[445px] mx-auto">
                  <div
                    className={`h-[202px] mx-auto border border-dashed border-1 border-[#17abdb] rounded rounded-md ${isDragging ? "bg-blue-100 border-blue-500" : "border-[#17abdb]"}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="flex justify-center pt-[30px] pb-[20.14px]">
                      <Image src={Upload} alt="Upload"/>
                    </div>
                    <div className="flex justify-center gap-2 pb-[5px]">
                      <p className="font-lato font-bold text-base leading-[24px] text-[#333333]">Drag & drop files or</p>
                      <div onClick={handleDivClick} className="cursor-pointer">
                        <p className="font-lato font-bold text-base leading-[24px] text-[#17ABDB] underline">Browse</p>
                      </div>
                    </div>
                    <p className="font-lato font-normal text-xs leading-[18px] text-[#676767] text-center">Supported
                      formats: JPEG, PNG, GIF, MP4, AVI, MOV, MKV, WEBM, FLV</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-full ">
                    <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 rounded bg-[#e7e7e7]"/>
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
                      <p className="font-lato font-normal text-xs leading-[18px] text-center text-[#6d6d6d]">OR</p>
                    </div>
                  </div>
                  <InputField label="File ID" placeholder="Add file ID" height={42} type="text" variant="fileUpload"/>
                  <div className="flex gap-[27px] pt-[76px] pb-[32px]">
                    <Button
                      onClick={() => props.setUploadModal(false)}
                      label="Cancel"
                      variant="secondary"
                      border
                      height={48}
                      width={209}
                    />
                    <Button
                      onClick={() => props.setUploadModal(false)}
                      label="Proceed"
                      variant="contained"
                      filled
                      height={48}
                      width={209}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}