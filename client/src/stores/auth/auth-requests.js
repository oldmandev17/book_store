const { default: axios } = require('apis/axios');

export const requestAuthSignup = (data) => {
  return axios.post('/auth/register', { ...data });
};

export const requestAuthLogin = (data) => {
  return axios.post('/auth/login', { ...data });
};

export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get('/auth/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post(
    '/auth/refresh-token',
    {
      refreshToken: token,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const requestAuthLogout = (token) => {
  if (!token) return;
  return axios.delete(`/auth/logout/${token}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
