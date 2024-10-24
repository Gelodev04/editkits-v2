import Typography from "@/components/Typography";
import Input from "@/components/Input";
import React from "react";
import PasswordInput from "../PasswordInput/index";

type TextFieldProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

export default function TextField(props: TextFieldProps) {
  return (
    <>
      <Typography label={props.label}/>
      <div className="pt-2">
        {props.type === "password" ? (
          <PasswordInput onChange={props.onChange} placeholder={props.placeholder}/>
        ) : (
          <Input type={props.type} onChange={props.onChange} placeholder={props.placeholder}/>
        )}
      </div>
    </>
  )
}