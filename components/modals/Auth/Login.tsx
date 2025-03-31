import InputField from "@/components/InputField";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";
import {validateEmail} from "@/lib/validateEmail";
import {validatePassword} from "@/lib/validatePassword";
import {useRouter} from "next/router";

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
  hasTyped: boolean,
  setHasTyped: (e: React.SetStateAction<boolean>) => void,
) {

  const router = useRouter();

  return (
    <>
      <InputField
        onChange={(e) => {
          if (!hasTyped) setHasTyped(true);
          setEmail(e.target.value);
          setEmailValid(validateEmail(e.target.value));
        }}
        error={!isEmailValid}
        label="Username"
        placeholder="Email address"
        value={email}
        type="text"
      />
      <div className="pt-[32px]">
        <InputField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!hasTyped) setHasTyped(true);
            const passwordValue = e.target.value;
            setPassword(passwordValue);
            setPasswordValid(validatePassword(passwordValue));
          }}
          error={!isPasswordValid}
          value={password}
          type="password"
          label="Password"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between items-center pt-[20px]">
        <Toggle label="Remember me"/>
        <p onClick={() => props.setType("Forgot your password?")}
           className="font-lato font-normal text-xs leading-[18px] text-[#6F6C90] cursor-pointer">Forgot your
          password?</p>
      </div>
      <div className="pt-[42px] max-w-[446px] mx-auto">
        <Button
          disabled={hasTyped && (!email || !password || !isEmailValid || !isPasswordValid || isLoginLoading)}
          onClick={() => handleLogin(email, password, login, setType, setAuthModal, props.setModalTitle, props.setModalMessage, props.setAuthConfirmationModal, router)}
          children={<>Login</>}
          variant="popup"
          filled
          isLoading={isLoginLoading}
        />
      </div>
      <div className="flex justify-center pt-[13px] gap-4">
        <p className="font-openSans font-semibold text-xs leading-[15px] text-[#2c2c2c]">Don&apos;t have an account?</p>
        <Button
          onClick={() => props.setType("Sign Up")}
          children={<>Signup</>}
          variant="popup_link"
          filled
        />
      </div>
    </>
  )
}