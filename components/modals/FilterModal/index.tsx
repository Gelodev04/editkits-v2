import React from "react";

import {Modal} from "@/components/Modal";
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
    <Modal isOpen={props.open} onClose={() => props.setOpen(false)} className="max-w-[500px]">
      <h4 className="pt-[40px] pb-[60px] font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90 text-center">
        {props.title}
      </h4>
        <p
          className="font-lato font-bold text-[20px] leading-[30px] text-center text-gray-800 mb-7 text-title-sm dark:text-white/90 text-center">{props.description}</p>

        <div className="flex justify-center gap-[12px] pt-[24px]">
          {filters.map((filter) => (
            <>
              <Button onClick={() => handleFilterSelect(filter.value)} variant={props.selected.includes(filter.value) ? 'primary': 'outline'}>
                {filter.label}
              </Button>
            </>
          ))}
        </div>
        <div className="flex justify-center items-center gap-[6px] pt-[52px] pb-[34px]">
          <Button
            onClick={() => props.setOpen(false)}
            variant="outline"
          >
            Dismiss
          </Button>
          <Button
            onClick={props.onClick}
            variant="primary"
          >Apply</Button>
        </div>
    </Modal>
  )
}