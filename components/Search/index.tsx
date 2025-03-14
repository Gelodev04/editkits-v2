import React from "react";

import {FaSearch} from "react-icons/fa";

export default function Search({ setFilterBy }) {
  return (
    <div className="relative">
      <FaSearch color="#7a7a7a" size={24} className="absolute mt-[12px] ml-[24px]" />
      <input
        type="text"
        placeholder="Quick Search ..."
        className="w-full bg-[#f9fafb] border-[1px] border-[#e1e1e1] font-lato font-normal text-base leading-[24px] text-[#737791] py-[11px] pl-[64px] outline-none rounded-[8px]"
        onChange={(e) => setFilterBy(e.target.value)}
      />
    </div>
  )
}