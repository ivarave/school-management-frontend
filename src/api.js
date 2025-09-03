import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    const url = config.url || "";
    const skipAuth =
      url.includes("/token/") ||
      url.includes("/register/");

    if (token && !skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
          throw new Error("No refresh token found");
        }

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
          refresh,
        });

        if (res.status === 200) {
          const newAccess = res.data.access;
          localStorage.setItem(ACCESS_TOKEN, newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
