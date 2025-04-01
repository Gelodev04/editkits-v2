import React from "react";
import Image, {StaticImageData} from "next/image";
import {Divider} from "@mui/material";

type ToolCardProps = {
    name: string;
    icon: StaticImageData;
    icon_hover: StaticImageData;
    variant?: string;
    description?: string;
}

export default function ToolCard({name, description, icon, icon_hover, variant}: ToolCardProps) {
  return variant === "tools" ? <ForToolsPage name={name} icon={icon} icon_hover={icon_hover} description={description} /> : <ForHomePage name={name} icon={icon} icon_hover={icon_hover} />;
}

function ForToolsPage({name, description, icon, icon_hover, }) {
  return (
    <div key={name} className="group w-[208px] pt-[18.77px] h-[181px] border-solid border-[1px] border-[#e4e4e4] rounded-md justify-center cursor-pointer hover:text-white text-[#262628] hover:scale-105 hover:bg-[#1d2939] transition-transform transition-colors duration-500 relative">
      <div
        className="max-w-[178px] mx-auto flex flex-col items-center"
      >
        <Image
          src={icon}
          className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-500"
          alt="icon"
        />

        <Image
          src={icon_hover}
          alt={`${name} hover icon`}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <p className="font-lato font-normal text-sm text-center pt-[48px] py-[8px]">{name}</p>
        <Divider
          sx={{
            borderStyle: "dashed",
            borderWidth: "1px",
            borderColor: "#e2e4e9",
          }}
          orientation="horizontal"
          flexItem
        />
        <p className="font-lato font-bold text-[11px] leading-[20px] text-[#4f4f4f] group-hover:text-white text-center pt-[8px] tracking-[0.8px]">{description}</p>
      </div>
    </div>
  )
}

function ForHomePage({icon, name, icon_hover}) {
  return (
    <div
      key={name}
      className="group hover:text-white text-[#262628] w-[208px] h-[121px] px-4 flex flex-col items-center border-solid border-[1px] border-[#9f9f9f] py-6 rounded-md justify-center cursor-pointer hover:scale-105 hover:bg-[#1d2939] transition-transform transition-colors duration-500 relative"
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