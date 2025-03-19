import React from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import VerificationCodeInput from "../../VerificationCodeInput/index";
import {AuthModalProps} from "@/components/modals/Auth/index";

//@ts-ignore
export default function Verification(
  props: AuthModalProps,
  timer: number,
  email: string,
  codes: string,
  setCodes: (e: React.SetStateAction<string>) => void,
  handleResendConfirmationCode: any,
  handleConfirmRegister: any,
  isConfirmRegisterLoading: boolean,
  setTimer: any,
  resendConfirmationCode: any,
  confirmRegister: any,
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
) {

  return (
    <>
      <VerificationCodeInput onChange={(e: string) => {
        if (!hasTyped) setHasTyped(true);
        setCodes(e)
      }}/>
      <div className="flex pb-[42px] pt-[34px] justify-center items-center gap-y-1 gap-x-2">
        <Typography label="Didn't get the code ?" variant="b3"/>
        {timer === 0 && (
          <Typography
            onClick={() => handleResendConfirmationCode(email, props.type, setTimer, props.setType, resendConfirmationCode, props.setModalTitle, props.setAuthConfirmationModal, props.setModalMessage, props.setAuthModal)}
            label="Click to resend"
            variant="bb3"
            button
          />
        )}
        <div className="flex gap-x-1">
          {timer !== 0 && <Typography label={`Click here to resend `} variant="bb3"/>}
          {timer !== 0 && <Typography label={`in ${timer} seconds`} variant="b3"/>}
        </div>
      </div>
      <div className="max-w-[446px] mx-auto">
        <Button
          onClick={() => handleConfirmRegister(email, codes, confirmRegister, props.setType, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, props.setAuthModal)}
          label="Verify"
          variant="popup"
          filled
          disabled={hasTyped && (codes.length !== 6) || isConfirmRegisterLoading}
          isLoading={isConfirmRegisterLoading}
        />
      </div>
    </>
  )
}