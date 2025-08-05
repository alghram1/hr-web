import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    getChatById,
    updateChatInfo,
    getOrCreatePrivateChat
} from '../services/ChatService';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from './SessionContext';

// ✅ إنشاء السياق
const ChatContext = createContext();

// ✅ مزود السياق
export const ChatProvider = ({ children }) => {
    const [chatInfo, setChatInfo] = useState(null);
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [chatError, setChatError] = useState(null);
    const [scrollOnLoad, setScrollOnLoad] = useState(true); // ✅ تحكم في سلوك التمرير

    const { session } = useSession();
    const tenantId = session?.tenantId;
    const currentUserId = session?.userId;

    /**
     * ✅ إثراء معلومات المشاركين من Firestore
     */
    const enrichParticipants = async (tenantId, participants) => {
        return await Promise.all(participants.map(async (p) => {
            try {
                const userDoc = await getDoc(doc(db, `tenants/${tenantId}/users/${p.id}`));
                const userData = userDoc.exists() ? userDoc.data() : {};
                return {
                    ...p,
                    name: userData.fullName || userData.FullName || userData.name || 'غير معروف',
                    userName: userData.userName || userData.UserName || '',
                    role: userData.role || 'employee',
                    isHidden: userData.isHidden || false
                };
            } catch {
                return { ...p, name: 'غير معروف' };
            }
        }));
    };

    /**
     * ✅ تحميل محادثة وتحديث الحالة مع خيار التمرير التلقائي
     */
    const loadChatById = useCallback(async (tenantId, chatId, { autoScroll = true } = {}) => {
        if (!tenantId || !chatId) {
            setChatError('معرّف الشركة أو المحادثة غير صالح');
            return;
        }

        if (chatInfo?.id === chatId) return;

        setIsLoadingChat(true);
        setChatError(null);
        setScrollOnLoad(autoScroll); // ✅ تفعيل/تعطيل التمرير حسب الحاجة

        try {
            const chat = await getChatById({ tenantId, chatId });
            if (chat) {
                const enrichedParticipants = await enrichParticipants(tenantId, chat.participants || []);
                setChatInfo({
                    ...chat,
                    id: chatId,
                    participants: enrichedParticipants,
                    isGroup: chat.type === 'group',
                    isPrivate: chat.type === 'private',
                    isDeletedForMe: chat.deletedFor?.includes(currentUserId)
                });
            } else {
                setChatInfo(null);
            }
        } catch (err) {
            console.error('❌ فشل تحميل المحادثة:', err);
            setChatError(err.message || 'حدث خطأ أثناء تحميل المحادثة');
        } finally {
            setIsLoadingChat(false);
        }
    }, [chatInfo, currentUserId]);

    /**
     * ✅ بدء محادثة خاصة مع مستخدم جديد (مع تمرير تلقائي افتراضي)
     */
    const startPrivateChatWithUser = useCallback(async ({ tenantId, currentUserId, selectedUser }) => {
        try {
            if (selectedUser.isHidden) {
                setChatError('لا يمكن مراسلة هذا المستخدم.');
                return;
            }

            setIsLoadingChat(true);
            const { chatId } = await getOrCreatePrivateChat({ tenantId, currentUserId, selectedUser });
            await loadChatById(tenantId, chatId, { autoScroll: true });
        } catch (err) {
            console.error('❌ فشل بدء المحادثة الخاصة:', err);
            setChatError('فشل بدء المحادثة');
        } finally {
            setIsLoadingChat(false);
        }
    }, [loadChatById]);

    /**
     * ✅ تحديث معلومات المحادثة في Firestore وفي الذاكرة
     */
    const updateChat = useCallback(async (tenantId, chatId, updates) => {
        try {
            await updateChatInfo({ tenantId, chatId, updates });

            setChatInfo(prev => {
                if (!prev || prev.id !== chatId) return prev;
                return {
                    ...prev,
                    ...updates,
                    participants: updates.participants || prev.participants
                };
            });
        } catch (err) {
            console.error('❌ فشل تحديث المحادثة:', err);
            throw err;
        }
    }, []);

    /**
     * ✅ تنظيف الحالة (عند تسجيل الخروج أو تبديل المستخدم)
     */
    const clearChat = () => {
        setChatInfo(null);
        setChatError(null);
        setIsLoadingChat(false);
    };

    return (
        <ChatContext.Provider value={{
            chatInfo,
            setChatInfo,
            isLoadingChat,
            chatError,
            loadChatById,
            updateChat,
            startPrivateChatWithUser,
            clearChat,
            scrollOnLoad,
            setScrollOnLoad
        }}>
            {children}
        </ChatContext.Provider>
    );
};

// ✅ هوك للوصول إلى السياق
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export { ChatContext };
