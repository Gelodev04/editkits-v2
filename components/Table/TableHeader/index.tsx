import * as React from "react";
import Image from "next/image";

import {IoAdd} from "react-icons/io5";
import {FaSearch} from "react-icons/fa";

import Typography from "@/components/Typography";
import Button from "@/components/Button";

import Filter from "@/assets/img/table/filter.svg";
import Calendar from "@/assets/img/icons/calendar.svg"

export default function TableHeader({setSearch, setUploadModal}) {
  return (
    <div className="grid grid-cols-12 items-center gap-3 py-4">
      <div
        className="col-span-4 flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full border-solid border-2 border-[#e1e1e1]">
        <FaSearch color="#17abdb" size={20} />

        <input
          type="text"
          placeholder="Search here..."
          className="bg-gray-100 outline-none ml-2 text-sm text-[#737791] w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-3 col-span-4">
        <div className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 w-30">
          <Image src={Calendar} alt="Calendar"/>
          <Typography label="All Time" variant="bb3"/>
        </div>

        <div className="flex justify-center items-center gap-2 bg-white border border-1 border-[#e1e1e1] shadow-sm rounded-lg px-4 py-2 col-span-3 ">
          <Image src={Filter} alt="filter icon"/>
          <Typography label="Filters" variant="bb3"/>
        </div>
      </div>

      <div className="col-span-4 place-items-end w-full">
        <div className="w-[134px]">
          <Button
            onClick={() => setUploadModal(true)}
            label="New Job"
            rightIcon={<IoAdd size={20}/>}
            variant="secondary"
            filled
            className="py-3"
          />
        </div>
      </div>
    </div>
  )
}