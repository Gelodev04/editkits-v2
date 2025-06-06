import { Fade, Modal } from "@mui/material";
import React from "react";

import { lato, montserrat, opensans } from "@/lib/fonts";

import Typography from "@/components/Typography";
import { TbXboxX } from "react-icons/tb";

import ButtonOld from "@/components/Button_Old";

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
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[532px] dark:bg-[#2c2c2c]`}>
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX 
                  size={30} 
                  className="text-black dark:text-white transition-colors duration-200"
                  onClick={() => props.setOpen(false)}
                />
              </div>
              <div className="pb-[28px] pt-[32px]">
                <Typography label={props.title} center variant="h4"/>
              </div>
              <div className="w-[432px] mx-auto">
                <Typography label={props.description} center variant="b3"/>
              </div>
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[32px]">
                <ButtonOld
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