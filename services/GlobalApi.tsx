import axios from "axios";
import { getLocalItem } from "./secureStorage";
import { APIURL } from "./APIURL";

const axiosInstance = axios.create({
  baseURL: APIURL,
  timeout: 10000, // Set a timeout of 10 seconds
});

axiosInstance.interceptors.request.use(
  async (config) => {
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
  (error) => {
    // Handle response errors
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;