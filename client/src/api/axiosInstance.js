import axios from "axios";

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

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
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
