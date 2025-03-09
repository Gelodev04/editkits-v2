import React from "react";
import Image, {StaticImageData} from "next/image";
import Typography from "@/components/Typography";

type ToolCardProps = {
  name: string;
  icon: StaticImageData;
  tools?: boolean;
  description?: string;
}

export default function FeatureCard({name, icon, description}: ToolCardProps) {
  return (
    <div
      className="w-[328px] h-[174px] flex flex-col relative"
    >
      <Image
        src={icon}
        alt={name}
        width={36}
      />
      <p className="font-lato font-bold text-base  py-[12px] leading-[22.4px] text-[#2c2c2c]">{name}</p>
      <Typography label={description} variant="b3" />
    </div>
  )
}