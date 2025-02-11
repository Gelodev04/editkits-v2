import React from "react";
import Image, {StaticImageData} from "next/image";

type ToolCardProps = {
  name: string;
  icon: StaticImageData;
  tools?: boolean;
}

export default function FeatureCard({name, icon}: ToolCardProps) {
  return (
    <div
      className="px-2 w-[240px] h-[277px] flex flex-col justify-between pt-2 pb-10 px-4 items-center border-solid border-[1px] border-[#273266] rounded-[20px] justify-center cursor-pointer hover:scale-105 transition-transform transition-colors duration-500 relative"
    >
      <Image
        src={icon}
        alt={name}
        width={150}
      />
      <p className="font-workSans font-semibold text-[22px] text-center pt-4 leading-[30.8px] text-[#2c2c2c]">{name}</p>
    </div>
  )
}