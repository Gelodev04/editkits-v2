import Input from "@/components/Input";
import React from "react";
import PasswordInput from "../PasswordInput/index";
import Typography from "@/components/Typography";

type InputFieldProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export default function InputField(props: InputFieldProps) {
  return (
    <>
      {props.variant === "t2" && <p
        className="font-lato font-bold text-sm leading-[21px] text-sm text-[#2c2c2c] leading-[21px] pb-[17px]">{props.label}</p>}
      {props.variant === "fileUpload" && (
        <div className="pb-[7px]">
          <Typography variant="b4" label={props.label}/>
        </div>
      )}
      {props.variant === "contact-us" && (
        <div className="pb-[4px]">
          <p className="font-lato font-semibold text-sm leading-[21px] text-[#4a4a4a]">{props.label}</p>
        </div>
      )}
      {!props.variant &&
      <p className="font-lato font-medium text-base leading-[20px] text-[#2c2c2c] pb-[18px]">{props.label}</p>}
      <div>
        {props.type === "password" && (
          <PasswordInput
            password={props.password}
            error={props.error}
            onChange={props.onChange}
            placeholder={props.placeholder}
            height={props.height}
          />
        )}
        {props.type !== "password" && (
          <Input
            bgColor={props.bgColor}
            height={props.height}
            disabled={props.disabled}
            variant={props.variant}
            code={props.code}
            email={props.email}
            error={props.error}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            borderRadius={props.borderRadius}
            value={props.value}
          />
        )}
      </div>
    </>
  )
}