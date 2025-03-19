import Image from "next/image";

import Button from "@/components/Button";
import Typography from "@/components/Typography";

import HeroImg from "@/public/assets/img/home_hero.png";

export default function Hero({setWaitlistModal}) {
  return (
    <div className="bg-[url(../public/assets/img/hero_bg.png)] max-w-[1400px] mx-auto bg-center bg-cover">
      <div
        className="pb-[159.5px] max-w-[1187px] sm:px-5 xl:px-0 grid grid-cols-12 mx-auto sm:items-center xl:items-end">
        <div className="sm:col-span-4 lg:col-span-6 pt-[134.5px]">
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">The
            Ultimate</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">Online
            Media Platform to</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-transparent bg-clip-text bg-gradient-to-r from-[#637EFF] to-[#148CFC]">Edit,
            Process & Automate</h1>
          <div className="w-[520px] pt-[3.5px] pb-[22px]">
            <Typography
              label="Empower your creativity with powerful yet easy-to-use toolkits and APIs on the cloud. Build custom workflows by connecting tools for seamless video, image, and audio editing."
              variant="b2"
            />
          </div>
          <Button
            label="Join the Waitlist"
            variant="primary"
            filled
            onClick={() => setWaitlistModal(true)}
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-6 bg-[url(../public/assets/img/hero_bg.svg)] bg-cover bg-left">
          <Image src={HeroImg} width={594} height={330} alt="hero image" className="animate-float"/>
        </div>
      </div>
    </div>
  )
}