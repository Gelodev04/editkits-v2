import React from "react";

import InputField from "@/components/InputField";

import {validateEmail} from "@/lib/validateEmail";
import ButtonOld from "@/components/Button_Old";

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
      <InputField
        onChange={(e) => {
          if (!hasTyped) setHasTyped(true);
          setEmail(e.target.value);
          setEmailValid(validateEmail(e.target.value));
        }}
        error={!isEmailValid}
        value={email}
        label="Email"
        placeholder="abcd1234@gmail.com"
        type="text"
      />
      <div className="pt-[42px] max-w-[446px] mx-auto">
        <ButtonOld
          disabled={(hasTyped && !isEmailValid) || isRequestPasswordResetLoading}
          onClick={() => handleSendResetCode(email, requestPasswordReset, props.setType, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, props.setAuthModal)}
          label="Send reset code"
          variant="popup"
          filled
          isLoading={isRequestPasswordResetLoading}
        />
      </div>
    </>
  )
}