import React from "react";
import Typography from "../../Typography/index";
import Image, {StaticImageData} from "next/image";

type ToolCardProps = {
    name: string;
    icon: StaticImageData;
    tools?: boolean;
}

export default function ToolCard({name, icon, tools}: ToolCardProps) {
    return (
        <div className={`w-[208px] h-[121px] lg:w-[180px] px-4 flex flex-col sm:gap-y-4 2xl:gap-y-0 items-center border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-lg cursor-pointer hover:scale-105 hover:bg-sky-100 transition-transform duration-300`}>
            <Image src={icon} alt={name} />
            <Typography center label={name} variant="p" />
        </div>
    )
}