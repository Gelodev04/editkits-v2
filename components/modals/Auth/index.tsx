"use client"

import React, {useEffect, useState} from "react";
import {Fade, Modal} from "@mui/material";
import Signup from "@/components/modals/Auth/Signup";
import Login from "@/components/modals/Auth/Login";
import {TbXboxX} from "react-icons/tb";
import Verification from "@/components/modals/Auth/Verification";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import {Lato, Montserrat, Open_Sans} from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
})

export type AuthModalProps = {
  type: string;
  showAuthModal: boolean;
  setAuthModal: (e: React.SetStateAction<boolean>) => void;
  setType: (e: React.SetStateAction<string>) => void;
  description?: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal(props: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codes, setCodes] = useState("")
  const [isPasswordValid, setPasswordValid] = useState(false)
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <Modal open={props.showAuthModal} onClose={() => props.setAuthModal(false)}>
      <Fade in={props.showAuthModal}>
        {/*@ts-ignore*/}
        <div style={style}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg `}>
                <div className="absolute right-2 top-2 cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setAuthModal(false)}/>
                </div>
                {props.type === "Sign Up" && Signup(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid)}
                {props.type === "Log In" && Login(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, isPasswordValid, setPasswordValid)}
                {props.type === "Enter verification code" && Verification({props, timer, setTimer, codes, setCodes})}
                {props.type === "Forgot your password?" && ForgetPassword(props, email, setEmail, isEmailValid, setEmailValid)}
                {props.type === "Reset Password" && ResetPassword(props, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid)}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}