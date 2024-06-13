import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_API_URL } from '../settings';

export const createClient = (config: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: SERVER_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
    ...config,
  });

  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const httpClient = createClient({});