import React from "react";
import Typography from "../Typography";
import Image from "next/image";

type ToolCardProps = {
    name: string;
    icon: React.ReactNode;
    home?: boolean;
}

export default function ToolCard({name, icon, home}: ToolCardProps) {
    return (
        <div className={`xl:w-[208px] xl:h-[121px] xl:w-48 lg:w-42 sm:w-full flex flex-col sm:gap-y-4 2xl:gap-y-0 w-full items-center border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center ${home && "shadow-2xl"} cursor-pointer hover:scale-105 hover:bg-sky-100 transition-transform duration-300`}>
            <Image src={icon} alt={name} />
            <Typography center label={name} variant="p" />
        </div>
    )
}