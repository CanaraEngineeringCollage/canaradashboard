import axios from "axios";

// Shared Axios instance with global unauthorized handling
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message: string | undefined = error?.response?.data?.message;

    const tokenError = typeof message === "string" && /unauthori(?:s|z)ed|token/i.test(message);

    if (status === 401 || status === 403 || tokenError) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
