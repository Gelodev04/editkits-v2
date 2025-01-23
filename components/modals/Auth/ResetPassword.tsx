import React from 'react';

import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import {AuthModalProps} from "@/components/modals/Auth";
import {FaCheckCircle} from "react-icons/fa";
import {validatePassword} from "@/lib/validatePassword";

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
  handleResetPassword: any
) {
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex justify-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <Typography
              label={props.type}
              center
              variant="h3"
            />

            <div className="mt-2">
              <Typography
                label={ <>We have sent the reset code to <span className="font-bold">{email || ""}</span>, please enter the code below to reset your password</>}
                center
                variant="b3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
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
        />
        <div className="py-4">
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
        <div className="py-4">
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            password={password}
            error={password !== confirmPassword}
            label="Confirm the password"
            placeholder="**********"
            type="password"
          />
        </div>
        <div className="py-4">
          <div className="pb-4">
            <Toggle name="remember-me" label="Remember me"/>
          </div>
          <div className="grid grid-cols-2 gap-y-1">
            <div className="flex items-center gap-x-2">
              <FaCheckCircle size={20} color={/[a-z]/.test(password) ? "#0ea5e9" : "#d9d9d9"}/>
              <Typography variant="b4" label="One lowercase character"/>
            </div>
            <div className="flex items-center gap-x-2">
              <FaCheckCircle size={20} color={/[!@#$%^&*(),.?":{}|<>\\\/~\-_=+\[\];'`]/.test(password) ? "#0ea5e9" : "#d9d9d9"}/>
              <Typography variant="b4" label="One special character"/>
            </div>
            <div className="flex items-center gap-x-2">
              <FaCheckCircle size={20} color={/[A-Z]/.test(password) ? "#0ea5e9" : "#d9d9d9"}/>
              <Typography variant="b4" label="One uppercase character"/>
            </div>
            <div className="flex items-center gap-x-2">
              <FaCheckCircle size={20} color={password.length >= 8 ? "#0ea5e9" : "#d9d9d9"}/>
              <Typography variant="b4" label="8 character minimum"/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:pb-8 lg:pt-4">
        <div className="py-3 sm:flex flex justify-center w-[34%]">
          <Button
            disabled={code?.length !== 6 || !isPasswordValid || password !== confirmPassword}
            onClick={handleResetPassword}
            label="Reset Password"
            variant="secondary"
            filled
          />
        </div>
      </div>
    </>
  )
}