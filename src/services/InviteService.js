import axios from 'axios';

export async function checkInviteToken(token) {
    try {
        const res = await axios.get(`/api/invite/validate/${token}`);
        return res.data.valid;
    } catch {
        return false;
    }
}

export async function completeInvite(token, password) {
    try {
        const res = await axios.post(`/api/invite/complete`, { token, password });
        return res.data;
    } catch (err) {
        return { success: false, message: err?.response?.data?.message };
    }
}
