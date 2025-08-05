import { db } from '../firebase';
import {
    doc, setDoc, collection, addDoc, serverTimestamp
} from 'firebase/firestore';

const tenants = ['tenant_OMEX', 'tenant_FALCON', 'tenant_ALFA'];

const users = [
    // OMEX
    { id: 'user_001', fullName: 'أحمد الزهراني', userName: 'ahmed.z', tenantId: 'tenant_OMEX', role: 'employee', isHidden: false },
    { id: 'user_002', fullName: 'سارة الغامدي', userName: 'sarah.g', tenantId: 'tenant_OMEX', role: 'manager', isHidden: true },
    { id: 'user_003', fullName: 'خالد العتيبي', userName: 'khaled.a', tenantId: 'tenant_OMEX', role: 'employee', isHidden: false },

    // FALCON
    { id: 'user_004', fullName: 'عبدالله الشهري', userName: 'abdullah.s', tenantId: 'tenant_FALCON', role: 'employee', isHidden: false },
    { id: 'user_005', fullName: 'نورة الفهد', userName: 'nora.f', tenantId: 'tenant_FALCON', role: 'manager', isHidden: true },
    { id: 'user_006', fullName: 'ماجد الدوسري', userName: 'majed.d', tenantId: 'tenant_FALCON', role: 'employee', isHidden: false },

    // ALFA
    { id: 'user_007', fullName: 'ليلى التركي', userName: 'layla.t', tenantId: 'tenant_ALFA', role: 'employee', isHidden: false },
    { id: 'user_008', fullName: 'ياسر المطيري', userName: 'yasser.m', tenantId: 'tenant_ALFA', role: 'employee', isHidden: false },
    { id: 'user_009', fullName: 'منيرة الحربي', userName: 'muneera.h', tenantId: 'tenant_ALFA', role: 'manager', isHidden: true },
    { id: 'user_010', fullName: 'بندر القحطاني', userName: 'bandar.q', tenantId: 'tenant_ALFA', role: 'employee', isHidden: false },
];

const seedFirestore = async () => {
    for (const user of users) {
        const userRef = doc(db, `tenants/${user.tenantId}/users/${user.id}`);
        await setDoc(userRef, {
            ...user,
            email: `${user.userName}@example.com`,
            status: 'available',
            statusMessage: '',
            permissions: user.role === 'manager' ? [] : ['CHAT_GROUP_CREATE'],
            companyId: user.tenantId.replace('tenant_', 'company_'),
            createdAt: serverTimestamp()
        });
        console.log(`✅ Created user: ${user.fullName}`);
    }

    // دردشة خاصة داخل OMEX بين user_001 و user_003
    await createPrivateChat('tenant_OMEX', 'user_001', 'user_003');

    // دردشة خاصة داخل FALCON بين user_004 و user_006
    await createPrivateChat('tenant_FALCON', 'user_004', 'user_006');

    // دردشة جماعية في ALFA
    await createGroupChat('tenant_ALFA', 'user_007', [
        { id: 'user_007', isAdmin: true },
        { id: 'user_008', isAdmin: false },
        { id: 'user_010', isAdmin: false },
    ], 'فريق التسويق');

    // دردشة جماعية في OMEX
    await createGroupChat('tenant_OMEX', 'user_001', [
        { id: 'user_001', isAdmin: true },
        { id: 'user_003', isAdmin: false },
    ], 'مشروع HR');

    // دردشة خاصة في ALFA بين user_007 و user_010
    await createPrivateChat('tenant_ALFA', 'user_007', 'user_010');

    console.log('🎉 Seeder completed');
};

const createPrivateChat = async (tenantId, userA, userB) => {
    const ref = doc(collection(db, `tenants/${tenantId}/chats`));
    await setDoc(ref, {
        type: 'private',
        createdBy: userA,
        createdAt: serverTimestamp(),
        chatName: '',
        visibility: 'membersOnly',
        deletedFor: [],
        participants: [
            { id: userA, isAdmin: false },
            { id: userB, isAdmin: false }
        ],
        participantIds: [userA, userB],
        lastMessage: null
    });
    console.log(`✅ Private chat between ${userA} & ${userB}`);
};

const createGroupChat = async (tenantId, createdBy, participants, name) => {
    const ref = doc(collection(db, `tenants/${tenantId}/chats`));
    await setDoc(ref, {
        type: 'group',
        createdBy,
        createdAt: serverTimestamp(),
        chatName: name,
        description: '',
        visibility: 'membersOnly',
        deletedFor: [],
        participants,
        participantIds: participants.map(p => p.id),
        lastMessage: null
    });
    console.log(`✅ Group chat "${name}" created in ${tenantId}`);
};

export default seedFirestore;
