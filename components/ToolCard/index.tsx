import React from "react";
import Typography from "../Typography/index";

type ToolCardProps = {
    name: string;
    icon: React.ReactNode;
}

export default function ToolCard({name, icon}: ToolCardProps) {
    return (
        <div className="flex flex-col gap-y-4 w-[75%] items-center border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center shadow-2xl cursor-pointer hover:scale-105 hover:bg-sky-100 transition-transform duration-300">
            { icon }
            <Typography label={name} />
        </div>
    )
}