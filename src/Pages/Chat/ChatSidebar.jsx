// src/pages/Chat/ChatSidebar.jsx

import React, { useEffect, useState } from 'react';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    getDocs
} from 'firebase/firestore';
import seedFirestore from '../../scripts/Seeder';
import { db } from '../../firebase';
import { Spinner, Button, Form, Dropdown, ListGroup, Badge } from 'react-bootstrap';
import { useSession } from '../../contexts/SessionContext';
import { useChat } from '../../contexts/ChatContext';
import CreateGroupModal from '../../Components/Chat/CreateGroupModal';
import '../../Styles/chat.scss';

const ChatSidebar = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { session } = useSession();
    const { chatInfo, loadChatById } = useChat();

    const tenantId = session?.tenantId;
    const currentUserId = session?.userId;

    useEffect(() => {
        seedFirestore();
        if (!tenantId || !currentUserId) return;

        const q = query(
            collection(db, `tenants/${tenantId}/chats`),
            where('participantIds', 'array-contains', currentUserId)
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const results = await Promise.all(
                snapshot.docs.map(async (docSnap) => {
                    const chat = docSnap.data();
                    const chatId = docSnap.id;

                    if (chat.deletedFor?.includes(currentUserId)) return null;

                    const isPrivate = chat.type === 'private';
                    const otherUserId = isPrivate
                        ? chat.participants?.find(p => p.id !== currentUserId)?.id
                        : null;

                    let otherUserStatus = '—';
                    if (otherUserId) {
                        try {
                            const userDoc = await getDoc(doc(db, `tenants/${tenantId}/users/${otherUserId}`));
                            if (userDoc.exists()) {
                                otherUserStatus = userDoc.data().status || 'غير معروف';
                            }
                        } catch { }
                    }

                    return {
                        id: chatId,
                        ...chat,
                        displayName: chat.chatName || chat.name || 'بدون اسم',
                        lastMessageText: chat.lastMessage?.text || '—',
                        lastMessageTimestamp: chat.lastMessage?.timestamp?.toDate?.() || new Date(0),
                        otherUserStatus
                    };
                })
            );

            setChats(results.filter(Boolean).sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [tenantId, currentUserId]);

    const handleSelectChat = async (chat) => {
        await loadChatById(tenantId, chat.id); // ✅ تحميل المحادثة دون التنقل
    };

    const handleSoftDelete = async (chatId) => {
        try {
            const ref = doc(db, `tenants/${tenantId}/chats/${chatId}`);
            await updateDoc(ref, {
                deletedFor: Array.from(new Set([
                    ...(chats.find(c => c.id === chatId)?.deletedFor || []),
                    currentUserId
                ]))
            });
        } catch (err) {
            console.error('❌ فشل الحذف الناعم:', err);
        }
    };

    const filteredChats = chats.filter(chat =>
        chat.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessageText?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-sidebar p-3 border-end" style={{ backgroundColor: '#fff', color: '#02365B' }}>


            <div
                className="chat-sidebar-header mb-3 p-3 rounded"
                style={{
                    backgroundColor: '#02365B',
                    color: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                    <h6 className="mb-0" style={{ fontWeight: 600 }}>
                        💬 محادثاتك
                    </h6>

                    {session?.permissions?.includes('CHAT_GROUP_CREATE') && (
                        <Button
                            size="sm"
                            style={{
                                backgroundColor: '#00BAC6',
                                border: 'none',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                padding: '4px 10px'
                            }}
                            onClick={() => setShowCreateGroup(true)}
                        >
                            ➕ مجموعة
                        </Button>
                    )}
                </div>

                <Form.Control
                    type="text"
                    placeholder="🔍 ابحث باسم المجموعة أو المستخدم..."
                    style={{
                        backgroundColor: '#E9F7F8',
                        borderColor: '#00BAC6',
                        color: '#02365B',
                        fontSize: '0.85rem',
                        borderRadius: '8px'
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {loading ? (
                <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ListGroup variant="flush" className="chat-list">
                    {filteredChats.map(chat => (
                        <ListGroup.Item
                            key={chat.id}
                            action
                            active={chatInfo?.id === chat.id}
                            onClick={() => handleSelectChat(chat)}
                            style={{
                                backgroundColor: chatInfo?.id === chat.id ? '#00BAC6' : '#fff',
                                color: chatInfo?.id === chat.id ? '#fff' : '#02365B',
                                border: `1px solid ${chatInfo?.id === chat.id ? '#00BAC6' : '#02365B22'}`,
                                borderLeft: `4px solid ${chatInfo?.id === chat.id ? '#00BAC6' : '#02365B22'}`,
                                borderRadius: '8px',
                                marginBottom: '6px',
                                boxShadow: chatInfo?.id === chat.id ? '0 0 6px rgba(0, 186, 198, 0.4)' : '0 1px 2px rgba(0,0,0,0.04)',
                                transition: '0.2s ease-in-out'
                            }}

                            className="d-flex justify-content-between align-items-start"
                        >
                            <div>
                                <div className="fw-bold">{chat.displayName}</div>
                                <small className="text-muted text-truncate d-block" style={{ maxWidth: 200 }}>
                                    {chat.lastMessageText}
                                </small>
                            </div>
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" size="sm" className="p-0">
                                    ⋮
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSelectChat(chat)}>فتح</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSoftDelete(chat.id)} className="text-danger">
                                            حذف
                                        </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <CreateGroupModal
                show={showCreateGroup}
                onHide={() => setShowCreateGroup(false)}
            />
        </div>
    );
};

export default ChatSidebar;












/////////////////////////////////////////////////
//useEffect(() => {
//    // ✅ إتاحة دالة الترحيل في DevTools
//    window.runParticipantMigration = async () => {
//        if (!tenantId) {
//            console.warn('❌ tenantId غير متوفر');
//            return;
//        }

//        const userSnap = await getDocs(collection(db, `tenants/${tenantId}/users`));
//        const userMap = {};
//        userSnap.forEach(doc => {
//            const data = doc.data();
//            userMap[doc.id] = data.fullName || data.FullName || 'غير معروف';
//        });

//        const chatsSnap = await getDocs(collection(db, `tenants/${tenantId}/chats`));
//        for (const docSnap of chatsSnap.docs) {
//            const chat = docSnap.data();
//            const participants = Array.isArray(chat.participants) ? chat.participants : [];
//            const structured = participants.map(p =>
//                typeof p === 'string' ? { id: p, isAdmin: false } : p
//            ).map(p => ({
//                ...p,
//                name: userMap[p.id] || 'غير معروف'
//            }));

//            const participantIds = structured.map(p => p.id);

//            await updateDoc(doc(db, `tenants/${tenantId}/chats/${docSnap.id}`), {
//                participants: structured,
//                participantIds
//            });

//            console.log('✅ Migrated chat:', docSnap.id);
//        }

//        console.log('🎉 Migration from ChatSidebar complete.');
//    };
//}, [tenantId]);
////////////////////////////////////////////////////////////////////////////







