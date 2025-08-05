import React, { useEffect, useState, useRef } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    writeBatch,
    doc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Form, Button, CloseButton } from 'react-bootstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';

import { useSession } from '../../contexts/SessionContext';
import { useChat } from '../../contexts/ChatContext';
import { sendMessage } from '../../services/MessageService';

import ManageParticipantsModal from '../../Components/Chat/ManageParticipantsModal';
import '../../Styles/chat.scss';

const ChatWindow = () => {
    const { session } = useSession();
    const { chatInfo, isLoadingChat, scrollOnLoad } = useChat();

    const tenantId = session.tenantId;
    const userId = session.userId;

    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [showManageModal, setShowManageModal] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const bottomRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (!tenantId || !chatInfo?.id) return;

        const q = query(
            collection(db, `tenants/${tenantId}/chats/${chatInfo.id}/messages`),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);

            const unread = snapshot.docs.filter(
                d => d.data().senderId !== userId && !d.data().isRead
            );

            if (unread.length > 0) {
                const batch = writeBatch(db);
                unread.forEach(d => {
                    const ref = doc(db, `tenants/${tenantId}/chats/${chatInfo.id}/messages/${d.id}`);
                    batch.update(ref, { isRead: true });
                });
                await batch.commit();
            }
        });

        return () => unsubscribe();
    }, [chatInfo?.id, tenantId, userId]);

    useEffect(() => {
        if (scrollOnLoad) {
            scrollToBottom();
        }
    }, [messages, scrollOnLoad]);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
            setShowScrollButton(!isBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        setShowScrollButton(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMsg.trim() || !chatInfo?.id) return;

        try {
            await sendMessage({
                tenantId,
                chatId: chatInfo.id,
                senderId: userId,
                text: newMsg.trim(),
                attachments: [],
                replyTo: replyingTo ? {
                    id: replyingTo.id,
                    text: replyingTo.text,
                    senderId: replyingTo.senderId
                } : null
            });

            setNewMsg('');
            setReplyingTo(null);
        } catch (err) {
            console.error('❌ فشل الإرسال:', err);
        }
    };

    const handleReply = (msg) => {
        setReplyingTo({
            id: msg.id,
            text: msg.text,
            senderId: msg.senderId
        });
    };

    const getSenderName = (senderId) => {
        if (senderId === userId) return 'أنت';
        const sender = chatInfo?.participants?.find(p => p.id === senderId);
        return sender?.name || 'غير معروف';
    };

    const renderMessage = (msg) => {
        const isMine = msg.senderId?.toLowerCase() === userId?.toLowerCase();

        return (
            <div key={msg.id} className={`chat-message-wrapper ${isMine ? 'mine' : 'theirs'}`}>
                <div className="chat-bubble">
                    {msg.replyTo && (
                        <div className="reply-preview">
                            <small className="text-muted">{getSenderName(msg.replyTo.senderId)}</small>
                            <div className="text-truncate small text-secondary">{msg.replyTo.text}</div>
                            <hr className="my-1" />
                        </div>
                    )}
                    <div className="message-text">{msg.text}</div>
                    <div className="message-meta d-flex justify-content-between mt-1">
                        <small className="text-muted">
                            {msg.timestamp?.toDate
                                ? dayjs(msg.timestamp.toDate()).locale('ar').format('hh:mm A')
                                : '...'}
                        </small>
                        {isMine && (
                            <small className={`message-status ${msg.isRead ? 'read' : 'sent'}`}>
                                {msg.isRead ? '✔✔' : '✔'}
                            </small>
                        )}
                    </div>
                </div>
                <div className="text-end mt-1">
                    <Button variant="link" size="sm" className="text-muted p-0" onClick={() => handleReply(msg)}>
                        رد
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="chat-window-container position-relative">
            <div className="chat-header d-flex justify-content-between align-items-start gap-3 p-3" style={{ backgroundColor: '#02365B', color: 'white' }}>
                <div className="flex-grow-1 overflow-hidden">
                    <h5 className="mb-1 text-truncate">
                        {isLoadingChat ? '...جاري التحميل' : chatInfo?.name || 'بدون اسم'}
                    </h5>
                    <div className="participants-line text-truncate">
                        👥 المشاركون:{' '}
                        <span className="participants-names" title={
                            (chatInfo?.participants || []).map(p => p.name || p.id).join(', ')
                        }>
                            {(chatInfo?.participants || []).slice(0, 5).map(p => p.name || p.id).join(', ')}
                            {(chatInfo?.participants?.length || 0) > 5 &&
                                ' +' + (chatInfo.participants.length - 5) + ' مشارك'}
                        </span>
                    </div>
                </div>
                {chatInfo?.type === 'group' && chatInfo.createdBy === userId && (
                    <div className="pt-1">
                        <Button
                            size="sm"
                            variant="light"
                            className="rounded-pill fw-bold"
                            onClick={() => setShowManageModal(true)}
                        >
                            إدارة المشاركين
                        </Button>
                    </div>
                )}
            </div>

            <div ref={chatContainerRef} className="chat-messages flex-grow-1 overflow-auto p-3">
                {messages.map(renderMessage)}
                <div ref={bottomRef}></div>
            </div>

            {showScrollButton && (
                <div className="scroll-to-bottom-btn">
                    <Button
                        size="sm"
                        onClick={scrollToBottom}
                        style={{
                            position: 'absolute',
                            bottom: 90,
                            right: 20,
                            zIndex: 10,
                            borderRadius: '50%',
                            backgroundColor: '#00BAC6',
                            border: 'none',
                            width: 38,
                            height: 38,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        ↓
                    </Button>
                </div>
            )}

            <div className="chat-input-wrapper">
                {replyingTo && (
                    <div className="replying-box d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light">
                        <div className="text-truncate small">
                            <strong>رداً على:</strong> {replyingTo.text}
                        </div>
                        <CloseButton onClick={() => setReplyingTo(null)} />
                    </div>
                )}
                <Form onSubmit={handleSend} className="chat-input-bar d-flex align-items-center gap-2 px-3 py-2">
                    <Form.Control
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        placeholder="اكتب رسالتك..."
                        className="rounded-pill"
                    />
                    <Button
                        type="submit"
                        style={{
                            backgroundColor: '#00BAC6',
                            border: 'none',
                            width: 40,
                            height: 40
                        }}
                        className="rounded-circle d-flex align-items-center justify-content-center"
                    >
                        ارسال
                    </Button>
                </Form>
            </div>

            {chatInfo && (
                <ManageParticipantsModal
                    show={showManageModal}
                    onHide={() => setShowManageModal(false)}
                    chatInfo={chatInfo}
                    tenantId={tenantId}
                    currentUserId={userId}
                />
            )}
        </div>
    );
};

export default ChatWindow;
