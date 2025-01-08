import Link from "next/link";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

import LanguageSelector from "@/components/LanguageSelector";

export default function Footer() {

  return (
    <div className="pt-10 bg-zinc-50 pb-5 px-8">
      <div className="flex space-x-6 justify-center pb-8 max-w-[1280px] mx-auto">
        <Link href="/" className="font-roboto">
          <Button label="Home" variant="primary"/>
        </Link>
        <Link href="/tools" className="font-roboto">
          <Button label="Tools" variant="primary"/>
        </Link>
        <Link href="/pricing" className="font-roboto">
          <Button label="Pricing" variant="primary"/>
        </Link>
      </div>
      <div className="2xl:px-[32%] xl:px-[18%] lg:px-[12%]">
        <p className="font-roboto font-normal text-[#2c2c2c] text-sm leading-[24px] text-center">
          Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi. FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde.
        </p>
        <Typography
          className="font-lato"
          center
        />
      </div>
      <div className="grid grid-cols-3 place-items-center w-full pt-20 max-w-[1280px] mx-auto">
        <p className="font-openSans font-normal text-[13px] text-[#2c2c28] leading-[17px]">© 2024 Edikits. All rights reserved</p>
        {/*<Typography label="" className="font-openSans text-[13px]"/>*/}
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