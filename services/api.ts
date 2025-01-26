import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';


export const setAccessToken = (token) => Cookies.set("accessToken", token);
const getAccessToken = () => Cookies.get("accessToken");

const setRefreshToken = (token) => Cookies.set("refreshToken", token);
export const getRefreshToken = () => Cookies.get("refreshToken");

export const getUserInfo = () => {
  const data = Cookies.get("userInfo");
  return data ? JSON.parse(data) : null
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({name, email, password}) => ({
        url: '/auth/register',
        method: 'POST',
        body: {name, email, password},
      }),
    }),
    confirmRegister: builder.mutation({
      query: ({email, code}) => ({
        url: '/auth/confirm_register',
        method: 'POST',
        body: {email, code},
      }),
    }),
    login: builder.mutation({
      query: ({email, password}) => ({
        url: '/auth/login',
        method: 'POST',
        body: {email, password},
      }),
      transformResponse(response) {
        //@ts-ignore
        setAccessToken(response.access_token);
        //@ts-ignore
        setRefreshToken(response.refresh_token)
        return response;
      }
    }),
    refreshToken: builder.mutation({
      query: () => {
        const refresh_token = getRefreshToken();
        const userId = getUserInfo().sub;

        return {
          url: '/auth/refresh_token',
          method: 'POST',
          body: {refresh_token, id: userId},
        }
      },
      transformResponse(response) {
        return response;
      }
    }),
    resendConfirmationCode: builder.mutation({
      query: ({email}) => ({
        url: '/auth/resend_confirmation_code',
        method: 'POST',
        body: {email},
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({email}) => ({
        url: '/auth/request_password_reset',
        method: 'POST',
        body: {email},
      }),
    }),
    confirmPasswordReset: builder.mutation({
      query: ({email, resetCode, newPassword}) => ({
        url: '/auth/confirm_password_reset',
        method: 'POST',
        body: {email, resetCode, newPassword},
      }),
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      }
    }),
    logout: builder.mutation({
      query: () => {
        const refresh_token = getRefreshToken();
        const access_token = getAccessToken();
        const email = getUserInfo().email;

        return {
          url: '/auth/logout',
          method: 'POST',
          body: {refresh_token, email},
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;

          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("userInfo");

        } catch (error) {
          console.error("Failed to log out:", error);
        }
      },

      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      }
    }),
    updatePassword: builder.mutation({
      query: ({current_password, new_password}) => {
        const access_token = getAccessToken();

        return {
          url: '/auth/update_password',
          method: 'POST',
          body: {current_password, new_password},
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue
      }
    }),
    upload: builder.mutation({
      query: ({file_name, mime_type, ext, content_length}) => {
        const access_token = getAccessToken();

        return {
          url: '/file/upload',
          method: 'POST',
          body: {file_name, mime_type, ext, content_length},
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
    }),
    status: builder.query({
      query: ({fileId}) => {
        const access_token = getAccessToken();

        return {
          url: `/file/status?fileId=${fileId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
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
  useUpdatePasswordMutation,
  useUploadMutation,
  useStatusQuery,
} = api;
