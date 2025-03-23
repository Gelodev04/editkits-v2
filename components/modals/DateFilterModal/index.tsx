import { useState } from 'react';
import {DateRange} from 'react-date-range'
import {lato, montserrat, opensans} from "@/lib/fonts";
import {TbXboxX} from "react-icons/tb";
import React from "react";
import Button from "@/components/Button";
import {Fade, Modal} from "@mui/material";

export default function DateFilterModal(props) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  function handleFilter() {

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
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[400px]`}>
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX size={30} color="#000" onClick={() => props.setOpen(false)}/>
              </div>
              <div className="flex justify-center pt-12">
                <DateRange
                  showDateDisplay={false}
                  editableDateInputs={true}
                  onChange={item => {
                    setDateRange([item.selection]);
                    console.log("===", dateRange)
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
              <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[32px]">
                <Button
                  onClick={() => props.setOpen(false)}
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