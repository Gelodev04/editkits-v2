import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export const setAccessToken = (token) => {
  Cookies.set("accessToken", token, {
    secure: true,
    sameSite: 'Strict'
  });
};

export const getAccessToken = () => Cookies.get("accessToken");

export const setRefreshToken = (token) => Cookies.set("refreshToken", token, {
  secure: true,
  sameSite: 'Strict'
});

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
  tagTypes: ['Stats', 'Files', 'Jobs'],
  endpoints: () => ({}),
});

