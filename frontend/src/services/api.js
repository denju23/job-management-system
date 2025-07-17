import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ✅ Only attach token if the request is NOT for login or registration
api.interceptors.request.use((config) => {
  const isAuthRoute =
    config.url.includes('/auth/login') || config.url.includes('/auth/register');

  if (!isAuthRoute) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});


export default api;
