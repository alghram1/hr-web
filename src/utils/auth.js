// JavaScript source code
export const getCurrentUserRole = () => {
    //  ÿ»Ìﬁ ÕﬁÌﬁÌ ·Ã·» «·œÊ— „‰ localStorage √Ê API
    return localStorage.getItem('userRole') || 'employee';
};