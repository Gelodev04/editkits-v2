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
    return "text-neutral-500 text-sm font-semibold"
  } else if (variant === "secondary") {
    return `font-bold py-4 text-sm w-full ${filled ? "bg-sky-500 text-white hover:bg-sky-600" : "hover:bg-sky-100 text-zinc-500"} hover:scale-105 transition duration-300 border-2 border-zinc-100 flex justify-center items-center gap-4 rounded-full cursor-pointer`;
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