import React from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import VerificationCodeInput from "../../VerificationCodeInput/index";

//@ts-ignore
export default function Verification(
  type: string,
  setType: (e: React.SetStateAction<string>) => void,
  timer: number,
  email: string,
  codes: string,
  setCodes: (e: React.SetStateAction<string>) => void,
  handleResendConfirmationCode: any,
  handleConfirmRegister: any,
  isConfirmRegisterLoading: boolean,
  setTimer: any,
  resendConfirmationCode: any,
  confirmRegister: any
) {

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <VerificationCodeInput onChange={(e: string) => setCodes(e)}/>
        <div className="flex pb-10 pt-5 justify-center items-center gap-y-1 gap-x-2">
          <Typography label="Didn't get the code ?" variant="b3"/>
          {timer === 0 && <Typography
            onClick={() => handleResendConfirmationCode(email, type, setTimer, setType, resendConfirmationCode)}
            label="Click to resend" variant="bb3" button />}
          <div className="flex gap-x-1">
            {timer !== 0 && <Typography label={`Click here to resend `} variant="bb3"/>}
            {timer !== 0 && <Typography label={`in ${timer} seconds`} variant="b3"/>}
          </div>
        </div>
      </div>
        <div className="pb-3 pt-[56px] pb-[52px] p max-w-[411px] mx-auto">
          <Button
            onClick={() => handleConfirmRegister(email, codes, confirmRegister, setType)}
            label="Verify" variant="secondary"
            filled
            disabled={codes.length !== 6 || isConfirmRegisterLoading}
          />
        </div>
    </>
  )
}