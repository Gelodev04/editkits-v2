import Cookies from 'js-cookie';

export const setUserInfo = (userInfo) => {
  Cookies.set('userInfo', JSON.stringify(userInfo), {
    secure: true,
    sameSite: 'Strict',
  });
  window.dispatchEvent(new Event('userInfoChanged'));
};

export const removeUserInfo = () => {
  Cookies.remove('userInfo');
  window.dispatchEvent(new Event('userInfoChanged'));
};