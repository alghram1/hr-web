// src/contexts/SessionContext.jsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback
} from 'react';
import axios from '../services/axiosInstance';

// ✅ إنشاء السياق
const SessionContext = createContext();

// ✅ مزود الجلسة
export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null); // null → حالة عدم التحميل
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ تحميل الجلسة من الـ API
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await axios.get('/api/session/current');

                setSession({
                    userId: data.userId,
                    userName: data.userName,
                    email: data.email,
                    roleId: data.roleId,
                    roleName: data.roleName,
                    roles: data.roles || [],
                    permissions: data.permissions || [],
                    companyId: data.companyId,
                    companyName: data.companyName,
                    branchId: data.branchId,
                    branchName: data.branchName,
                    facilityId: data.facilityId,
                    facilityName: data.facilityName,
                    language: data.language || 'ar',
                    isAuthenticated: data.isAuthenticated ?? true,
                    isAdmin: data.isAdmin ?? false,
                });
            } catch (err) {
                console.error('❌ فشل تحميل الجلسة:', err);
                setError(err);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    // ✅ هل يملك صلاحية محددة؟
    const hasPermission = useCallback(
        (code) => session?.permissions?.includes(code),
        [session]
    );

    // ✅ هل يمتلك الدور المعين؟
    const hasRole = useCallback(
        (role) => session?.roles?.includes(role),
        [session]
    );

    // ✅ هل هو أدمن في محادثة معينة؟
    const isAdminInChat = useCallback(
        (chatInfo) => {
            return chatInfo?.participants?.some(
                (p) => p.id === session?.userId && p.isAdmin
            );
        },
        [session?.userId]
    );

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            loading,
            error,
            hasPermission,
            hasRole,
            isAdminInChat,
        }}>
            {children}
        </SessionContext.Provider>
    );
};

// ✅ هوك للاستخدام في أي مكون
export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) throw new Error('useSession must be used within a SessionProvider');
    return context;
};
