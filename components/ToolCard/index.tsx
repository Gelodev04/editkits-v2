import React from "react";
import Typography from "../Typography";
import Image from "next/image";

type ToolCardProps = {
    name: string;
    icon: React.ReactNode;
}

export default function ToolCard({name, icon}: ToolCardProps) {
    return (
        <div className="2xl:w-52 xl:w-48 lg:w-42 sm:w-full flex flex-col sm:gap-y-4 2xl:gap-y-0 w-full items-center border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-2xl cursor-pointer hover:scale-105 hover:bg-sky-100 transition-transform duration-300">
            <Image src={icon} alt={name} />
            <Typography center label={name} variant="p" />
        </div>
    )
}