import TextField from "@/components/TextField";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";
import {validateEmail} from "@/lib/validateEmail";

export default function EmailNotConfirmedLogin(
  props: AuthModalProps,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
  handleSendResetCode: any
) {
  return (
    <>
      <div className="px-10">
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid(validateEmail(e.target.value));
          }}
          error={!isEmailValid}
          email={email}
          label="Email"
          placeholder="abc@editkits.com"
          value={email}
          type="text"
        />
      </div>
      <div className="flex justify-center sm:pt-28">
        <div className="py-3 sm:flex flex justify-center w-[34%] sm:pb-10">
          <Button
            disabled={!isEmailValid}
            onClick={handleSendResetCode}
            label="Send Verification Code" variant="secondary"
            filled
          />
        </div>
      </div>
    </>
  )
}