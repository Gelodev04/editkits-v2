import React from 'react';

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import {validateEmail} from "@/lib/validateEmail";
import {validatePassword} from "@/lib/validatePassword";
import {PasswordValidation} from "@/components/PasswordValidtion";
import {AuthModalProps} from "@/components/modals/Auth/index";

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
  handleRegister: any,
  register: any,
  setAuthModal: (e: React.SetStateAction<boolean>) => void,
  isSignupLoading: any,
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
) {

  return (
    <>
      <div className="px-10 pt-[32px]">
        <InputField
          onChange={(e) => {
            if (!hasTyped) setHasTyped(true);
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
        <div className="py-[32px]">
          <InputField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const passwordValue = e.target.value;
              if (!hasTyped) setHasTyped(true);
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
        <InputField
          onChange={(e) => {
            if (!hasTyped) setHasTyped(true);
            setConfirmPassword(e.target.value)
          }}
          password={password}
          error={password !== confirmPassword}
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
        />
        <div className="pt-[23px]">
          <PasswordValidation password={password}/>
        </div>
      </div>
      <div className="pt-[47.5px] pb-[12px] max-w-[446px] mx-auto">
        <Button
          onClick={() => handleRegister(email, password, props.setType, register, setAuthModal, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal)}
          disabled={hasTyped && (!isEmailValid || !isPasswordValid || password !== confirmPassword || isSignupLoading)}
          label="Create account"
          variant="outlined"
          filled
          height={67}
          isLoading={isSignupLoading}
        />
      </div>
      <div className="flex justify-center pb-[32px] gap-4 items-center">
        <p className="font-openSans font-semibold text-xs leading-[15px] text-[#2c2c2c]">Already have an account?</p>
        <Button
          className="font-openSans font-bold text-xs text-[#148CFC]"
          onClick={() => props.setType("Log In")}
          label="Login"
          variant="primary"
          filled
          width={40}
        />
      </div>
    </>
  )
}