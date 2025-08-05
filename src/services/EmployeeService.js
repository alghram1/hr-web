// services/EmployeeService.js
import axios from './axiosInstance';

export const createEmployee = async (payload) => {
    const response = await axios.post('/api/employees', payload);
    return response.data;
};

export const checkEmailExists = async (email) => {
    const response = await axios.get('/api/employees/check-email', {
        params: { email }
    });
    return response.data.exists;
};

export const checkUsernameExists = async (userName) => {
    try {
        const res = await axios.get(`/api/employees/check-username?userName=${encodeURIComponent(userName)}`);
        return res.data.exists;
    } catch (err) {
        console.error('❌ خطأ أثناء التحقق من اسم المستخدم:', err);
        return false;
    }
};




export const getEmployees = async (search = '', status = 'الكل') => {
    const response = await axios.get('/api/employees', {
        params: { search, status }
    });
    return response.data;
};


export const getEmployeeById = async (id) => {
    const response = await axios.get(`/api/employees/${id}`);
    return response.data;
};

