import { getStringValue } from "@/hooks/getStringValue";
import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: "http://192.168.1.73:8000/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control": "Allow-Origin",
  },
});

axiosInterceptor.interceptors.request.use(
  async (config) => {
    // const accessToken = localStorage.getItem("accessToken") || "";
    const accessToken = await getStringValue("details");

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer  ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
