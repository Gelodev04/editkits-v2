import React from "react";
import Image from "next/image";

import CalendarIcon from "@/public/icons/calendar_blog.svg";
import Link from "next/link";

export default function BlogCard({img, title, date, slug, category}) {
  const formatDate = (date) => {
    const parsedDate = new Date(date * 1000);

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <Link href={`/blog/${slug}`}>
      <div
        className="cursor-auto w-[433px] border-[1px] border-gray-300 border-opacity-65 pt-[22px] px-[22px] rounded-[4px] max-h-[478px] relative hover:scale-105 transition-transform duration-500">
        <div className="w-[390px] h-[290px] flex justify-center items-center">
          <Image
            className="w-full h-full object-cover rounded-[4px]"
            width={390}
            height={312}
            src={img}
            alt="image"
            priority
            quality={75}
          />
        </div>
        <h3 className="font-montserrat font-bold text-base leading-[21.84px] text-[#2c2c2c] py-[12px]">{title}</h3>
        <div className="flex pt-[6.3px] pb-[20px] gap-[4px] items-center">
          <Image loading="lazy" src={CalendarIcon} alt="icon"/>
          <p className="font-lato font-normal text-sm leading-[28px] text-[#a0aec0]">{formatDate(date)}</p>
          <BlogTag category={category}/>
        </div>
      </div>
    </Link>
  )
}

function BlogTag({category}) {
  return <p className="font-alexandria absolute top-[36px] left-[10px] rounded-[2px] pt-[8px] pb-[8px] px-[19px] bg-[#148cfc] text-w text-[#fff]">{category}</p>
}