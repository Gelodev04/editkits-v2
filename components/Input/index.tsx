import React from "react";

type InputProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  email?: string;
  code?: string;
  disabled?: boolean;
  variant?: string;
  height?: number;
  borderRadius?: number;
}

export default function Input(props: InputProps) {
  return (
    <input
      disabled={props.disabled}
      //@ts-ignore
      className={`text-xs w-full border border-solid border-2 ${(props?.error && props?.email?.length > 0) || props.error && props?.code?.length > 0 ? "border-red-300" : "border-slate-200"} p-3 rounded-md outline-none text-[#2c2c2c] ${props.disabled && "bg-[#E0E0E0A6] "} ${props.variant === "t2" && "max-h-10 font-lato font-bold"}`}
      placeholder={props.placeholder}
      type={props.type || "text"}
      onChange={props.onChange}
      style={{height: props.height, borderRadius: props.borderRadius}}
    />
  )
}