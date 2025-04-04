import React from "react";
import Link from "next/link";

import Typography from "@/components/Typography";
import {useSidebar} from "@/context/SidebarContext";

export default function Footer() {
  const { isMobileOpen, isExpanded, isHovered } = useSidebar();
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[314px]"
      : "lg:ml-[90px]";


  return (
    <div className={`${mainContentMargin} bg-white dark:bg-gray-900 dark:border-gray-800 pt-10 bg-zinc-50 pb-5 px-8 z-[50]`}>
      <div className="flex space-x-6 justify-center pb-8 max-w-[1920px] mx-auto">
        <Link href="/home">
          <p className="font-roboto font-normal text-sm text-[#000000] dark:text-white/90">Home</p>
        </Link>
        <Link href="/tools">
          <p className="font-roboto font-normal text-sm text-[#000000] dark:text-white/90">Tools</p>
        </Link>
        <Link href="/pricing">
          <p className="font-roboto font-normal text-sm text-[#000000] dark:text-white/90">Pricing</p>
        </Link>
      </div>
      <div className="2xl:px-[32%] xl:px-[18%] lg:px-[12%]">
        <Typography
          className="font-lato"
          center
        />
      </div>
      <div className="grid grid-cols-3 place-items-center w-full pt-10 max-w-[1920px] mx-auto">
        <p className="font-openSans font-normal text-[13px] text-[#2c2c28] leading-[17px] dark:text-white/90">© 2025 Edikits. All rights
          reserved</p>
        <div className="flex space-x-6 justify-center">
          <p className="font-openSans font-normal text-[13px] text-[#262628] dark:text-white/90">Terms of Use</p>
          <p className="font-openSans font-normal text-[13px] text-[#262628] dark:text-white/90">Privacy Policy</p>
          <p className="font-openSans font-normal text-[13px] text-[#262628] dark:text-white/90">Help</p>
        </div>
      </div>
    </div>
  )
}