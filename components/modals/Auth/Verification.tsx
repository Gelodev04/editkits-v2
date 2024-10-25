import React, {useState} from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import {AuthModalProps} from "./index";

//@ts-ignore
export default function Verification({props, code, setCode}: { props: AuthModalProps, code: string[], setCode: any }) {

  console.log(code.join(''))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(-1);
    setCode(newCode);

    if (e.target.value && index < code.length - 1) {
      document?.getElementById(`digit-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    //@ts-ignore
    const paste = e.clipboardData.getData('text').slice(0, 5);
    const newCode = paste.split('');
    setCode(newCode.concat(Array(5 - newCode.length).fill('')));
  };

  return (
    <>
      <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-10">
        <div className="sm:flex justify-center pt-6">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <Typography
              label={props.type}
              center
              variant="h3"
            />

            <div className="mt-2">
              <Typography
                label="We've sent a code to example@gmail.com"
                center
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex space-x-8">
          {code.map((digit: string, index: number) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              //@ts-ignore
              onPaste={handlePaste}
              maxLength={1}
              className="w-12 h-12 text-black text-center text-2xl border-b-2 border-neutral-300 outline-none"
              accept="number"

            />
          ))}
        </div>
        <div className="flex pb-10 pt-5 justify-center items-center gap-1">
          <Typography label="Didn't get the code ?"/>
          <Button label="Click to resend" variant="primary"/>
        </div>
      </div>
      <div className="flex justify-center pb-8">
        <div className="py-3 sm:flex flex justify-center w-[34%]">
          <Button onClick={() => props.setAuthModal(false)} label="Verify" variant="secondary" filled/>
        </div>
      </div>
    </>
  )
}