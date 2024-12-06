import Typography from "@/components/Typography";
import Input from "@/components/Input";
import React from "react";
import PasswordInput from "../PasswordInput/index";

type TextFieldProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: boolean;
  email?: string;
  password?: string;
  code?: string;
  disabled?: boolean;
  variant?: string;
  height?: string;
  borderRadius?: string;
  bgColor?: string;
}

export default function TextField(props: TextFieldProps) {
  return (
    <>
      <Typography label={props.label} variant={props.variant === "t2" ? "bb4" : "b4"} />
      <div className="pt-2">
        {props.type === "password" ? (
          <PasswordInput password={props.password} error={props.error} onChange={props.onChange} placeholder={props.placeholder}/>
        ) : (
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
          />
        )}
      </div>
    </>
  )
}