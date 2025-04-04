import {SetStateAction, useState} from "react";
import DateRangePicker from "@/components/DateRangePicker";
import {Modal} from "@/components/Modal";

type DateFilterModalProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  setDateRange: (e: SetStateAction<[{ startDate: string, endDate: string }]>) => void;
}

export default function DateFilterModal(props: DateFilterModalProps) {
  const [range, setRange] = useState();

  return (
    <Modal isOpen={props.open} onClose={() => props.setOpen(false)} className="max-w-[756px]">
      <div
        className="relative flex inset-0 z-10 overflow-y-auto flex min-h-full justify-center text-center items-center rounded-[8px]"
      >
        <DateRangePicker
          //@ts-ignore
          toggle={() => {
            props.setOpen(false);
            //@ts-ignore
            props.setDateRange(range);
          }}
          open={props.open}
          onChange={(range: any) => setRange(range)}
        />
      </div>
    </Modal>
  );
}
