'use client'

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import {FaChevronUp} from "react-icons/fa";
import {MdLanguage} from "react-icons/md";
import Link from "next/link";

export default function Footer() {

  return (
    <div className="pt-10 bg-neutral-50 pb-5">
      <div className="flex space-x-6 justify-center pb-8">
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
          label="Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde. "
          center
        />
      </div>
      <div className="grid grid-cols-3 sm:px-10 2xl:px-96 xl:[96%] pt-20">
        <Typography label="© 2024 Edikits. All rights reserved"/>
        <div className="flex space-x-6 justify-center">
          <Button label="Terms of Use" variant="primary"/>
          <Button label="Privacy Policy" variant="primary"/>
          <Button label="Help" variant="primary"/>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <MdLanguage color="#262628"/>
          <Typography label="English" variant="secondary"/>
          <FaChevronUp color="#262628"/>
        </div>
      </div>
    </div>
  )
}