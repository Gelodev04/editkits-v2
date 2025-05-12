import Input from "@/components/Input";
import React from "react";
import PasswordInput from "../PasswordInput/index";

type InputFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  error?: boolean;
  disabled?: boolean;
  value?: string | number;
}

export default function InputField(props: InputFieldProps) {
  return (
    <>
      <p className="font-lato font-medium text-base leading-[20px] text-[#2c2c2c] pb-[17px] dark:text-white">{props.label}</p>
      <div>
        {props.type === "password" && (
          <PasswordInput
            value={props.value}
            //@ts-ignore
            error={props.error && props?.value?.length > 0}
            onChange={props.onChange}
            placeholder={props.placeholder}
          />
        )}
        {props.type === "text" && (
          <Input
            disabled={props.disabled}
            error={props.error}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}

            defaultValue={props.value}
          />
        )}
      </div>
    </>
  )
}