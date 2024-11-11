"use client"

import React from "react";
import {Fade, Modal} from "@mui/material";
import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import Upload from "@/assets/img/icons/upload.svg"
import Image from "next/image";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

export type UploadModalProps = {
  uploadModal: boolean;
  setUploadModal: (e: React.SetStateAction<boolean>) => void;
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

  return (
    <Modal open={props.uploadModal} onClose={() => props.setUploadModal(false)}>
      <Fade in={props.uploadModal}>
        {/*@ts-ignore*/}
        <div style={style}>
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
                  <div className="border border-dashed border-1 border-[#17abdb] rounded rounded-md p-6 mt-4">
                    <div className="flex justify-center">
                      <Image src={Upload}/>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Typography label="Drag & drop files or" variant="hb4" center/>
                      <Typography label="Supported formats: JPEG, PNG, GIF, MP4,  AVI, MOV, MKV, WEBM, FLV" variant="b4"
                                  center/>
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 rounded bg-gray-400"/>
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                      <Typography label="OR" variant="b4"/>
                    </div>
                  </div>
                  <TextField label="Upload from URL" placeholder="Add file URL"/>
                  <div className="pt-5">
                    <TextField label="File ID" placeholder="Add file ID"/>
                  </div>
                  <div className="flex gap-4 pt-10 pb-2">
                    <Button onClick={() => props.setUploadModal(false)} label="Cancel" variant="contained" border />
                    <Button onClick={() => props.setUploadModal(false)} label="Proceed" variant="secondary" filled  />
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