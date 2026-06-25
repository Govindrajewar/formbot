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

export default axiosInstance;
