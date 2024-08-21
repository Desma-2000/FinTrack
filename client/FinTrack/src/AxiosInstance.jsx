// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fintrack-19.onrender.com', // Your backend base URL
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors without logging sensitive information
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
