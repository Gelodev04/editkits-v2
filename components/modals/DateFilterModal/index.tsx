import {SetStateAction} from "react";

import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import { DateRangePicker } from "mui-daterange-picker";

type DateFilterModalProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  setDateRange: (e: SetStateAction<[{startDate: string, endDate: string}]>) => void;
}

export default function DateFilterModal(props: DateFilterModalProps) {

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
                  onChange={(range: any) => props.setDateRange(range)}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}