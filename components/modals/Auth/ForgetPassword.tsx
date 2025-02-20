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
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
) {
  return (
    <>
      <div className="px-[43px] pt-[33px]">
        <TextField
          onChange={(e) => {
            if (!hasTyped) setHasTyped(true);
            setEmail(e.target.value);
            setEmailValid(validateEmail(e.target.value));
          }}
          error={!isEmailValid}
          email={email}
          label="Email"
          placeholder="abcd1234@gmail.com"
          value={email}
          type="text"
        />
      </div>
      <div className="pt-[70px] pb-[38px] max-w-[446px] mx-auto">
        <Button
          disabled={hasTyped && !isEmailValid}
          onClick={() => handleSendResetCode(email, requestPasswordReset, setType)}
          label="Send reset code"
          variant="outlined"
          filled
          height={67}
        />
      </div>
    </>
  )
}