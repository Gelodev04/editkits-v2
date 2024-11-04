import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";
import {validateEmail} from "@/lib/validateEmail";

export default function ForgetPassword(
  props: AuthModalProps,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
) {
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex justify-center">
          <div className="text-center sm:ml-4 sm:mt-4">
            <Typography
              label={props.type}
              center
              variant="h3"
            />

            <div className="mt-2">
              <Typography
                label="Enter your email below to send a reset code"
                center
                variant="b3"
              />
            </div>
          </div>
        </div>
      </div>
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
        />
      </div>
      <div className="flex justify-center sm:pt-28">
        <div className="py-3 sm:flex flex justify-center w-[34%] sm:pb-10">
          <Button
            disabled={!isEmailValid}
            onClick={() => props.setType("Reset Password")}
            label="Send reset code" variant="secondary"
            filled
          />
        </div>
      </div>
    </>
  )
}