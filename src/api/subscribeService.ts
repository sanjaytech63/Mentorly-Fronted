import api from './axiosInstance';

export const subscribeApi = async (email: string): Promise<string> => {
  const response = await api.post('/subscribe', { email });
  return response.data;
};
