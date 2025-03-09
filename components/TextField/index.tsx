import React from "react";

type TextFieldProps = {
  label: string;
  onChange?: any;
  placeholder: string;
  type: string;
  error?: boolean;
  email?: string;
  password?: string;
  code?: string;
  disabled?: boolean;
  variant?: string;
  height?: number;
  borderRadius?: number;
  bgColor?: string;
  value?: string | number;
}

export default function TextField(props: TextFieldProps) {
  return (
    <>

      <p className="font-lato font-bold text-sm leading-[21px] text-[#2c2c2c] pb-[4px]">{props.label}</p>
      <div>
        <textarea
          value={props.value}
          onChange={props.onChange}
          name=""
          id=""
          rows={10}
          placeholder={props.placeholder}
          className={`w-full font-lato pt-[9px] px-[12px] font-normal text-sm text-[#6f6c90] shadow-none rounded-[8px] border ${props.error ? 'border-red-300' : 'border-[#9f9f9f]'} leading-[18px] font-normal outline-none`}
        />

      </div>
    </>
  )
}