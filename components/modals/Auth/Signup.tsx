import React from 'react';

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
          type="text"
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
        <PasswordValidation password={password}/>
      </div>
      <div className="pb-3 pt-20 max-w-[411px] mx-auto">
        <Button
          onClick={() => handleRegister(email, password, setType, register)}
          disabled={!isEmailValid || !isPasswordValid || password !== confirmPassword || isLoading}
          label="Create account"
          variant="outlined"
          filled
        />
      </div>
      <div className="flex justify-center pb-10 gap-4 items-center">
        <p className="font-openSans font-semibold text-xs leading-[15px] text-[#2c2c2c]">Already have an account?</p>
        <Button
          className="font-openSans font-bold text-xs text-[#148CFC]"
          onClick={() => setType("Log In")}
          label="Login"
          variant="primary"
          filled
          width={40}
        />
      </div>
    </>
  )
}