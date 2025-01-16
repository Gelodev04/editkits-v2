import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const getUserInfoFromCookies = () => {
  const data = Cookies.get('userInfo');
  return data ? JSON.parse(data) : null;
};

export const useUserInfo = () => {
  const [userInfo, setUserInfoState] = useState<any>(getUserInfoFromCookies());

  useEffect(() => {
    const handleUserInfoChange = () => {
      setUserInfoState(getUserInfoFromCookies());
    };

    window.addEventListener('userInfoChanged', handleUserInfoChange);

    return () => {
      window.removeEventListener('userInfoChanged', handleUserInfoChange);
    };
  }, []);

  return {
    userInfo,
  };
};
