import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

let accessToken = 'eyJraWQiOiJRMStGT3NORGE0eXp2TEFxOUFZQVhZaXJSZkVXa3M5cUI0ZmtvckxPU01VPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMWIzYWQzYS02MDIxLTcwZmQtODFlNi1jNDAyYWMwNWRmODMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX3J1NWZWOEJDSyIsImNsaWVudF9pZCI6IjduYW1iM25hNmZmYWxwb3N2NGppbXF2MHF2Iiwib3JpZ2luX2p0aSI6IjQ4ZWJiMDVjLTY5MDMtNDBlYy1iMDk0LTFjZmQ5YjZkYTA4NCIsImV2ZW50X2lkIjoiZTkyNjdjYzQtYTk4OC00YWYyLWFlODItYTljZjk0YzcxOTIxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTc0MTg1MjEyMywiZXhwIjoxNzQxODU1NzIzLCJpYXQiOjE3NDE4NTIxMjMsImp0aSI6ImU1ZDk2ZmIyLWZjMjItNDc1Yi1hY2U5LWFjNjg2OWM3ZGYxZiIsInVzZXJuYW1lIjoiMDFiM2FkM2EtNjAyMS03MGZkLTgxZTYtYzQwMmFjMDVkZjgzIn0.XCrYFGGr4V9h3jD5h6X8qEneWRqqpjt7paPaVvjP0ZD8pPAwC_GOnYD_HCFuWoj_0cf1EQ85EO0clczColV5SgKQ_JLR_T2cawBgrH5vIS-BASJdBn-q5SqDCJOvNH8k8vC63UtJD4cFalyenPQ_i3l1eutSp3vs_2vO0LnCfd3wBJKJ3Y7NgECJs7zysD_hXvHNs_kJjjqEGlg02EH9MeRW7lXxGmBoNWBtWrJQJixVn_5G_Q4EMyoqQYe9NH1Ui1PPP1YLmaXjt8yJKbl3cDpDmSN91RyepMVdO6msQv_Kso7kG24cEd2dvnoazxtDcDTsdViVIB9RQ56aNxBcJg'

export const setAccessToken = (token) => accessToken = token;
export const getAccessToken = () => accessToken;

const setRefreshToken = (token) => Cookies.set("refreshToken", token);
export const getRefreshToken = () => Cookies.get("refreshToken");

export const getUserInfo = () => {
  const data = Cookies.get("userInfo");
  return data ? JSON.parse(data) : null;

}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API as string,
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
        const userId = getUserInfo()?.sub;

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
        const email = getUserInfo()?.email;

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
        } finally {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("userInfo");
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
          url: `/file/status?file_id=${fileId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      transformResponse: (response) => response,
    }),
    initJob: builder.mutation({
      query: (body) => {
        const access_token = getAccessToken();

        return {
          url: '/job/init',
          method: 'POST',
          body,
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      transformResponse(response) {
        return response;
      }
    }),
    commitJob: builder.mutation({
      query: ({ job_id }) => {
        const access_token = getAccessToken();

        return {
          url: '/job/commit',
          method: 'POST',
          body: {
            job_id
          },
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      transformResponse(response) {
        return response;
      }
    }),
    jobStatus: builder.query({
      query: ({ job_id }) => {
        const access_token = getAccessToken();

        return {
          url: `/job/status?job_id=${job_id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      },
      transformResponse: (response) => response,
    }),

    contactUsCommon: builder.mutation({
      query: (body) => ({
        url: '/contact/common',
        method: 'POST',
        body,
        headers: {
          "Content-Type": "application/json",
          Referer: "https://www.editkits.com/",
          Origin: "https://www.editkits.com/",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
        }
      }),
      transformResponse: (response) => response,
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

    getBlogs: builder.query({
      query: () => ({
        url: '/blogs?limit=12&offset=0',
        method: 'GET',
      }),
      transformResponse: (response) => response,
    }),
    getArticle: builder.query({
      query: ({slug}) => {
        return {
          url: `/blog/entry?slug=${slug}`,
          method: 'GET',
        }
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    getPlans: builder.query({
      query: ({}) => ({
        url: '/subscription/plans',
        method: 'GET'
      }),
      transformResponse: (response) => response
    })
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

  useInitJobMutation,
  useCommitJobMutation,
  useJobStatusQuery,

  useContactUsCommonMutation,
  useContactUsUserMutation,

  useGetBlogsQuery,
  useGetArticleQuery,

  useGetPlansQuery
} = api;
