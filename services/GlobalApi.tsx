import axios from "axios";
import { getLocalItem, deleteLocalItem } from "./secureStorage";
import { APIURL } from "./APIURL";
import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: APIURL,
  timeout: 10000, // Set a timeout of 10 seconds
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await getLocalItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    // Handle response errors
    if (error.response) {
      console.error("Response error:", error.response.data);

      // Check for 401 Unauthorized error
      if (error.response.status === 401) {
        console.warn("Unauthorized: Removing token and redirecting to signin.");
        await deleteLocalItem("userToken");
        router.push("/auth/signin");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
