import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";

export default function ForgetPassword(props: AuthModalProps) {
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
        <TextField label="Email" placeholder="abc@editkits.com"/>
      </div>
      <div className="flex justify-center sm:pt-28">
        <div className="py-3 sm:flex flex justify-center w-[34%] sm:pb-10">
          <Button onClick={() => props.setType("Reset Password")} label="Send reset code" variant="secondary" filled/>
        </div>
      </div>
    </>
  )
}