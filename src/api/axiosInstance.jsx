import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://final-backend-delta-three.vercel.app/",
 
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Return response directly if successful
  (error) => {
    console.error(error.response?.data || error.message);
    return Promise.reject(error); // Handle errors globally
  }
);

export default axiosInstance;
