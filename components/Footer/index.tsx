'use client'

import Link from "next/link";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

import LanguageSelector from "@/components/LanguageSelector";

export default function Footer() {

  return (
    <div className="pt-10 bg-zinc-50 pb-5 px-8">
      <div className="flex space-x-6 justify-center pb-8 max-w-[1280px] mx-auto">
        <Link href="/">
          <Button label="Home" variant="primary"/>
        </Link>
        <Link href="/tools">
          <Button label="Tools" variant="primary"/>
        </Link>
        <Link href="/pricing">
          <Button label="Pricing" variant="primary"/>
        </Link>
      </div>
      <div className="2xl:px-[32%] xl:px-[18%] lg:px-[12%]">
        <Typography
          className="font-lato"
          label="Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde. "
          center
        />
      </div>
      <div className="grid grid-cols-3 place-items-center w-full pt-20 max-w-[1280px] mx-auto">
        <Typography label="© 2024 Edikits. All rights reserved" className="font-openSans text-[13px]"/>
        <div className="flex space-x-6 justify-center">
          <Button label="Terms of Use" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
          <Button label="Privacy Policy" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
          <Button label="Help" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
        </div>
        <LanguageSelector />
      </div>
    </div>
  )
}