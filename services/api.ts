import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { name, email, password },
      }),
    }),
    confirmRegister: builder.mutation({
      query: ({ email, code }) => ({
        url: '/auth/confirm_register',
        method: 'POST',
        body: { email, code },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    refreshToken: builder.mutation({
      query: ({ refresh_token, id }) => ({
        url: '/auth/refresh_token',
        method: 'POST',
        body: { refresh_token, id },
      }),
    }),
    resendConfirmationCode: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/resend_confirmation_code',
        method: 'POST',
        body: { email },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/request_password_reset',
        method: 'POST',
        body: { email },
      }),
    }),
    confirmPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/confirm_password_reset',
        method: 'POST',
        body: { email },
      }),
    }),
    logout: builder.mutation({
      query: ({ refresh_token, email }) => ({
        url: '/auth',
        method: 'POST',
        body: { refresh_token, email },
      }),
    }),
    upload: builder.mutation({
      query: ({ file_name, mime_type, ext, content_length }) => ({
        url: '/file/upload',
        method: 'POST',
        body: { file_name, mime_type, ext, content_length },
      }),
    }),
    status: builder.query({
      query: ({ field }) => ({
        url: `/file/status?field=${field}`,
        method: 'GET',
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useRegisterMutation,
  useConfirmRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useResendConfirmationCodeMutation,
  useRequestPasswordResetMutation,
  useConfirmPasswordResetMutation,
  useLogoutMutation,
  useUploadMutation,
  useStatusQuery,
} = api;
