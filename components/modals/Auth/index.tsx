import React, {useState} from "react";
import {Fade, Modal} from "@mui/material";
import Signup from "@/components/modals/Auth/Signup";
import Login from "@/components/modals/Auth/Login";
import {TbXboxX} from "react-icons/tb";
import Verification from "@/components/modals/Auth/Verification";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import {lato, montserrat, opensans} from "@/lib/fonts";
import {useCountdownTimer} from "@/hooks/useCountdownTimer";
import {
  useConfirmPasswordResetMutation,
  useConfirmRegisterMutation,
  useLoginMutation, useLogoutMutation, useRefreshTokenMutation,
  useRegisterMutation, useRequestPasswordResetMutation, useResendConfirmationCodeMutation
} from "@/services/api";

import EmailNotConfirmedSignup from "@/components/modals/Auth/EmailNotConfirmedSignup";
import EmailNotConfirmedLogin from "@/components/modals/Auth/EmailNotConfirmedLogin";
import useLogout from "@/hooks/useLogout";
import {useRouter} from "next/router";
import {refreshAccessToken} from "@/lib/utils";
import {
  handleConfirmRegister,
  handleLogin,
  handleRegister,
  handleResendConfirmationCode,
  handleResetPassword, handleSendResetCode
} from "@/lib/auth";


export type AuthModalProps = {
  type: string;
  showAuthModal: boolean;
  setAuthModal: (e: React.SetStateAction<boolean>) => void;
  setType: (e: React.SetStateAction<string>) => void;
  description?: string;
}

export default function AuthModal(props: AuthModalProps) {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const [register, {isLoading}] = useRegisterMutation();
  const [confirmRegister, {isLoading: isConfirmRegisterLoading}] = useConfirmRegisterMutation();
  const [login, {isLoading: isLoginLoading}] = useLoginMutation();
  const [refreshToken] = useRefreshTokenMutation();
  const [resendConfirmationCode] = useResendConfirmationCodeMutation();
  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [confirmPasswordReset] = useConfirmPasswordResetMutation();

  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codes, setCodes] = useState("")
  const [isPasswordValid, setPasswordValid] = useState(false);
  const {timer, setTimer} = useCountdownTimer(60);

  const handleLogout = useLogout(router, logout)

  React.useEffect(() => {
    if (!props.showAuthModal) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCode("")
      setCodes("")
    }
  }, [props.showAuthModal]);

  React.useEffect(() => {
    refreshAccessToken(refreshToken, handleLogout);
    const interval = setInterval(async () => {
      await refreshAccessToken(refreshToken, handleLogout);
    }, 50 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Modal open={props.showAuthModal} onClose={() => {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      props.setAuthModal(false)
    }}>
      <Fade in={props.showAuthModal}>
        {/*@ts-ignore*/}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          bgcolor: 'background.paper',
          //@ts-ignore
          boxShadow: 24,
          p: 4
        }}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg `}>
                <div className="absolute right-2 top-2 cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setAuthModal(false)}/>
                </div>
                {props.type === "Sign Up" && Signup(props.type,props.setType, password, setPassword, email, setEmail, isEmailValid, setEmailValid, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleRegister, register, isLoading )}
                {props.type === "Log In" && Login(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, isPasswordValid, setPasswordValid, handleLogin, isLoginLoading, login, props.setType, props.setAuthModal)}
                {props.type === "Enter verification code" && Verification(
                  props.type,
                  props.setType,
                  timer,
                  email,
                  codes,
                  setCodes,
                  handleResendConfirmationCode,
                  handleConfirmRegister,
                  isConfirmRegisterLoading,
                  setTimer,
                  resendConfirmationCode,
                  confirmRegister
                )}
                {props.type === "Forgot your password?" && ForgetPassword(props.type, props.setType, email, setEmail, isEmailValid, setEmailValid, handleSendResetCode, requestPasswordReset)}
                {props.type === "Reset Password" && ResetPassword(props.type, email, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleResetPassword, confirmPasswordReset, props.setType)}
                {props.type === "Email already registered" && EmailNotConfirmedSignup(props, email, setEmail, isEmailValid, setEmailValid, handleResendConfirmationCode)}
                {props.type === "Email not verified" && EmailNotConfirmedLogin(props, email, setEmail, isEmailValid, setEmailValid, handleResendConfirmationCode)}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}