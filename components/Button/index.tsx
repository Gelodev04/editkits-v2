import React from "react";

type ButtonProps = {
  label: string;
  variant: string;
  filled?: boolean;
  width?: number;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  disabled?: boolean;

}

function ButtonStyle(variant: string, filled?: boolean, disabled?: boolean) {
  if (variant === "primary") {
    return "text-neutral-500 hover:scale-105 transition-transform duration-300 hover:text-[#2c2c2c] text-sm font-semibold"
  } else if (variant === "secondary") {
    return `font-bold py-4 font-lato text-sm w-full ${filled && !disabled ? "bg-sky-500 text-white hover:bg-sky-600" : filled && disabled ? "bg-neutral-50 text-[#b3b3b3]" : "hover:bg-sky-100 text-zinc-500"} ${!disabled && "hover:scale-105 transition duration-300 cursor-pointer"} border-2 border-zinc-100 flex justify-center items-center gap-4 rounded-full`;
  } else if (variant === "outlined") {
    return `text-[#17ABDB] font-bold py-4 font-lato text-lg w-full bg-[#E9FAFFB2] ${!disabled && "hover:scale-105 transition duration-300 cursor-pointer"} border-2 border-zinc-100 flex justify-center items-center gap-4 rounded-xl`;
  }
}


export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={ButtonStyle(props.variant, props.filled, props.disabled)}
      disabled={props.disabled}
    >
      {props.label}
      {props?.rightIcon}
    </button>
  )
}