import React from 'react';
import Image from 'next/image';

import CalendarIcon from '@/public/icons/calendar_blog.svg';
import Link from 'next/link';

export default function BlogCard({ img, title, date, slug, category }) {
  const formatDate = date => {
    const parsedDate = new Date(date * 1000);

    return parsedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-col h-full w-full max-w-[420px] border border-gray-300 border-opacity-65 pt-6 px-5 rounded-lg relative hover:scale-105 transition-transform duration-500 bg-white">
        <div className="w-full aspect-[4/3] flex justify-center items-center  rounded-md relative">
          <Image
            className="w-full h-full object-cover rounded-md"
            width={390}
            height={312}
            src={img}
            alt="image"
            priority
            quality={75}
          />
          <div className="absolute top-2  -left-3 z-50">
            <BlogTag category={category} />
          </div>
        </div>
        <h3 className="font-montserrat font-bold text-base leading-tight text-[#2c2c2c] py-3 break-words">
          {title}
        </h3>
        <div className="flex pt-2 pb-5 gap-2 items-center flex-wrap">
          <Image loading="lazy" src={CalendarIcon} alt="icon" />
          <p className="font-lato font-normal text-sm leading-6 text-[#a0aec0]">
            {formatDate(date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function BlogTag({ category }) {
  return (
    <p className="font-alexandria  rounded-[2px] pt-[8px] pb-[8px] px-[19px] bg-[#148cfc] text-w text-[#fff]">
      {category}
    </p>
  );
}
