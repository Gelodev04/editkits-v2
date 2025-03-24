import React from "react";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {TbXboxX} from "react-icons/tb";
import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import { DateRangePicker } from "mui-daterange-picker";


import Button from "@/components/Button";

export default function DateFilterModal(props) {
  function handleFilter() {
    props.setOpen(false)
  }

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/*@ts-ignore*/}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div
              >
              <div className="flex justify-center pt-12">
                <DateRangePicker
                  wrapperClassName={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all`}
                  toggle={() => props.setOpen(false)}
                  open={true}
                  onChange={(range) => props.setDateRange(range)}
                />
              </div>
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[32px]">
                <Button
                  onClick={handleFilter}
                  label="Filter"
                  filled
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}