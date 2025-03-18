import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

let accessToken = null;

export const setAccessToken = (token) => accessToken = token;
export const getAccessToken = () => accessToken;

export const setRefreshToken = (token) => Cookies.set("refreshToken", token);
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
  endpoints: () => ({}),
});

