import React from "react";
import Image from "next/image";

import CalendarIcon from "@/assets/icons/calendar_blog.svg";
import Link from "next/link";

export default function BlogCard({img, title, date, slug}) {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).replace(" ", " ");
  };

  return (
    <Link href={`/blog/${slug}`}>
      <div className="w-[433px] border-[1px] border-gray-300 border-opacity-65 pt-[30px] px-[22px] rounded-[4px] max-h-[478px]">
        <div className="w-[390px] h-[312px] flex justify-center items-center">
          <Image
            className="w-full h-full object-cover"
            loading="lazy"
            width={390}
            height={312}
            src={img}
            alt="image"
            unoptimized
          />
        </div>
        <p className="font-montserrat font-bold text-[18.2px] leading-[21.84px] text-[#2c2c2c] pt-[21px]">{title}</p>
        <div className="flex pt-[6.3px] pb-[34.16px] gap-[4px] items-center">
          <Image loading="lazy" src={CalendarIcon} alt="icon" />
          <p className="font-lato font-normal text-base leading-[28px] text-[#A0AEC0]">{formatDate(new Date(date))}</p>
        </div>
      </div>
    </Link>
  )
}