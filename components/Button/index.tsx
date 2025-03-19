import React from "react";
import Image from "next/image";
import Spinner from "@/components/Spinner";

type ButtonProps = {
  label: string;
  variant: string;
  filled?: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  border?: boolean;
  bold?: boolean;
  className?: string;
  font?: string;
  fontWeight?: string;
  isLoading?: boolean
}

function ButtonStyle(variant: string, filled?: boolean, disabled?: boolean) {
  // if (variant === "primary") {
  //   return ` ${className} ${bold ? "font-semibold text-[#2c2c2c]": `${fontWeight ?? "font-bold"} text-[#000]`} text-sm flex justify-center cursor-default`
  // } else if (variant === "secondary") {
  //   return `${className} ${!className?.includes('py') ? "py-4" : className} cursor-auto font-bold font-montserrat text-sm w-full ${filled && !disabled ? "bg-[#273266] text-white" : filled && disabled ? "bg-[#e0e0e0] text-[#4f4f4f]" : "text-[#4f4f4f]"} ${!disabled && "hover:scale-105 transition duration-300"} border-[1px] border-[#4f4f4f] flex justify-center items-center gap-2 rounded-full`;
  // } else if (variant === "outlined") {
  //   return ` ${className} font-bold py-4 font-lato text-sm w-full ${filled && !disabled ? "bg-[#148CFC] text-white cursor-auto" : "bg-[#e0e0e0] text-[#2c2c2c]" } ${!disabled && "hover:scale-105 transition duration-300 hover:opacity-[90%]"} border-2 flex justify-center rounded-full`;
  // } else if (variant === "contained") {
  //     return `${className} cursor-auto font-bold ${!className?.includes('py') ? "py-4": className} font-montserrat text-sm w-full ${filled && !disabled ? "bg-[#148cfc] text-white hover:bg-[#50aafd]" : disabled ? "bg-neutral-50 text-[#b3b3b3]" : "hover:bg-sky-100 text-[#4f4f4f]"} ${!disabled && "hover:scale-105 transition duration-300"} ${border ? "border-2 border-gray-500" : "border-2 border-zinc-100"} flex justify-center items-center gap-4 rounded-full`;
  // }

  switch (variant) {
    case "popup":
      return "w-[448px] h-[64px] rounded-[86px] bg-[#148cfc] shadow-[rgba(201, 229, 255, 1)] font-lato font-bold text-lg leading-[20px]";
    case "primary":
      return `w-[209px] h-[48px] rounded-[37px] ${filled ? "bg-[#148cfc] text-white" : "text-[#2c2c2c] bg-white border-[1px]-[#2c2c2c]"} font-lato font-bold text-sm leading-[28px]`;
    case "secondary":
      return `w-[268px] h-[48px] rounded-[36px] border-[1px] border-[#4f4f4f] font-montserrat font-bold text-sm leading-[28px]`;
    case "standard_sm":
      return `w-[140px] h-[47px] rounded-[36px] bg-[#148cfc] font-lato font-bold text-sm leading-[28px]`;
    case "standard":
      return `w-[226px] h-[64px] rounded-[30px] bg-[#148cfc] font-lato font-bold text-sm leading-[28px]`
  }
}


export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      // @ts-ignore
      className={ButtonStyle(props.variant, props.filled, props.disabled)}
      disabled={props.disabled}
    >
      {/*@ts-ignore*/}
      {props.leftIcon && <Image src={props.leftIcon} alt="Left Icon" priority/>}
      {props.isLoading && <Spinner />}
      {props.label}
      {props?.rightIcon}
    </button>
  )
}