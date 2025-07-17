import api from './api'; // this is your axios instance with interceptor

export const getAllUsers = async () => {
  const res = await api.get('/auth/users');
  return res.data;
};