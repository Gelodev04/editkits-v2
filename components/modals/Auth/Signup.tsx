import React from 'react';

import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import {AuthModalProps} from "@/components/modals/Auth";
import {FaCheckCircle} from "react-icons/fa";
import {validateEmail} from "@/lib/validateEmail";
import {validatePassword} from "@/lib/validatePassword";

export default function Signup(
  props: AuthModalProps,
  password: string,
  setPassword: (e: React.SetStateAction<string>) => void,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
  confirmPassword: string,
  setConfirmPassword: (e: React.SetStateAction<string>) => void,
  isPasswordValid: boolean,
  setPasswordValid: (e: React.SetStateAction<boolean>) => void,
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
                label="Enter the field below to get started"
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
          label="Email" placeholder="Your email"/>
        <div className="py-4">
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const passwordValue = e.target.value;
              setPassword(passwordValue);
              setPasswordValid(validatePassword(passwordValue));
            }}
            error={!isPasswordValid}
            password={password}
            label="Password"
            placeholder="Your password"
            type="password"
          />
        </div>
        <TextField
          onChange={(e) => setConfirmPassword(e.target.value)}
          password={password}
          error={password !== confirmPassword}
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
        />
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
              <FaCheckCircle size={20} color={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "#0ea5e9" : "#d9d9d9"}/>
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
      <div className="flex justify-center">
        <div className="py-3 sm:flex flex justify-center w-[34%]">
          <Button
            onClick={() => props.setType("Enter verification code")}
            disabled={!isEmailValid || !isPasswordValid || password !== confirmPassword}
            label="Create account"
            variant="secondary"
            filled
          />
        </div>
      </div>
      <div className="flex justify-center pb-10 gap-4 items-center">
        <Typography label="Already have an account?"/>
        <Button onClick={() => props.setType("Log In")} label="Login" variant="primary" filled width={40}/>
      </div>
    </>
  )
}