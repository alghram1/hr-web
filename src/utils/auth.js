// JavaScript source code
export const getCurrentUserRole = () => {
    // ����� ����� ���� ����� �� localStorage �� API
    return localStorage.getItem('userRole') || 'employee';
};