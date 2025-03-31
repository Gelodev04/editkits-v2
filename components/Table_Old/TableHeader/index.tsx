import {SetStateAction} from "react";

import {IoAdd} from "react-icons/io5";



import {useRouter} from "next/router";
import {RxCalendar} from "react-icons/rx";
import {LuSettings2} from "react-icons/lu";
import ButtonOld from "@/components/Button_Old";

type TableHeaderProps = {
  setSearch: any;
  setUploadModal: any;
  active: any;
  setDateFilterModal: (e: SetStateAction<boolean>) => void;
  setFilterModal: (e: SetStateAction<boolean>) => void;
  dateRange?: any;
  selectedFilters: any
}

export default function TableHeader(props: TableHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[17px]">
        <div
          onClick={() => props.setDateFilterModal(true)}
          className={`flex justify-center items-center gap-2 ${(props.dateRange?.startDate || props.dateRange?.endDate) ? "bg-[#148cfc] text-white": "bg-white text-[#4f4f4f]"} border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 cursor-pointer`}>
          <RxCalendar size={18} color={(props.dateRange?.startDate || props.dateRange?.endDate) ? "white": "#4f4f4f"} />

          <p className="font-lato font-bold text-sm leading-[19.6px]">All Time</p>
        </div>

        <div
          onClick={() => props.setFilterModal(true)}
          className={`flex justify-center items-center gap-2 ${props.selectedFilters.length > 0 ? "bg-[#148cfc]": "bg-white text-[#4f4f4f]"} border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 cursor-pointer`}>
          <LuSettings2
            size={18}
            color={props.selectedFilters.length > 0 ? "white": "#4f4f4f"}
          />

          <p className="font-lato font-bold text-sm leading-[19.6px]">Filters</p>
        </div>
      </div>
      <div className="w-[134px]">
        <ButtonOld
          onClick={() => router.push("/tools")}
          label={props.active === "Job status" ? "New Job" : "Upload Files"}
          rightIcon={<IoAdd size={20}/>}
          variant="standard_sm"
          filled
        />
      </div>
    </div>
  )
}