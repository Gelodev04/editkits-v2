import TextField from "@/components/TextField";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";
import {validateEmail} from "@/lib/validateEmail";
import {validatePassword} from "@/lib/validatePassword";

export default function Login(
  props: AuthModalProps,
  password: string,
  setPassword: (e: React.SetStateAction<string>) => void,
  email: string,
  setEmail: (e: React.SetStateAction<string>) => void,
  isEmailValid: boolean,
  setEmailValid: (e: React.SetStateAction<boolean>) => void,
  isPasswordValid: boolean,
  setPasswordValid: (e: React.SetStateAction<boolean>) => void,
  handleLogin: any,
  isLoginLoading: boolean,
  login: any,
  setType: (e: React.SetStateAction<string>) => void,
  setAuthModal: (e: React.SetStateAction<boolean>) => void,
) {
  return (
    <>
      <div className="px-[50.5px]">
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid(validateEmail(e.target.value));
          }}
          error={!isEmailValid}
          email={email}
          label="Username"
          placeholder="Email address"
          value={email}
          type="text"
          height={66}
        />
        <div className="pb-4 pt-[31px]">
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const passwordValue = e.target.value;
              setPassword(passwordValue);
              setPasswordValid(validatePassword(passwordValue));
            }}
            error={!isPasswordValid}
            password={password}
            type="password"
            label="Password"
            placeholder="Password"
            height={66}
          />
        </div>
        <div className="py-3">
          <div className="flex justify-between items-center">
            <Toggle name="remember-me" label="Remember me"/>
            <p onClick={() => props.setType("Forgot your password?")}
               className="font-lato font-normal text-xs leading-[18px] text-[#6F6C90] cursor-pointer">Forgot your
              password?</p>
          </div>
        </div>
      </div>
      <div className="pb-3 pt-20 max-w-[411px] mx-auto">
        <Button
          disabled={!isEmailValid || !isPasswordValid || isLoginLoading}
          onClick={() => handleLogin(email, password, login, setType, setAuthModal)}
          label="Login"
          variant="outlined"
          filled
          height={67}
        />
      </div>
      <div className="flex justify-center pb-10 gap-4">
        <p className="font-openSans font-semibold text-xs leading-[15px] text-[#2c2c2c]">Don&apos;t have an account?</p>
        <Button
          className="font-openSans font-bold text-xs text-[#148CFC]"
          onClick={() => props.setType("Sign Up")}
          label="Signup"
          variant="primary"
          filled
          width={40}
        />
      </div>
    </>
  )
}