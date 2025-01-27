export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  message: string;
  user: null
}

export interface IConfirmRegistrationPayload {
  email: string;
  code: string
}
export interface IConfirmRegistrationResponse {
  message: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number
}

export interface IRefreshAccessTokenPayload {
  refresh_token: string;
  id: string;
}

export interface IRefreshAccessTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
}

export interface IResendConfirmationCodePayload {
  email: string;
}

export interface IResendConfirmationCodeResponse {
  message: string;
}

export interface IRequestPasswordResetPayload {
  email: string;
}

export interface IRequestPasswordResetResponse {
  message: string;
}

export interface IConfirmPasswordResetPayload {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface IConfirmPasswordResetResponse {
  message: string;
}

export interface ILogoutPayload {
  refresh_token: string;
  email: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IUpdatePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface IUpdatePasswordResponse {
  message: string
}

export interface IErrorResponse {
  requestId: null;
  timestamp: string;
  statusCode: number;
  errorCode: string;
  errorMsg: string;
  errorLog: null;
}