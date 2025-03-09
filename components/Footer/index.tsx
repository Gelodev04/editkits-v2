import Link from "next/link";
import Button from "@/components/Button";
import Typography from "@/components/Typography";


export default function Footer() {

  return (
    <div className="pt-10 bg-zinc-50 pb-5 px-8">
      <div className="flex space-x-6 justify-center pb-8 max-w-[1920px] mx-auto">
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
        <Typography
          className="font-lato"
          center
        />
      </div>
      <div className="grid grid-cols-3 place-items-center w-full pt-10 max-w-[1920px] mx-auto">
        <p className="font-openSans font-normal text-[13px] text-[#2c2c28] leading-[17px]">© 2025 Edikits. All rights reserved</p>
        <div className="flex space-x-6 justify-center">
          <Button label="Terms of Use" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
          <Button label="Privacy Policy" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
          <Button label="Help" variant="primary" className="font-openSans text-[#262628] text-[13px]"/>
        </div>
      </div>
    </div>
  )
}