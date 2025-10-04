import api from './axiosInstance';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (fullName: string, email: string, password: string) => {
  const { data } = await api.post('/auth/register', { fullName, email, password });
  return data;
};
