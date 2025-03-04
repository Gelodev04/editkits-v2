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
  const baseClasses = `w-full text-sm border border-1 px-[19px] ${props.variant === "fileUpload" ? "" : "py-[21px]"} rounded-md outline-none text-[#6f6c90] font-lato  leading-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.14)]`;
  const errorClasses = props?.error && (props?.email?.length || props?.code?.length) ? "border-red-300" : "border-[#9f9f9f]";
  const disabledClasses = props.disabled && "bg-[#E0E0E0A6]";
  const variantClasses = `font-lato font-bold ${props.variant === "t2" ? "max-h-10 shadow-none border-[#e0e0e0]" : "font-normal"}`;
  const fileUploadClasses = props.variant === "fileUpload" ? "text-xs shadow-none rounded-[8px] border-[#9f9f9f] leading-[18px] font-normal py-0 " : "";
  const contactUs = props.variant === "contact-us" ? `text-xs shadow-none rounded-[8px] ${props?.error ? 'border-red-300' : 'border-[#9f9f9f]'} leading-[18px] font-normal py-0 ` : "";

  const finalClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${variantClasses} ${fileUploadClasses} ${contactUs}`.trim();


  return (
    <input
      disabled={props.disabled}
      //@ts-ignore
      className={finalClasses}
      placeholder={props.placeholder}
      type={props.type || "text"}
      onChange={props.onChange}
      style={{height: props.height, borderRadius: props.borderRadius, backgroundColor: props.bgColor}}
      value={props.value ?? ""}
    />
  )
}