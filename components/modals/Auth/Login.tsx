import Typography from "@/components/Typography";
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
  setPasswordValid:(e:  React.SetStateAction<boolean>) => void
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
                label="Welcome back! Please enter your details"
                center
                variant="b3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[50.5px]">
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid(validateEmail(e.target.value));
          }}
          error={!isEmailValid}
          email={email}
          label="Email"
          placeholder="Your email"
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
            type="password"
            label="Password"
            placeholder="Your password"
          />
        </div>
        <div className="py-3">
          <div className="flex justify-between items-center">
            <Toggle name="remember-me" label="Remember me"/>
            <Typography onClick={() => props.setType("Forgot your password?")} label="Forgot password" variant="bbl3" />
          </div>
        </div>
      </div>
      <div className="flex justify-center sm:pt-32">
        <div className="py-3 sm:flex flex justify-center w-[34%]">
          <Button
            disabled={!isEmailValid || !isPasswordValid}
            onClick={() => props.setAuthModal(false)}
            label="Login"
            variant="secondary"
            filled
          />
        </div>
      </div>
      <div className="flex justify-center pb-10 gap-4">
        <Typography label="Don't have an account?" />
        <Button onClick={() => props.setType("Sign Up")} label="Signup" variant="primary" filled width={40}/>
      </div>
    </>
  )
}