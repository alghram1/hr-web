import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap';
import Select from 'react-select';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useChat } from '../../contexts/ChatContext';
import { fetchChatParticipants } from '../../services/ChatService';

const ManageParticipantsModal = ({ show, onHide, chatInfo, tenantId, currentUserId }) => {
    const [userOptions, setUserOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [adminMap, setAdminMap] = useState({});
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [isAdminState, setIsAdminState] = useState(false);

    const { updateChat } = useChat();
    const participants = chatInfo?.participants || [];

    useEffect(() => {
        if (!show || !tenantId || !chatInfo) return;

        const loadParticipants = async () => {
            setLoading(true);
            try {
                const fetched = await fetchChatParticipants({ tenantId, participants });

                const options = fetched.map(u => ({
                    value: u.id,
                    label: `${u.fullName} (@${u.userName || u.id})${u.isAdmin ? ' ⭐' : ''}`,
                }));

                const initialAdminMap = {};
                fetched.forEach(u => {
                    initialAdminMap[u.id] = u.isAdmin;
                });

                setUserOptions(options);
                setSelectedUsers(options);
                setAdminMap(initialAdminMap);
                setGroupName(chatInfo.name || '');
                setGroupDescription(chatInfo.description || '');

                const isAdmin = fetched.find(p => p.id === currentUserId)?.isAdmin === true;
                setIsAdminState(isAdmin);
            } catch (err) {
                console.error(err);
                setError('فشل تحميل المشاركين.');
            } finally {
                setLoading(false);
            }
        };

        loadParticipants();
    }, [show, tenantId, chatInfo]);

    const toggleAdmin = (id) => {
        setAdminMap(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);

        try {
            const updatedParticipants = selectedUsers.map(u => ({
                id: u.value,
                name: u.label.split(' (@')[0], // استخراج الاسم فقط من label
                isAdmin: adminMap[u.value] || false
              }));

         

            if (!updatedParticipants.some(p => p.isAdmin)) {
                setError('يجب تعيين مشرف واحد على الأقل.');
                setSaving(false);
                return;
            }

            if (!updatedParticipants.some(p => p.id === currentUserId)) {
                setError('لا يمكنك إزالة نفسك من المجموعة.');
                setSaving(false);
                return;
            }

            const participantsChanged =
                updatedParticipants.length !== participants.length ||
                updatedParticipants.some((p, i) =>
                    p.id !== participants[i]?.id ||
                    p.isAdmin !== participants[i]?.isAdmin
                );

            const hasChanges =
                groupName !== chatInfo.name ||
                groupDescription !== chatInfo.description ||
                participantsChanged;

            if (!hasChanges) {
                onHide();
                return;
            }

            await updateChat(tenantId, chatInfo.id, {
                participants: updatedParticipants,
                name: groupName,
                description: groupDescription
            });

            await addDoc(collection(db, `tenants/${tenantId}/chats/${chatInfo.id}/messages`), {
                senderId: 'system',
                text: `📢 تم تعديل معلومات المجموعة من قبل مشرف.`,
                timestamp: serverTimestamp(),
                isRead: true,
                system: true
            });

            onHide();
        } catch (err) {
            console.error(err);
            setError('حدث خطأ أثناء حفظ التعديلات.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>👥 إدارة المشاركين</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                    <div className="text-center my-3">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        <Form.Group className="mb-2">
                            <Form.Label>اسم المجموعة</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                disabled={!isAdminState}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>وصف المجموعة</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}
                                disabled={!isAdminState}
                            />
                        </Form.Group>

                        <Select
                            isMulti
                            options={userOptions}
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                            placeholder="اختر المشاركين..."
                            classNamePrefix="select"
                            isDisabled={!isAdminState}
                        />

                        <div className="mt-3">
                            {selectedUsers.map(u => (
                                <div key={u.value} className="d-flex justify-content-between align-items-center border-bottom py-1">
                                    <span>{u.label}</span>
                                    {isAdminState && (
                                        <Button
                                            size="sm"
                                            variant={adminMap[u.value] ? 'warning' : 'outline-secondary'}
                                            onClick={() => toggleAdmin(u.value)}
                                        >
                                            {adminMap[u.value] ? '⭐ مشرف' : 'تعيين مشرف'}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>إلغاء</Button>
                <Button variant="primary" onClick={handleSave} disabled={!isAdminState || saving}>
                    {saving ? <Spinner size="sm" animation="border" /> : 'حفظ'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManageParticipantsModal;
