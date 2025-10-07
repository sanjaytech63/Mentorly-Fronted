import api from './axiosInstance';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (formData: FormData) => {
  const { data } = await api.post('/auth/register', formData);
  return data;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const { data } = await api.post("/auth/change-password", { oldPassword, newPassword });
  return data;
}

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/get-current-user");
  return data;
}

export const updatePfofile = async (fullName: string, email: string) => {
  const { data } = await api.patch("/auth/update-accound-details", { fullName, email })
  return data;
}

export const updateAvatar = async (formData: FormData) => {
  const { data } = await api.patch("/auth/update-avatar", formData);
  return data;
};


export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};