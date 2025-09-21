import React, { Children, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  let [loading, setLoading] = useState(false);

  // Global axios interceptors for error handling
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);

        if (error.code === "ERR_NETWORK") {
          toast.error("Network error: Unable to connect to server");
        } else if (error.response?.status === 500) {
          toast.error("Server error: Please try again later");
        } else if (error.response?.status === 404) {
          toast.error("Resource not found");
        } else if (error.response?.status === 401) {
          toast.error("Unauthorized: Please login again");
        } else if (error.response?.status === 403) {
          toast.error("Access denied");
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  let value = {
    serverUrl,
    loading,
    setLoading,
  };
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
