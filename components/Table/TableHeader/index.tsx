import {SetStateAction} from "react";
import Image from "next/image";

import {IoAdd} from "react-icons/io5";

import Button from "@/components/Button";

import Filter from "@/public/assets/img/table/filter.svg";
import CalendarIcon from "@/public/assets/icons/calendar.svg"
import {useRouter} from "next/router";

type TableHeaderProps = {
  setSearch: any;
  setUploadModal: any;
  active: any;
  setDateFilterModal: (e: SetStateAction<boolean>) => void;
}

export default function TableHeader(props: TableHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[17px]">
        <div
          onClick={() => props.setDateFilterModal(true)}
          className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 w-30 cursor-pointer">
          <Image
            src={CalendarIcon}
            alt="Calendar"
            priority
          />
          <p className="font-lato font-bold text-sm leading-[19.6px] text-[#4f4f4f]">All Time</p>
        </div>

        <div
          className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 ">
          <Image
            src={Filter}
            alt="filter icon"
            priority
          />
          <p className="font-lato font-bold text-sm leading-[19.6px] text-[#4f4f4f]">Filters</p>
        </div>
      </div>
      <div className="w-[134px]">
        <Button
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