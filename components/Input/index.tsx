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
  bgColor?: string;
  value?: number | string;
}

export default function Input(props: InputProps) {
  const baseClasses = "w-full border border-solid border-2 px-[19px] py-[21px] rounded-md outline-none text-[#6f6c90] font-lato  leading-[20px] shadow-sm";
  const errorClasses = props?.error && (props?.email?.length || props?.code?.length) ? "border-red-300" : "border-slate-200";
  const disabledClasses = props.disabled && "bg-[#E0E0E0A6]";
  const variantClasses = `font-lato font-bold text-sm ${props.variant === "t2" ? "max-h-10" : "font-normal"}`;

  return (
    <input
      disabled={props.disabled}
      //@ts-ignore
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${variantClasses}`}
      placeholder={props.placeholder}
      type={props.type || "text"}
      onChange={props.onChange}
      style={{height: props.height, borderRadius: props.borderRadius, backgroundColor: props.bgColor}}
      value={props.value ?? ""}
    />
  )
}