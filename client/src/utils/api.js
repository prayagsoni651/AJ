import axios from 'axios';

const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
export const API_URL = IS_LOCAL ? 'http://localhost:3001' : 'https://YOUR_BACKEND_URL.onrender.com';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to add the token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
