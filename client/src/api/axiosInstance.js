import axios from "axios";
import { BACKEND_URL } from "../deploymentLink";

const axiosInstance = axios.create({ baseURL: BACKEND_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("formBotToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("formBotToken");
      localStorage.removeItem("formBotCurrentUser");
      const homePath = `${process.env.PUBLIC_URL}/`;
      if (window.location.pathname !== homePath) {
        window.location.href = homePath;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
