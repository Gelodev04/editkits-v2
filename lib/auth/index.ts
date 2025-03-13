import {
  IConfirmPasswordResetPayload, IConfirmPasswordResetResponse,
  IConfirmRegistrationPayload,
  IErrorResponse,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload, IRequestPasswordResetPayload,
  IResendConfirmationCodePayload
} from "@/interfaces/api/auth";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";
import {setUserInfo} from "@/lib/cookies";

export async function handleLogin(email, password, login, setType, setAuthModal, setModalTitle, setModalMessage, setAuthConfirmationModal) {
  const loginPayload: ILoginPayload = {
    email,
    password
  }
  const response = await login(loginPayload);

  if (response.error) {
    const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
    const {errorMsg, errorCode} = errorResponse;

    if (errorCode === "11017") {
      setType("Email not verified")
    }

    setModalTitle("Uh-oh! Something's Off");
    setModalMessage(errorMsg);
    setAuthConfirmationModal(true);
    setType("");
    setAuthModal(false);
    return;
  }

  const {id_token} = response.data as ILoginResponse;
  const user_info = jwtDecode(id_token);
  setUserInfo(user_info);

  toast.success("Login successful");
  setType("");
  setAuthModal(false);
}

export async function handleResendConfirmationCode(email, type, setTimer, setType, resendConfirmationCode, setModalTitle, setAuthConfirmationModal,setModalMessage, setAuthModal) {
  const resendConfirmationCodePayload: IResendConfirmationCodePayload = {
    email
  }
  const response = await resendConfirmationCode(resendConfirmationCodePayload);

  if (response.error) {
    const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
    const {errorMsg} = errorResponse;

    setModalTitle("Uh-oh! Something's Off");
    setModalMessage(errorMsg);
    setAuthConfirmationModal(true);
    setType("");
    setAuthModal(false);
    return;
  }
  toast.success(response.data.message);
  if (type === "Email already registered" || type === "Email not verified") {
    setType("Enter verification code")
  }
  setTimer(60)
}

export async function handleRegister(email, password, setType, register, setAuthModal, setModalTitle, setModalMessage, setAuthConfirmationModal) {
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
      setType("Email already registered")
    }

    setModalTitle("Uh-oh! Something's Off");
    setModalMessage(errorMsg);
    setAuthConfirmationModal(true);
    setType("");
    setAuthModal(false);
    return
  }
  toast.success(response.data.message)
  setType('Enter verification code')
}

export async function handleConfirmRegister(email, codes, confirmRegister, setType) {
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
  setType("Log In");
}

export async function handleResetPassword(email, code, password, confirmPasswordReset, setType, setModalTitle, setModalMessage, setAuthConfirmationModal, setAuthModal) {
  const resetPasswordPayload: IConfirmPasswordResetPayload = {
    email,
    resetCode: code,
    newPassword: password
  }
  const response = await confirmPasswordReset(resetPasswordPayload);

  if (response.error) {
    const errorResponse = (response.error as FetchBaseQueryError).data as IErrorResponse;
    const {errorMsg} = errorResponse;

    setModalTitle("Uh-oh! Something's Off");
    setModalMessage(errorMsg);
    setAuthConfirmationModal(true);
    setType("");
    setAuthModal(false);

    return
  }

  const res = response.data as IConfirmPasswordResetResponse

  toast.success(res.message);
  setType("Log In");
}

export async function handleSendResetCode(email, requestPasswordReset, setType) {
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
  setType("Reset Password");
}