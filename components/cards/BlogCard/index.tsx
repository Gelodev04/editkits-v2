import React from "react";
import Image from "next/image";

import CalendarIcon from "@/assets/icons/calendar_blog.svg";

export default function BlogCard({img, title, date}) {
  return (
    <div className="w-[433px] border-[1px] border-[bebebe] pt-[30px] px-[22px]">
      <Image src={img} alt="image"/>
      <p className="font-montserrat font-bold text-[18.2px] leading-[21.84px] text-[#2c2c2c] pt-[21px]">{title}</p>
      <div className="flex pt-[6.3px] pb-[34.16px] gap-[4px] items-center">
        <Image src={CalendarIcon} alt="icon" />
        <p className="font-lato font-normal text-base leading-[28px] text-[#A0AEC0]">{date}</p>
      </div>
    </div>
  )
}