import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    Form,
    Spinner,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from '../../contexts/SessionContext';

// 🎨 ألوان الهوية البصرية
const brandPrimary = '#02365B'; // كحلي
const brandAccent = '#00BAC6';  // تركوازي

const statusOptions = [
    { code: 'available', label: '✅ متاح', color: brandAccent },
    { code: 'busy', label: '🔴 مشغول', color: '#dc3545' },
    { code: 'in_meeting', label: '🟠 في اجتماع', color: '#fd7e14' },
    { code: 'do_not_disturb', label: '🚫 عدم الإزعاج', color: '#6c757d' },
    { code: 'on_leave', label: '🌴 في إجازة', color: '#0dcaf0' },
    { code: 'out_of_office', label: '🏖️ خارج المكتب', color: '#adb5bd' },
    { code: 'offline', label: '⚫ غير متصل', color: '#adb5bd' },
];

const ChangeStatusDropdown = () => {
    const { session } = useSession() || {};
    const tenantId = session?.tenantId;
    const userId = session?.userId;

    const [status, setStatus] = useState('available');
    const [customMessage, setCustomMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    if (!tenantId || !userId) {
        return <Spinner animation="border" size="sm" />;
    }

    const userRef = doc(db, `tenants/${tenantId}/users/${userId}`);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const snapshot = await getDoc(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setStatus(data.status || 'available');
                    setCustomMessage(data.statusMessage || '');
                }
            } catch (err) {
                console.error('فشل تحميل الحالة', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, [tenantId, userId]);

    const handleChange = async (newStatus) => {
        setSaving(true);
        setStatus(newStatus);

        try {
            await setDoc(userRef, {
                status: newStatus,
                statusMessage: customMessage,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error('فشل تحديث الحالة', err);
        } finally {
            setSaving(false);
        }
    };

    const handleMessageChange = async (e) => {
        const newMessage = e.target.value;
        setCustomMessage(newMessage);

        try {
            await setDoc(userRef, {
                status,
                statusMessage: newMessage,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error('فشل تحديث الرسالة', err);
        }
    };

    if (loading) {
        return <Spinner animation="border" size="sm" />;
    }

    const current = statusOptions.find(s => s.code === status);

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>تغيير حالتك</Tooltip>}
        >
            <Dropdown onSelect={handleChange} className="status-dropdown" align="end">
                <Dropdown.Toggle
                    size="sm"
                    className="rounded-pill fw-bold"
                    style={{
                        backgroundColor: 'transparent',
                        border: `1.5px solid ${brandAccent}`,
                        color: brandAccent,
                    }}
                >
                    {current?.label || 'الحالة'}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ direction: 'rtl', minWidth: 240 }}>
                    {statusOptions.map((s) => (
                        <Dropdown.Item
                            key={s.code}
                            eventKey={s.code}
                            active={s.code === status}
                            style={{ color: s.color, fontWeight: 500 }}
                        >
                            {s.label}
                        </Dropdown.Item>
                    ))}

                    <Dropdown.Divider />

                    <Form.Control
                        placeholder="رسالة مخصصة (اختياري)"
                        size="sm"
                        value={customMessage}
                        onChange={handleMessageChange}
                        className="mx-2 mt-1"
                        style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            fontSize: '0.85rem'
                        }}
                    />
                    {saving && (
                        <div className="text-center py-1">
                            <Spinner animation="grow" size="sm" />
                        </div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </OverlayTrigger>
    );
};


export default ChangeStatusDropdown;
