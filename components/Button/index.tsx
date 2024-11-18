import React from "react";
import Image from "next/image";

type ButtonProps = {
  label: string;
  variant: string;
  filled?: boolean;
  width?: number;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  border?: boolean;
  bold?: boolean;
  className?: string;
  font?: string;
  fontWeight?: string;

}

function ButtonStyle(variant: string, filled?: boolean, disabled?: boolean, width?: number, border?: boolean, bold?: boolean, className?: string, font?: string, fontWeight?: string) {
  if (variant === "primary") {
    return `${font ?? "font-montserrat"} ${bold ? "font-semibold text-[#2c2c2c]": `${fontWeight ?? "font-semibold"} text-neutral-500`} hover:scale-105 transition-transform duration-300 hover:text-[#2c2c2c] text-sm flex gap-4 justify-center`
  } else if (variant === "secondary") {
    return ` ${!className?.includes('py') ? "py-4" : className} font-bold font-lato text-sm w-full ${filled && !disabled ? "bg-sky-500 text-white hover:bg-sky-600" : filled && disabled ? "bg-neutral-50 text-[#b3b3b3]" : "hover:bg-sky-100 text-zinc-500"} ${!disabled && "hover:scale-105 transition duration-300 cursor-pointer"} border-2 border-zinc-100 flex justify-center items-center gap-2 rounded-full`;
  } else if (variant === "outlined") {
    return `font-bold py-4 font-lato text-lg w-full ${filled ? "bg-sky-500 text-white" : "bg-[#e9faffb2] text-[#17ABDB]" } ${!disabled && "hover:scale-105 transition duration-300 cursor-pointer"} border-2 border-zinc-100 flex justify-center items-center gap-4 rounded-xl`;
  } else if (variant === "contained") {
      return `${className} font-bold ${!className?.includes('py') ? "py-4": className} font-lato text-sm w-full ${filled && !disabled ? "bg-sky-500 text-white hover:bg-sky-600" : filled && disabled ? "bg-neutral-50 text-[#b3b3b3]" : "hover:bg-sky-100 text-[#4f4f4f]"} ${!disabled && "hover:scale-105 transition duration-300 cursor-pointer"} ${border ? "border-2 border-gray-500" : "border-2 border-zinc-100"} flex justify-center items-center gap-4 rounded-full`;
  }
}


export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={ButtonStyle(props.variant, props.filled, props.disabled, props.width, props.border, props.bold, props.className, props.font, props.fontWeight)}
      disabled={props.disabled}
    >
      {props.leftIcon && <Image src={props.leftIcon} alt="left_icon" />}
      {props.label}
      {props?.rightIcon}
    </button>
  )
}