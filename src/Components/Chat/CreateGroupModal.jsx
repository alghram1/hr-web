// src/Components/Chat/CreateGroupModal.jsx

import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { useSession } from '../../contexts/SessionContext';
import { useChat } from '../../contexts/ChatContext';
import { createChat } from '../../services/ChatService';
import { db } from '../../firebase';

const CreateGroupModal = ({ show, onHide }) => {
    const { session } = useSession();
    const { tenantId, userId: currentUserId, userName } = session;
    const { setChatInfo } = useChat();
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingUsers(true);
            try {
                let data = [];

                try {
                    const res = await fetch(`/api/employees/by-department?tenantId=${tenantId}`);
                    if (res.ok) {
                        data = await res.json();
                    } else {
                        throw new Error('فشل تحميل المستخدمين من الـ API');
                    }
                } catch (apiErr) {
                    console.warn('❌ استخدام بيانات وهمية بسبب فشل التحميل:', apiErr.message);
                    data = [
                        { id: 'user_101', fullName: 'أحمد الزهراني', userName: 'ahmed.z' },
                        { id: 'user_102', fullName: 'سارة الغامدي', userName: 'sarah.g' },
                        { id: 'user_103', fullName: 'محمد القحطاني', userName: 'moh.q' },
                        { id: 'user_104', fullName: 'نورة العتيبي', userName: 'nora.a' }
                    ];
                }

                if (!data || data.length === 0) {
                    setError('تعذر تحميل المستخدمين. حاول مرة أخرى.');
                    return;
                }

                const filtered = data.filter(u => u.id !== currentUserId);
                const options = filtered.map(u => ({
                    value: u.id,
                    label: `${u.fullName} (@${u.userName || u.id})`
                }));
                setAvailableUsers(options);
            } catch (err) {
                console.error(err);
                setError('حدث خطأ غير متوقع.');
            } finally {
                setLoadingUsers(false);
            }
        };


        if (show) {
            fetchUsers();
            setGroupName('');
            setSelectedOptions([]);
            setError(null);
        }
    }, [show, tenantId, currentUserId]);

    const handleCreate = async () => {
        if (!groupName.trim()) return setError('يرجى إدخال اسم المجموعة.');
        if (selectedOptions.length === 0) return setError('يرجى اختيار عضو واحد على الأقل.');

        setCreating(true);
        setError(null);

        try {
            const participants = [
                { id: currentUserId, isAdmin: true },
                ...selectedOptions.map(u => ({ id: u.value, isAdmin: false }))
            ];

            const participantIds = participants.map(p => p.id);

            const chatId = await createChat({
                tenantId,
                participants,
                createdBy: currentUserId,
                name: groupName.trim(),
                type: 'group',
                visibility: 'membersOnly',
                restrictedTo: [],
                participantIds
            });

            // 🟡 أضف رسالة نظامية أولى
            await addDoc(collection(db, `tenants/${tenantId}/chats/${chatId}/messages`), {
                senderId: 'system',
                text: `📢 تم إنشاء المجموعة بواسطة ${userName || currentUserId}`,
                timestamp: serverTimestamp(),
                isRead: true,
                system: true
            });

            // ✅ خزّن المحادثة الجديدة في السياق
            setChatInfo({
                id: chatId,
                chatName: groupName.trim(),
                participants,
                type: 'group',
                createdBy: currentUserId
            });

            onHide();
            navigate(`/dashboard/chat/${chatId}`);
        } catch (err) {
            console.error(err);
            setError('حدث خطأ أثناء إنشاء المجموعة.');
        } finally {
            setCreating(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>➕ إنشاء مجموعة جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>اسم المجموعة</Form.Label>
                    <Form.Control
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="مثال: فريق التسويق"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>اختر الأعضاء</Form.Label>
                    {loadingUsers ? (
                        <div className="text-center my-3">
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <Select
                            isMulti
                            options={availableUsers}
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                            placeholder="ابحث واختر الأعضاء..."
                            classNamePrefix="select"
                        />
                    )}
                </Form.Group>
                <div className="text-end mt-4">
                    <Button variant="secondary" onClick={onHide} className="me-2">إلغاء</Button>
                    <Button
                        variant="success"
                        onClick={handleCreate}
                        disabled={creating || !groupName.trim() || selectedOptions.length === 0}
                    >
                        {creating ? <Spinner size="sm" animation="border" /> : 'إنشاء المجموعة'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CreateGroupModal;
