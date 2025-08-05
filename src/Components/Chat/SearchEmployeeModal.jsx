import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, ListGroup } from 'react-bootstrap';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { useChat } from '../../contexts/ChatContext';

const SearchEmployeeModal = ({ show, onHide }) => {
    const { session } = useSession() || {};
    const tenantId = session?.tenantId;
    const currentUserId = session?.userId;

    const { startPrivateChatWithUser } = useChat();

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const brandPrimary = '#02365B'; // الكحلي
    const brandAccent = '#00BAC6';  // التركوازي

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }

        const delay = setTimeout(() => {
            searchUsersFromFirestore();
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    const searchUsersFromFirestore = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, `tenants/${tenantId}/users`);
            const q = query(
                usersRef,
                orderBy('FullName'),
                startAt(searchTerm),
                endAt(searchTerm + '\uf8ff')
            );

            const snapshot = await getDocs(q);
            const users = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user => user.id !== currentUserId);

            setResults(users);
        } catch (err) {
            console.error('❌ Firestore search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStartChat = async (selectedUser) => {
        try {
            await startPrivateChatWithUser({
                tenantId,
                currentUserId,
                selectedUser
            });

            onHide();
            navigate('/dashboard/chat');
        } catch (err) {
            console.error('❌ فشل بدء المحادثة:', err);
        }
    };

    if (!tenantId || !currentUserId) {
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Body className="text-center py-5">
                    <Spinner animation="border" />
                    <p className="mt-3">جاري تحميل الجلسة...</p>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton style={{ backgroundColor: brandPrimary, color: '#fff' }}>
                <Modal.Title> ابحث عن موظف</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#f8f9fa' }}>
                <Form className="d-flex mb-3">
                    <Form.Control
                        type="text"
                        placeholder="أدخل اسم الموظف..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            borderRadius: '8px',
                            border: `1px solid ${brandAccent}`,
                            fontSize: '0.95rem',
                            color: '#212529'
                        }}
                    />
                </Form>

                {loading && (
                    <div className="text-center my-2">
                        <Spinner animation="border" size="sm" style={{ color: brandAccent }} />
                    </div>
                )}

                <ListGroup>
                    {results.map(user => (
                        <ListGroup.Item
                            key={user.id}
                            className="d-flex justify-content-between align-items-center"
                            style={{
                                backgroundColor: '#ffffff',
                                borderLeft: `4px solid ${brandAccent}`
                            }}
                        >
                            <div className="d-flex flex-column">
                                <strong style={{ color: brandPrimary }}>{user.fullName || user.FullName || 'غير معروف'}</strong>
                                <small className="text-muted">@{user.userName || user.UserName}</small>
                            </div>
                            <Button
                                size="sm"
                                style={{
                                    backgroundColor: brandAccent,
                                    borderColor: brandAccent,
                                    fontWeight: 'bold'
                                }}
                                onClick={() => handleStartChat(user)}
                            >
                                محادثة
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {!loading && searchTerm && results.length === 0 && (
                    <div className="text-muted text-center mt-3">
                        لا يوجد نتائج مطابقة للبحث.
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default SearchEmployeeModal;
