import React from 'react';

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import {validatePassword} from "@/lib/validatePassword";
import {PasswordValidation} from "@/components/PasswordValidtion";
import {AuthModalProps} from "@/components/modals/Auth/index";

export default function ResetPassword(
  props: AuthModalProps,
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
  setType: (e: React.SetStateAction<string>) => void,
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
  isConfirmPasswordResetLoading: boolean
) {
  return (
    <>
      <div className="px-[43px] pt-[23px]">
        <InputField
          label="Code"
          placeholder="Reset Code"
          onChange={(e) => {
            const code = e.target.value;
            if (!hasTyped) setHasTyped(true);
            setCode(code)
          }}
          value={code}
          code={code}
          error={!(code.length >= 6)}
          type="text"
        />
        <div className="py-[32px]">
          <InputField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const passwordValue = e.target.value;
              if (!hasTyped) setHasTyped(true);
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
        <InputField
          onChange={(e) => {
            if (!hasTyped) setHasTyped(true);
            setConfirmPassword(e.target.value)
          }}
          password={password}
          error={password !== confirmPassword}
          label="Confirm the password"
          placeholder="**********"
          type="password"
        />
        <div className="pt-[23px]">
          <PasswordValidation password={password}/>
        </div>
      </div>
      <div className="pt-[38.5px] pb-[38px] max-w-[446px] mx-auto">
        <Button
          disabled={hasTyped && (code?.length !== 6 || !isPasswordValid || password !== confirmPassword) || isConfirmPasswordResetLoading}
          onClick={() => handleResetPassword(email, code, password, confirmPasswordReset, setType, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, props.setAuthModal)}
          label="Reset Password"
          variant="outlined"
          filled
          height={67}
          isLoading={isConfirmPasswordResetLoading}
        />
      </div>
    </>
  )
}