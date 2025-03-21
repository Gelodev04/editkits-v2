import Image from "next/image";

import Button from "@/components/Button";
import Typography from "@/components/Typography";

import {IoAdd} from "react-icons/io5";

import Filter from "@/public/assets/img/table/filter.svg";
import Calendar from "@/public/assets/icons/calendar.svg"

type TableHeaderProps = {
  setSearch: any;
  setUploadModal: any;
  active: any
}

export default function TableHeader(props: TableHeaderProps) {
  return (
    <div className="flex justify-between py-4">
      <div className="flex">
        <div
          className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 w-30">
          <Image
            src={Calendar}
            alt="Calendar"
            priority
          />
          <Typography label="All Time" variant="bb3"/>
        </div>

        <div
          className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 ">
          <Image
            src={Filter}
            alt="filter icon"
            priority
          />
          <Typography label="Filters" variant="bb3"/>
        </div>
      </div>
      <div className="w-[134px]">
        <Button
          onClick={() => props.setUploadModal(true)}
          label={props.active === "Job status" ? "New Job" : "Upload Files"}
          rightIcon={<IoAdd size={20}/>}
          variant="standard_sm"
          filled
        />
      </div>
    </div>
  )
}