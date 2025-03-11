import React from "react";
import Image, {StaticImageData} from "next/image";

type ToolCardProps = {
    name: string;
    icon: StaticImageData;
    icon_hover: StaticImageData;
}

export default function ToolCard({name, icon, icon_hover}: ToolCardProps) {
    return (
      <div
        className="group hover:text-white text-[#262628] w-[208px] h-[121px] px-4 flex flex-col items-center border-solid border-[1px] border-[#9f9f9f] py-6 rounded-md justify-center cursor-pointer hover:scale-105 hover:bg-[#273266] transition-transform transition-colors duration-500 relative"
      >
        <Image
          src={icon}
          alt={name}
          className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-500"
        />

        <Image
          src={icon_hover}
          alt={`${name} hover icon`}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <p className="font-lato font-normal text-sm text-center mt-16">{name}</p>
        </div>
    )
}