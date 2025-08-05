import { db } from '../firebase';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';

/**
 * 🔹 أداة مقارنة دقيقة للمحادثات الخاصة
 */
const areSamePrivateChat = (participants, id1, id2) => {
    const ids = (participants || []).map(p => p.id).sort();
    const compare = [id1, id2].sort();
    return ids.length === 2 && ids[0] === compare[0] && ids[1] === compare[1];
};

/**
 * ✅ إنشاء محادثة جديدة (خاصة أو جماعية)
 */
export const createChat = async ({
    tenantId,
    participants,
    type = 'private',
    visibility = 'department_only',
    restrictedTo = [],
    createdBy,
    chatName = '',
    name = '',
    description = ''
}) => {
    try {
        if (!tenantId || !participants?.length || !createdBy) {
            throw new Error('بيانات إنشاء المحادثة غير مكتملة.');
        }

        const chatRef = doc(collection(db, `tenants/${tenantId}/chats`));
        const participantIds = participants.map(p => p.id);

        await setDoc(chatRef, {
            participants,
            participantIds,
            type,
            visibility,
            restrictedTo,
            createdBy,
            createdAt: serverTimestamp(),
            chatName: chatName || name || '',
            name: name || chatName || '',
            description,
            deletedFor: [],
            lastMessage: null,
            isSystemGenerated: false
        });

        return chatRef.id;
    } catch (error) {
        console.error('❌ فشل في إنشاء المحادثة:', error);
        throw error;
    }
};

/**
 * ✅ جلب محادثة خاصة بين مستخدمين أو إنشاؤها إن لم توجد
 */
export const getOrCreatePrivateChat = async ({ tenantId, currentUserId, selectedUser }) => {
    try {
        if (!tenantId || !currentUserId || !selectedUser?.id) {
            throw new Error('بيانات غير مكتملة لإنشاء المحادثة الخاصة.');
        }

        if (selectedUser.isHidden) {
            throw new Error('لا يمكن مراسلة هذا المستخدم.');
        }

        const chatsRef = collection(db, `tenants/${tenantId}/chats`);
        const q = query(
            chatsRef,
            where('type', '==', 'private'),
            where('participantIds', 'array-contains', currentUserId)
        );

        const snapshot = await getDocs(q);

        const existing = snapshot.docs.find(docSnap => {
            const data = docSnap.data();
            return areSamePrivateChat(data.participants, currentUserId, selectedUser.id);
        });

        if (existing) {
            return { chatId: existing.id, isNew: false };
        }

        const newChat = {
            participants: [
                { id: currentUserId, isAdmin: true },
                { id: selectedUser.id, isAdmin: false }
            ],
            createdBy: currentUserId,
            tenantId,
            chatName: selectedUser.fullName || selectedUser.FullName || '',
            description: ''
        };

        const chatId = await createChat({
            ...newChat,
            tenantId,
            type: 'private',
            visibility: 'membersOnly'
        });

        return { chatId, isNew: true };
    } catch (error) {
        console.error('❌ فشل في التحقق أو إنشاء المحادثة:', error);
        throw error;
    }
};

/**
 * ✅ تحديث بيانات محادثة (اسم، وصف، مشاركين، صلاحيات)
 */
export const updateChatInfo = async ({ tenantId, chatId, updates = {} }) => {
    try {
        if (!tenantId || !chatId) {
            throw new Error('معرّف الشركة أو المحادثة غير صالح.');
        }

        const chatRef = doc(db, `tenants/${tenantId}/chats/${chatId}`);
        const finalUpdates = { ...updates };

        if (updates.participants) {
            finalUpdates.participantIds = updates.participants.map(p => p.id);
        }

        await updateDoc(chatRef, finalUpdates);
    } catch (error) {
        console.error('❌ فشل في تحديث المحادثة:', error);
        throw error;
    }
};

/**
 * ✅ جلب محادثة حسب المعرّف
 */
export const getChatById = async ({ tenantId, chatId }) => {
    try {
        if (!tenantId || !chatId) return null;

        const ref = doc(db, `tenants/${tenantId}/chats/${chatId}`);
        const snap = await getDoc(ref);
        return snap.exists() ? { id: chatId, ...snap.data() } : null;
    } catch (error) {
        console.error('❌ فشل في جلب المحادثة:', error);
        throw error;
    }
};

/**
 * ✅ جلب تفاصيل المشاركين بدقة
 */
export const fetchChatParticipants = async ({ tenantId, participants }) => {
    try {
        if (!tenantId || !participants?.length) return [];

        const results = await Promise.all(
            participants.map(async (p) => {
                try {
                    const ref = doc(db, `tenants/${tenantId}/users/${p.id}`);
                    const snap = await getDoc(ref);
                    const data = snap.exists() ? snap.data() : {};

                    return {
                        id: p.id,
                        name: data.fullName || data.FullName || 'غير معروف',
                        fullName: data.fullName || data.FullName || 'غير معروف',
                        userName: data.userName || data.UserName || '',
                        isAdmin: p.isAdmin || false,
                        isHidden: data.isHidden || false,
                        role: data.role || 'employee'
                    };
                } catch {
                    return {
                        id: p.id,
                        name: 'غير معروف',
                        fullName: 'غير معروف',
                        userName: '',
                        isAdmin: p.isAdmin || false
                    };
                }
            })
        );

        return results;
    } catch (error) {
        console.error('❌ فشل في جلب المشاركين:', error);
        throw error;
    }
};

/**
 * ✅ تحديث المشاركين فقط
 */
export const setChatParticipants = async ({ tenantId, chatId, participants }) => {
    try {
        const participantIds = participants.map(p => p.id);
        const chatRef = doc(db, `tenants/${tenantId}/chats/${chatId}`);

        await updateDoc(chatRef, {
            participants,
            participantIds
        });
    } catch (error) {
        console.error('❌ فشل في تحديث المشاركين:', error);
        throw error;
    }
};
