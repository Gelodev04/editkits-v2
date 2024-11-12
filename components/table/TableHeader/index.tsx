import {MdOutlineCalendarMonth} from "react-icons/md";
import Typography from "@/components/Typography";
import Image from "next/image";
import Filter from "@/assets/img/table/filter.svg";
import Button from "@/components/Button";
import {IoAdd} from "react-icons/io5";
import * as React from "react";

export default function TableHeader({setSearch, setUploadModal}) {
  return (
    <div className="grid grid-cols-12 items-center gap-3 py-4">
      <div
        className="col-span-4 flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full border-solid border-2 border-[#e1e1e1]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.35 12.15z"/>
        </svg>
        <input
          type="text"
          placeholder="Search here..."
          className="bg-gray-100 outline-none ml-2 text-sm text-[#737791] w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-8 col-span-4">
        <button className="flex items-center bg-gray-100 rounded-lg px-4 py-2 col-span-3 w-32 gap-2">
          <MdOutlineCalendarMonth color="#4f4f4f" size={20}/>
          <Typography label="All Time" variant="bb3"/>
        </button>

        <button className="flex items-center bg-gray-100 rounded-lg px-4 py-2 col-span-3 w-32 gap-2">
          <Image src={Filter} alt="filter icon"/>
          <Typography label="Filter" variant="bb3"/>
        </button>
      </div>

      <div className="col-span-4 place-items-end w-full">
        <div className="w-[114px]">
          <Button onClick={() => setUploadModal(true)} width={10} label="New Job" rightIcon={<IoAdd size={20}/>}
                  variant="secondary" filled/>
        </div>
      </div>
    </div>
  )
}