import axios from 'apis/axios';
import { getToken, saveToken } from 'utils/auth';

export default function useRefreshToken() {
  async function refresh() {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    const response = await axios.post(
      '/auth/refresh-token',
      {
        refreshToken: refresh_token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.data) return null;
    saveToken(response.data.accessToken, response.data.refreshToken);

    return response.data.accessToken || '';
  }
  return refresh;
}
