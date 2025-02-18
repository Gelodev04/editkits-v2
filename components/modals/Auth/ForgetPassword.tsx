import React from "react";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import {validateEmail} from "@/lib/validateEmail";

export default function ForgetPassword(
  type,
  setType: (e: React.SetStateAction<string>) => void,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
  handleSendResetCode: any,
  requestPasswordReset: any,
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
      <div className="pb-3 pt-[56px] pb-[52px] p max-w-[411px] mx-auto">
        <Button
          disabled={!isEmailValid}
          onClick={() => handleSendResetCode(email, requestPasswordReset, setType)}
          label="Send reset code" variant="secondary"
          filled
        />
      </div>
    </>
  )
}