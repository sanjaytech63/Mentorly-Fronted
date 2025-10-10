import { RegisterData, AuthResponse } from '../types/authTypes';
import api from './axiosInstance';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (formData: RegisterData): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<any> => {
  const { data } = await api.post('/auth/change-password', { oldPassword, newPassword });
  return data;
};

export const getCurrentUser = async (): Promise<any> => {
  const { data } = await api.get('/auth/get-current-user');
  return data;
};

export const updateProfile = async (fullName: string, email: string): Promise<any> => {
  const { data } = await api.patch('/auth/update-accound-details', { fullName, email });
  return data;
};

export const updateAvatar = async (formData: FormData): Promise<any> => {
  const { data } = await api.patch('/auth/update-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const createBlogs = async (formData: RegisterData): Promise<AuthResponse> => {
  const { data } = await api.post('/blogs/create', formData);
  return data;
};
