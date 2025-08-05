import { db } from '../firebase';
import {
    collection,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';

/**
 * ✅ تحويل المشاركين من string إلى object
 */
const transformParticipants = (oldArray) => {
    if (!Array.isArray(oldArray)) return [];
    return oldArray.map(p =>
        typeof p === 'string' ? { id: p, isAdmin: false } : p
    );
};

/**
 * ✅ جلب خريطة المستخدمين: userId => fullName
 */
const getUserMap = async (tenantId) => {
    const snap = await getDocs(collection(db, `tenants/${tenantId}/users`));
    const map = {};

    snap.forEach(doc => {
        const data = doc.data();
        const name = data.fullName || data.FullName || data.userName || data.UserName || 'غير معروف';
        map[doc.id] = name;
    });

    return map;
};

/**
 * ✅ ترحيل المشاركين داخل جميع المحادثات
 */
export const migrateChatParticipants = async (tenantId) => {
    const userMap = await getUserMap(tenantId);
    const chatsSnap = await getDocs(collection(db, `tenants/${tenantId}/chats`));

    let updatedCount = 0;

    for (const docSnap of chatsSnap.docs) {
        const chatId = docSnap.id;
        const data = docSnap.data();
        const oldParticipants = data.participants;

        if (!oldParticipants || !Array.isArray(oldParticipants)) continue;

        const isStructured = oldParticipants.every(p => typeof p === 'object' && p?.id);
        const transformed = isStructured ? oldParticipants : transformParticipants(oldParticipants);

        // ✅ إضافة الاسم لكل مشارك
        const participantsWithNames = transformed.map(p => ({
            ...p,
            name: p.name || userMap[p.id] || 'غير معروف'
        }));

        const participantIds = participantsWithNames.map(p => p.id);

        // ✅ تحديث Firestore فقط إذا كان هناك فرق
        const hasChanges =
            JSON.stringify(participantsWithNames) !== JSON.stringify(oldParticipants) ||
            JSON.stringify(participantIds) !== JSON.stringify(data.participantIds);

        if (hasChanges) {
            await updateDoc(doc(db, `tenants/${tenantId}/chats/${chatId}`), {
                participants: participantsWithNames,
                participantIds
            });

            updatedCount++;
            console.log(`✅ Updated chat: ${chatId}`);
        }
    }

    console.log(`🎉 Migration completed. Updated ${updatedCount} chat(s).`);
};
