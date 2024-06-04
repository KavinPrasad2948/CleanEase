import axios from 'axios';
import { getToken } from './jwt';

const instance = axios.create({
  baseURL: 'https://cleanease-backend.onrender.com/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
