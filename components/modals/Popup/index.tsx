import React from "react";
import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

type PopUpProps = {
  open: boolean;
  setOpen: (e: React.SetStateAction<boolean>) => void;
  title: string;
  description: string
}

export default function PopUp(props: PopUpProps) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/*@ts-ignore*/}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[532px]`}>
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX size={30} color="#000" onClick={() => props.setOpen(false)}/>
              </div>
              <div className="pb-[28px] pt-[32px]">
                <Typography label={props.title} center variant="h4"/>
              </div>
              <div className="w-[432px] mx-auto">
                <Typography label={props.description} center variant="b3"/>
              </div>
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[32px]">
                <Button
                  onClick={() => props.setOpen(false)}
                  label="Dismiss"
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}