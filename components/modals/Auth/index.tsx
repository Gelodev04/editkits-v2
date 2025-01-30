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
  getUserInfo,
  setAccessToken, useConfirmPasswordResetMutation,
  useConfirmRegisterMutation,
  useLoginMutation, useLogoutMutation, useRefreshTokenMutation,
  useRegisterMutation, useRequestPasswordResetMutation, useResendConfirmationCodeMutation
} from "@/services/api";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";
import {setUserInfo} from "@/lib/cookies";
import {
  IConfirmPasswordResetPayload, IConfirmPasswordResetResponse,
  IConfirmRegistrationPayload,
  IErrorResponse, ILoginPayload, ILoginResponse, IRefreshAccessTokenResponse,
  IRegisterPayload, IRequestPasswordResetPayload,
  IResendConfirmationCodePayload
} from "@/interfaces/api/auth";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import EmailNotConfirmedSignup from "@/components/modals/Auth/EmailNotConfirmedSignup";
import EmailNotConfirmedLogin from "@/components/modals/Auth/EmailNotConfirmedLogin";
import useLogout from "@/hooks/useLogout";
import {useRouter} from "next/router";

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

  async function handleResendConfirmationCode() {
    const resendConfirmationCodePayload: IResendConfirmationCodePayload = {
      email
    }
    const response = await resendConfirmationCode(resendConfirmationCodePayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg} = errorResponse;
      toast.error(errorMsg);
      return;
    }
    toast.success(response.data.message);
    if (props.type === "Email already registered" || props.type === "Email not verified") {
      props.setType("Enter verification code")
    }
    setTimer(60)
  }


  async function handleRegister() {
    const registerPayload: IRegisterPayload = {
      name: email,
      email,
      password
    }
    const response = await register(registerPayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg, errorCode} = errorResponse;

      if (errorCode === "11018") {
        props.setType("Email already registered")
      }

      toast.error(errorMsg);
      return
    }
    toast.success(response.data.message)
    props.setType('Enter verification code')
  }

  async function handleConfirmRegister() {
    const confirmRegisterPayload: IConfirmRegistrationPayload = {
      email,
      code: codes
    }

    const response = await confirmRegister(confirmRegisterPayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg} = errorResponse;
      toast.error(errorMsg);
      return
    }
    toast.success(response.data.message);
    props.setType("Log In");
  }

  async function handleLogin() {
    const loginPayload: ILoginPayload = {
      email,
      password
    }
    const response = await login(loginPayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg, errorCode} = errorResponse;

      if (errorCode === "11017") {
        props.setType("Email not verified")
      }

      toast.error(errorMsg);
      return;
    }

    const { id_token } = response.data as ILoginResponse;
    const user_info = jwtDecode(id_token);
    setUserInfo(user_info);

    toast.success("Login successful");
    props.setType("");
    props.setAuthModal(false);
  }


  async function refreshAccessToken() {
    const userInfo = getUserInfo();
    if (!userInfo) {
      return;
    }
    //@ts-ignore
    const response = await refreshToken();
    if (response.error) {
      await handleLogout();
      toast.success("You are logged out!");
      return
    }

    const { access_token } = response.data as IRefreshAccessTokenResponse;
    setAccessToken(access_token);
  }

  React.useEffect(() => {
    refreshAccessToken();
    const interval = setInterval(async () => {
      await refreshAccessToken();
    }, 50 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  async function handleSendResetCode() {
    const sendResetCodePayload: IRequestPasswordResetPayload = {
      email
    }
    const response = await requestPasswordReset(sendResetCodePayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg} = errorResponse;
      toast.error(errorMsg);
      return
    }

    toast.success(response.data.message);
    props.setType("Reset Password");
  }

  async function handleResetPassword() {
    const resetPasswordPayload: IConfirmPasswordResetPayload = {
      email,
      resetCode: code,
      newPassword: password
    }
    const response = await confirmPasswordReset(resetPasswordPayload);

    if (response.error) {
      const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
      const {errorMsg} = errorResponse;
      toast.error(errorMsg);
      return
    }

    const res = response.data as IConfirmPasswordResetResponse

    toast.success(res.message);
    props.setType("Log In");
  }

  return (
    <Modal open={props.showAuthModal} onClose={() => {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      props.setAuthModal(false)
    }}>
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
                {props.type === "Sign Up" && Signup(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleRegister, isLoading)}
                {props.type === "Log In" && Login(props, password, setPassword, email, setEmail, isEmailValid, setEmailValid, isPasswordValid, setPasswordValid, handleLogin, isLoginLoading)}
                {props.type === "Enter verification code" && Verification({
                  props,
                  timer,
                  email,
                  codes,
                  setCodes,
                  handleResendConfirmationCode,
                  handleConfirmRegister,
                  isConfirmRegisterLoading
                })}
                {props.type === "Forgot your password?" && ForgetPassword(props, email, setEmail, isEmailValid, setEmailValid, handleSendResetCode)}
                {props.type === "Reset Password" && ResetPassword(props, email, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, isPasswordValid, setPasswordValid, handleResetPassword)}
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