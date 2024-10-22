import React from "react";

type ButtonProps = {
    label: string;
    variant: string;
    filled?: boolean;
    width?: number;
    onClick?: () => void;
    rightIcon?: React.ReactNode;

}

function ButtonStyle(variant: string){
    if(variant === "primary") {
        return "text-neutral-500 text-sky-800 text-sm"
    }
}


export default function Button(props: ButtonProps) {
    return (
        <div className={props.variant === "secondary" ? `text-black py-2 text-sm w-full space-x-4 ${props.filled ? "bg-sky-500 text-white": ""} px-4 flex justify-center items-center border-solid border-2 border-zinc-100  rounded rounded-full` : ""}>
            <button onClick={props.onClick} className={ButtonStyle(props.variant)}>{props.label}</button>
            {props?.rightIcon}
        </div>
    )
}