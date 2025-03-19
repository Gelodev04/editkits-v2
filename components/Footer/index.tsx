import Link from "next/link";
import Typography from "@/components/Typography";
import LanguageSelector from "@/components/LanguageSelector";
import React from "react";


export default function Footer() {

  return (
    <div className="pt-10 bg-zinc-50 pb-5 px-8">
      <div className="flex space-x-6 justify-center pb-8 max-w-[1920px] mx-auto">
        <Link href="/home">
          <p className="font-roboto font-normal text-sm text-[#000000]">Home</p>
        </Link>
        <Link href="/tools">
          <p className="font-roboto font-normal text-sm text-[#000000]">Tools</p>
        </Link>
        <Link href="/pricing">
          <p className="font-roboto font-normal text-sm text-[#000000]">Pricing</p>
        </Link>
      </div>
      <div className="2xl:px-[32%] xl:px-[18%] lg:px-[12%]">
        <p className="font-roboto font-normal text-[#2c2c2c] text-sm leading-[24px] text-center">
          Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i
          belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde.
        </p>
        <Typography
          className="font-lato"
          center
        />
      </div>
      <div className="grid grid-cols-3 place-items-center w-full pt-10 max-w-[1920px] mx-auto">
        <p className="font-openSans font-normal text-[13px] text-[#2c2c28] leading-[17px]">© 2025 Edikits. All rights
          reserved</p>
        <div className="flex space-x-6 justify-center">
          <p className="font-openSans font-normal text-[13px] text-[#262628]">Terms of Use</p>
          <p className="font-openSans font-normal text-[13px] text-[#262628]">Privacy Policy</p>
          <p className="font-openSans font-normal text-[13px] text-[#262628]">Help</p>
        </div>
        <LanguageSelector/>
      </div>
    </div>
  )
}