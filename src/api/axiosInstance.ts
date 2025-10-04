import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const { setTokens, logout } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // const { data } = await api.post("/auth/refresh", { refreshToken });
        // setTokens(data.accessToken, data.refreshToken);
        // api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
