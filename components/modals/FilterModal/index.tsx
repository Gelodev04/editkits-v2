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
  description: string;
  selected: any;
  setSelected: (e: React.SetStateAction<string[]>) => void;
  onClick: any
}

const filters = [
  {label: "Success", value: "COMPLETED"},
  {label: "In progress", value: "IN_PROGRESS"},
  {label: "Failed", value: "FAILED"},
]

export default function FilterModal(props: PopUpProps) {

  function handleFilterSelect(status) {
    return props.setSelected(prev =>
      prev.includes(status) ? prev.filter(item => item !== status) : [...prev, status]
    )
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/*@ts-ignore*/}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full justify-center text-center items-center sm:p-0">
            <div
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[532px]`}>
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX size={30} color="#000" onClick={() => props.setOpen(false)}/>
              </div>
              <div className="pb-[60px] pt-[32px]">
                <Typography label={props.title} center variant="h4"/>
              </div>
              <p
                className="font-lato font-bold text-[20px] leading-[30px] text-center text-[#2c2c2c]">{props.description}</p>

              <div className="flex justify-center gap-[12px] pt-[24px]">
                {filters.map((filter) => (
                  <button
                    onClick={() => handleFilterSelect(filter.value)}
                    className={`px-[24px] py-[15px] rounded-[100px] border-[1px] border-[#d2d3d3] ${props.selected.includes(filter.value) ? "bg-[#4f4f4f] text-white" : "bg-white text-[#363939]"} font-lato font-medium text-sm leading-[17.5px]`}>
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[34px]">
                <Button
                  onClick={() => props.setOpen(false)}
                  children={<>Dismiss</>}
                  variant="primary"
                />
                <Button
                  onClick={props.onClick}
                  children={<>Apply</>}
                  variant="primary"
                  filled
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}