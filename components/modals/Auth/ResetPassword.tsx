import React from 'react';

import InputField from "@/components/InputField";

import {validatePassword} from "@/lib/validatePassword";
import {PasswordValidation} from "@/components/PasswordValidtion";
import {AuthModalProps} from "@/components/modals/Auth/index";
import Toggle from "@/components/Toggle";
import ButtonOld from "@/components/Button_Old";

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
      <InputField
        label="Code"
        placeholder="Reset Code"
        onChange={(e) => {
          const code = e.target.value;
          if (!hasTyped) setHasTyped(true);
          setCode(code)
        }}
        value={code}
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
          value={password}
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
        value={password}
        error={password !== confirmPassword}
        label="Confirm the password"
        placeholder="**********"
        type="password"
      />
      <div className="py-[20px]">
        <Toggle label="Remember me"/>
      </div>
      <PasswordValidation password={password}/>
      <div className="pt-[42px] max-w-[446px] mx-auto">
        <ButtonOld
          disabled={hasTyped && (code?.length !== 6 || !isPasswordValid || password !== confirmPassword) || isConfirmPasswordResetLoading}
          onClick={() => handleResetPassword(email, code, password, confirmPasswordReset, setType, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, props.setAuthModal)}
          label="Reset Password"
          variant="popup"
          filled
          isLoading={isConfirmPasswordResetLoading}
        />
      </div>
    </>
  )
}