import React from "react";

type ButtonProps = {
  label: string;
  variant: string;
  filled?: boolean;
  width?: number;
  onClick?: () => void;
  rightIcon?: React.ReactNode;

}

function ButtonStyle(variant: string, filled?: boolean) {
  if (variant === "primary") {
    return "text-neutral-500 text-sky-800 text-sm"
  } else if (variant === "secondary") {
    return `text-black py-2 text-sm w-full space-x-4 ${filled ? "bg-sky-500 text-white hover:bg-sky-600" : "hover:bg-sky-100"} hover:scale-105 transition-transform duration-300  border-solid border-2 border-zinc-100 flex justify-center items-center gap-4 rounded rounded-full cursor-pointer`
  }
}


export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={ButtonStyle(props.variant, props.filled)}
    >
      {props.label}
      {props?.rightIcon}
    </button>
  )
}