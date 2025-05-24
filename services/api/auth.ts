import Cookies from 'js-cookie';

import { api } from './index';
import { setAccessToken, setRefreshToken, getRefreshToken, getUserInfo, getAccessToken } from './index';

export const authApi = api.injectEndpoints({
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
      transformResponse(response) {
        // @ts-ignore
        setAccessToken(response.access_token);
        // @ts-ignore
        setRefreshToken(response.refresh_token);
        return response;
      },
    }),
    refreshToken: builder.mutation({
      query: () => {
        const refresh_token = getRefreshToken();
        const userId = getUserInfo()?.sub;

        return {
          url: '/auth/refresh_token',
          method: 'POST',
          body: { refresh_token, id: userId },
        };
      },
    }),
    // confirm password
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
    logout: builder.mutation({
      query: () => {
        const refresh_token = getRefreshToken();
        const access_token = getAccessToken();
        const email = getUserInfo()?.email;

        return {
          url: '/auth/logout',
          method: 'POST',
          body: { refresh_token, email },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          Cookies.remove('userInfo');
        }
      },
    }),
    contactUsUser: builder.mutation({
      query: (body) => {
        const access_token = getAccessToken();

        return {
          url: '/contact/user',
          method: 'POST',
          body,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }},
      transformResponse: (response) => response,
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
  }),
});

export const {
  useRegisterMutation,
  useConfirmRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useConfirmPasswordResetMutation,
  useRequestPasswordResetMutation,
  useResendConfirmationCodeMutation,
  useLogoutMutation,
  useContactUsUserMutation,
  useUpdatePasswordMutation
} = authApi;
