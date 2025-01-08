import React from "react";
import ReactCodeInput from "react-code-input";

const codeInputProps = {
  autoFocus: false,
  className: "bg-white flex gap-x-96 input text-center",
  inputStyle: {
    fontFamily: 'montserrat',
    fontWeight: 500,
    fontSize: '30px',
    margin: "16px",
    textAlign: "center",
    color: '#4f4f4f',
    borderBottom: '2px solid #d4d4d4',
    width: "48px",
    outline: "none",
  },
}

export default function VerificationCodeInput({onChange}: {onChange: (e: string) => void}) {
  //@ts-ignore
  return <ReactCodeInput onChange={onChange} type='number' fields={5} {...codeInputProps} />
}