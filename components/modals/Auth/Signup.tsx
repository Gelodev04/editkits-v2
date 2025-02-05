import React from 'react';

import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import {validateEmail} from "@/lib/validateEmail";
import {validatePassword} from "@/lib/validatePassword";
import {PasswordValidation} from "@/components/PasswordValidtion";

export default function Signup(
  type: string,
  setType: (e: React.SetStateAction<string>) => void,
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
  handleRegister: any,
  register: any,
  isLoading?: any,
) {

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex justify-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <Typography
              label={type}
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
          label="Email"
          placeholder="Your email"
          value={email}
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
        <PasswordValidation password={password} />
      </div>
      <div className="flex justify-center">
        <div className="py-3 sm:flex flex justify-center w-[34%]">
          <Button
            onClick={() => handleRegister(email, password, setType, register)}
            disabled={!isEmailValid || !isPasswordValid || password !== confirmPassword || isLoading}
            label="Create account"
            variant="secondary"
            filled
          />
        </div>
      </div>
      <div className="flex justify-center pb-10 gap-4 items-center">
        <Typography label="Already have an account?" className="text-xs font-semibold"/>
        <Button className="font-sans text-xs text-[#0700CB] font-semibold" onClick={() => setType("Log In")} label="Login" variant="primary" filled width={40}/>
      </div>
    </>
  )
}