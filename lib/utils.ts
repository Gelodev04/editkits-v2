import toast from 'react-hot-toast';

import { IRefreshAccessTokenResponse } from '@/interfaces/api/auth';
import { getUserInfo, setAccessToken } from '@/services/api';

export async function refreshAccessToken(refreshToken, handleLogout) {
  const userInfo = getUserInfo();
  if (!userInfo) {
    return;
  }
  //@ts-ignore
  const response = await refreshToken();
  if (response.error) {
    await handleLogout();
    toast.success('You are logged out!');
    return;
  }

  const { access_token } = response.data as IRefreshAccessTokenResponse;
  setAccessToken(access_token);
}

export function convertToNoCookieUrl(url) {
  return url.replace('www.youtube.com/watch?v=', 'www.youtube-nocookie.com/embed/');
}

export function truncateFileName(fileName: string, maxLength: number = 20): string {
  if (!fileName) return '';
  if (fileName.length <= maxLength) {
    return fileName;
  }
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.substring(
    0,
    maxLength - 3 - (extension ? extension.length + 1 : 0)
  );
  return `${truncatedName}...${extension ? '.' + extension : ''}`;
}

export function downloadFile(url: string, filename: string): void {
  if (!url) {
    console.error('Download failed: URL is invalid or missing.');
    return;
  }
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to initiate download:', error);
  }
}
