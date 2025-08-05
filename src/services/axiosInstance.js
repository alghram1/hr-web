import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // ← تأكد من أن هذا هو نفس بورت الـ API
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
