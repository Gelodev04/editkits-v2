import React from "react";

type InputProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: boolean;
  value?: string | number;
  disabled?: boolean;
  height?: number;
  borderRadius?: number;
  bgColor?: string;
  min?: number;
  step?: number;
}

export default function Input(props: InputProps) {
  const baseClasses = `w-full font-lato font-normal text-sm border px-[21px] rounded-[8px] h-12 py-[14px] outline-none text-[#6f6c90] leading-[20px] shadow-[0_2px_4px_rgba(19,18,66,0.07)]`;
  // @ts-ignore
  const errorClasses = props?.error && (props?.value?.length || props?.value?.length) ? "border-red-300" : "border-[#9f9f9f]";
  const disabledClasses = props.disabled && "bg-[#e0e0e0a6]";

  const finalClasses = `${baseClasses} ${errorClasses} ${disabledClasses}`.trim();


  return (
    <input
      disabled={props.disabled}
      //@ts-ignore
      className={finalClasses}
      placeholder={props.placeholder}
      type={props.type}
      onChange={props.onChange}
      style={{height: props.height, backgroundColor: props.bgColor}}
      value={props.value ?? ""}
      min={props.min}
      step={props.step}
    />
  )
}