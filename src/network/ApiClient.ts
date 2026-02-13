import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});



axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Access_Token");

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);



axiosClient.interceptors.response.use(
  (response:any) => response.data,
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data,
    });
  }
);

export default axiosClient;