import React from "react";
import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import {Plan} from "@/interfaces/Plan";

type PopUpProps = {
  open: boolean;
  setOpen: (e: React.SetStateAction<boolean>) => void;
  title: string;
  plan: Plan;
}

export default function WhatCanYouDoPopup(props: PopUpProps) {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/*@ts-ignore*/}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[540px]`}>
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX size={30} color="#000" onClick={() => props.setOpen(false)}/>
              </div>
              <div className="pb-[28px] pt-[32px]">
                <Typography label={props.title} center variant="h4"/>
              </div>
              <div className="w-[358px] mx-auto">
                <p className="font-lato text-base font-medium leading-[24px] text-[#2c2c2c]">For {props.plan.credits} credits, you can do the following :</p>
              </div>
              {props.plan.credit_actions && (
                <ul className="max-w-[400px] mx-auto pt-[17px] pl-[46px] list-disc">
                  {props.plan.credit_actions?.map((detail) => (
                    <li className="font-lato text-sm text-[#4f4f4f] leading-[30.24px]">{detail}</li>
                  ))}
                </ul>
              )}
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[32px]">
                <Button
                  onClick={() => props.setOpen(false)}
                  children={<>Dismiss</>}
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