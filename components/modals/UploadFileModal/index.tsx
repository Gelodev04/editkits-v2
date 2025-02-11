import React, {useState} from "react";
import {Fade, Modal} from "@mui/material";
import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import Upload from "@/assets/icons/upload.svg"
import Image from "next/image";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import {lato, montserrat, opensans} from "@/lib/fonts";
import toast from "react-hot-toast";
import {fileUploader} from "@/lib/uploadFile";

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

    props.setIsUploading(true)
    const response = await props.upload({file_name: file.name, mime_type: file.type, ext: file.name.split('.').pop(), content_length: file.size});

    if(response.error) {
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
                className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                <div className="absolute right-2 top-2 cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setUploadModal(false)}/>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Typography label="Choose file" center variant="h3"/>
                  <div
                    className={`h-[202px] border border-dashed border-1 border-[#17abdb] rounded rounded-md p-6 mt-4 ${isDragging ? "bg-blue-100 border-blue-500" : "border-[#17abdb]"}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="flex justify-center">
                      <Image src={Upload} alt="Upload"/>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-center gap-2">
                        <Typography label="Drag & drop files or" variant="hb4" center/>
                        <div className="cursor-pointer">
                          <Typography
                            label="Browse"
                            variant="hb4"
                            center
                            underline
                            color="#17ABDB"
                            onClick={handleDivClick}
                          />
                        </div>
                      </div>
                      <Typography
                        label="Supported formats: JPEG, PNG, GIF, MP4,  AVI, MOV, MKV, WEBM, FLV"
                        variant="b4"
                        center color="#676767"
                      />
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 rounded bg-[#e7e7e7]"/>
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                      <Typography label="OR" variant="b4" color="#6D6D6D"/>
                    </div>
                  </div>
                  <TextField label="Upload from URL" placeholder="Add file URL" height={42} borderRadius={8}/>
                  <div className="inline-flex items-center justify-center w-full pt-1">
                    <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 rounded bg-[#e7e7e7]"/>
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                      <Typography label="OR" variant="b4" color="#6D6D6D"/>
                    </div>
                  </div>
                  <TextField label="File ID" placeholder="Add file ID" height={42} borderRadius={8}/>
                  <div className="flex gap-4 pt-10 pb-2">
                    <Button onClick={() => props.setUploadModal(false)} label="Cancel" variant="contained" border className="h-[48px]"/>
                    <Button onClick={() => props.setUploadModal(false)} label="Proceed" variant="secondary" filled className="h-[48px]"/>
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