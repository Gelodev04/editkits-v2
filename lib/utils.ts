import toast from "react-hot-toast";

import {getUserInfo, setAccessToken} from "@/services/api";
import { IRefreshAccessTokenResponse } from "@/interfaces/api/auth";

export async function refreshAccessToken(refreshToken, handleLogout) {
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