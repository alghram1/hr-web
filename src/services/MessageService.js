import { db } from '../firebase';
import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    getDoc,
    arrayUnion
} from 'firebase/firestore';

/**
 * ✅ إرسال رسالة إلى دردشة معينة
 */
export const sendMessage = async ({
    tenantId,
    chatId,
    senderId,
    text = '',
    attachments = [],
    replyTo = null
}) => {
    try {
        if (!tenantId || !chatId || !senderId) {
            throw new Error('بيانات الرسالة غير مكتملة');
        }

        const message = {
            senderId,
            text,
            attachments,
            timestamp: serverTimestamp(),
            isRead: false,
            replyTo,
            seenBy: [senderId], // ✅ يمكن تطويرها لاحقًا
            deletedFor: []
        };

        const messageRef = await addDoc(
            collection(db, `tenants/${tenantId}/chats/${chatId}/messages`),
            message
        );

        const chatRef = doc(db, `tenants/${tenantId}/chats/${chatId}`);
        await updateDoc(chatRef, {
            lastMessage: {
                text: text || (attachments.length ? '📎 مرفق' : '—'),
                timestamp: serverTimestamp(),
                senderId
            }
        });

        return messageRef.id;
    } catch (error) {
        console.error('❌ فشل في إرسال الرسالة:', error);
        throw error;
    }
};


/**
 * ✅ جلب جميع الرسائل داخل محادثة معينة (مرتبة تصاعديًا)
 */
export const getMessagesByChat = async ({ tenantId, chatId }) => {
    try {
        const messagesRef = collection(db, `tenants/${tenantId}/chats/${chatId}/messages`);
        const q = query(messagesRef, orderBy('timestamp', 'asc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('❌ فشل في جلب الرسائل:', error);
        throw error;
    }
};




/**
 * ✅ تحديث حالة القراءة للرسالة
 */
export const markMessageAsRead = async ({ tenantId, chatId, messageId, userId }) => {
    try {
        const messageRef = doc(db, `tenants/${tenantId}/chats/${chatId}/messages/${messageId}`);
        await updateDoc(messageRef, {
            seenBy: arrayUnion(userId)
        });
    } catch (error) {
        console.error('❌ فشل في تحديث حالة القراءة:', error);
    }
};
