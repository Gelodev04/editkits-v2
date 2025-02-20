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

import EmailNotVerified from "@/components/modals/Auth/EmailNotVerified";
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
import Typography from "@/components/Typography";
import {getModalDescription} from "@/lib/getModalDescription";


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

  const [hasTyped, setHasTyped] = React.useState(false);

  const handleLogout = useLogout(router, logout)

  React.useEffect(() => {
    if (!props.showAuthModal) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCode("")
      setCodes("");
    }
  }, [props.showAuthModal]);

  React.useEffect(() => {
    setHasTyped(false)
  },[props.type])

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
      setHasTyped(false)
    }}>
      <Fade in={props.showAuthModal}>
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <div
                className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[532px]`}>
                <div className="absolute right-[14px] top-[14px] cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setAuthModal(false)}/>
                </div>
                <div className="bg-white text-center pt-[32px]">
                  <div className="pb-[8px]">
                    <Typography label={props.type} center variant="h4" />
                  </div>
                  <div className="w-[432px] mx-auto">
                    <Typography label={getModalDescription(props.type, email)} center variant="b3" />
                  </div>
                </div>
                {props.type === "Sign Up" && Signup(props.type,props.setType, password, setPassword, email, setEmail, isEmailValid, setEmailValid, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleRegister, register, isLoading, hasTyped, setHasTyped )}
                {props.type === "Log In" && Login(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, isPasswordValid, setPasswordValid, handleLogin, isLoginLoading, login, props.setType, props.setAuthModal, hasTyped, setHasTyped)}
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
                  confirmRegister,
                  hasTyped,
                  setHasTyped
                )}
                {props.type === "Forgot your password?" && ForgetPassword(props.type, props.setType, email, setEmail, isEmailValid, setEmailValid, handleSendResetCode, requestPasswordReset, hasTyped, setHasTyped)}
                {props.type === "Reset Password" && ResetPassword(props.type, email, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleResetPassword, confirmPasswordReset, props.setType, hasTyped, setHasTyped)}
                {props.type === "Email already registered" && EmailNotVerified(props, email, setEmail, isEmailValid, setEmailValid, handleResendConfirmationCode, hasTyped, setHasTyped)}
                {props.type === "Email not verified" && EmailNotVerified(props, email, setEmail, isEmailValid, setEmailValid, handleResendConfirmationCode, hasTyped, setHasTyped)}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}