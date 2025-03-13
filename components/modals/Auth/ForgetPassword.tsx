import React from "react";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import {validateEmail} from "@/lib/validateEmail";

export default function ForgetPassword(
  props: any,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
  handleSendResetCode: any,
  requestPasswordReset: any,
  isRequestPasswordResetLoading: boolean,
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
) {
  return (
    <>
      <div className="px-[43px] pt-[33px]">
        <InputField
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
          disabled={(hasTyped && !isEmailValid) || isRequestPasswordResetLoading}
          onClick={() => handleSendResetCode(email, requestPasswordReset, props.setType, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, props.setAuthModal)}
          label="Send reset code"
          variant="outlined"
          filled
          height={67}
          isLoading={isRequestPasswordResetLoading}
        />
      </div>
    </>
  )
}