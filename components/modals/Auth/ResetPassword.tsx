import React from 'react';

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import {validatePassword} from "@/lib/validatePassword";
import {PasswordValidation} from "@/components/PasswordValidtion";

export default function ResetPassword(
  type: string,
  email: string,
  code: string,
  setCode: (e: React.SetStateAction<string>) => void,
  password: string,
  setPassword: (e: React.SetStateAction<string>) => void,
  confirmPassword: string,
  setConfirmPassword: (e: React.SetStateAction<string>) => void,
  isPasswordValid: boolean,
  setPasswordValid: (e: React.SetStateAction<boolean>) => void,
  handleResetPassword: any,
  confirmPasswordReset: any,
  setType: (e: React.SetStateAction<string>) => void
) {
  return (
    <>
      <div className="px-10 pt-[23px]">
        <TextField
          label="Code"
          placeholder="Reset Code"
          onChange={(e) => {
            const code = e.target.value;
            setCode(code)
          }}
          value={code}
          code={code}
          error={!(code.length >= 6)}
          type="text"
        />
        <div className="pt-[32px]">
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const passwordValue = e.target.value;
              setPassword(passwordValue);
              setPasswordValid(validatePassword(passwordValue));
            }}
            error={!isPasswordValid}
            password={password}
            label="New Password"
            placeholder="*********"
            type="password"
          />
        </div>
        <div className="pt-[32px] pb-[23px]">
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            password={password}
            error={password !== confirmPassword}
            label="Confirm the password"
            placeholder="**********"
            type="password"
          />
        </div>
        <PasswordValidation password={password}/>
      </div>
      <div className="pt-6 pb-10 max-w-[411px] mx-auto">
        <Button
          disabled={code?.length !== 6 || !isPasswordValid || password !== confirmPassword}
          onClick={() => handleResetPassword(email, code, password, confirmPasswordReset, setType)}
          label="Reset Password"
          variant="secondary"
          filled
        />
      </div>
    </>
  )
}