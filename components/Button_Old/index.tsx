import React from "react";
import Image from "next/image";
import {Spinner} from "@/components/Spinner";

type ButtonProps = {
  label: string;
  variant: 'popup' | 'popup_link' | 'primary' | 'secondary' | 'standard' | 'standard_sm';
  filled?: boolean;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean
}

function ButtonStyle(variant: string, filled?: boolean, disabled?: boolean) {
  switch (variant) {
    case "popup":
      return `w-[448px] h-[64px] rounded-[86px] outline-none ${disabled ? "bg-[#ebebeb] text-[#2c2c2c]" : "bg-[#148cfc] text-white"} shadow-[rgba(201, 229, 255, 1)] font-lato font-bold text-lg leading-[20px]`;
    case "popup_link":
      return "font-openSans font-bold text-xs leading-[15px] text-[#148cfc]";
    case "primary":
      return `w-[209px] h-[48px] rounded-[37px] outline-none 
        ${disabled ? "bg-[#465fff] text-[white] cursor-not-allowed" : filled ? "bg-[#465fff] text-white" : "text-[#2c2c2c] bg-white border border-[#2c2c2c]"} 
        flex justify-center items-center gap-[27px] font-lato font-bold text-sm leading-[28px]`;
    case "secondary":
      return `w-[200px] h-[48px] rounded-[8px] outline-none text-[#4f4f4f] border-[1px] border-gray-300 font-montserrat font-bold text-sm leading-[28px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    case "standard_sm":
      return `w-[140px] h-[47px] rounded-[36px] outline-none ${filled ? `${disabled ? "bg-[#ebebeb] text-[#2c2c2c]" : "bg-[#148cfc] text-white"}` : "bg-white border-[1px] text-[#2c2c2c]"} flex justify-center items-center gap-[4px] font-lato font-bold text-sm leading-[28px]`;
    case "standard":
      return `w-[226px] h-[64px] rounded-[30px] outline-none bg-[#14  8cfc] font-lato font-bold text-sm leading-[28px]`
  }
}


export default function ButtonOld(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      // @ts-ignore
      className={ButtonStyle(props.variant, props.filled, props.disabled)}
      disabled={props.disabled && props.label !== "Account"}
    >
      {/*@ts-ignore*/}
      {props.leftIcon && <Image src={props.leftIcon} alt="Left Icon" priority/>}
      {props.isLoading && <Spinner/>}
      {props.label}
      {props?.rightIcon}
    </button>
  )
}