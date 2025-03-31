import InputField from "@/components/InputField";
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
  handleSendResetCode: any,
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
        placeholder="abc@editkits.com"
        type="text"
      />
      <div className="pb-[38px] pt-[112px] max-w-[446px] mx-auto">
        <Button
          disabled={hasTyped && (!isEmailValid)}
          onClick={handleSendResetCode}
          children={<>Send Verification Code</>}
          variant="popup"
          filled
        />
      </div>
    </>
  )
}