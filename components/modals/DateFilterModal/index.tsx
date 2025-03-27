import {SetStateAction, useState} from "react";

import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";

import DateRangePicker from "@/components/DateRangePicker";

type DateFilterModalProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  setDateRange: (e: SetStateAction<[{ startDate: string, endDate: string }]>) => void;
}

export default function DateFilterModal(props: DateFilterModalProps) {
  const [range, setRange] = useState()

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed flex inset-0 z-10 w-screen overflow-y-auto flex min-h-full justify-center text-center items-center rounded-[8px]"
          >
            <DateRangePicker
              //@ts-ignore
              wrapperClassName={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden bg-white text-left shadow-xl transition-all`}
              toggle={() => {
                props.setOpen(false)
                //@ts-ignore
                props.setDateRange(range)
              }}
              open={props.open}
              onChange={(range: any) => setRange(range)}
            />
          </div>
        </div>
      </Fade>
    </Modal>
  )
}