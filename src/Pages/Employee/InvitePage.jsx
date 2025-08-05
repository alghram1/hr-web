import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import '../../Styles/variables.scss';
export default function InvitePage() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [inviteInfo, setInviteInfo] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        nationalId: '',
        address: '',
        bankAccount: ''
    });

    useEffect(() => {
        axios.get(`/api/invite/${token}`)
            .then(res => {
                setInviteInfo(res.data);
                setLoading(false);
            })
            .catch(err => {
                const msg = err?.response?.data?.message || 'رابط الدعوة غير صالح أو منتهي';
                setError(msg);
                setLoading(false);
            });
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('كلمتا المرور غير متطابقتين');
        }

        try {
            setLoading(true);
            await axios.post(`/api/invite/complete/${token}`, {
                password: formData.password,
                nationalId: formData.nationalId,
                address: formData.address,
                bankAccount: formData.bankAccount,
            });
            navigate('/login');
        } catch (err) {
            setError('حدث خطأ أثناء تفعيل الحساب');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !inviteInfo) return <Spinner animation="border" className="m-5" />;

    return (
        <Container dir="rtl" style={{ maxWidth: '600px', marginTop: '50px' }}>
            <h3 className="mb-4">تفعيل حسابك</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {inviteInfo && (
                <>
                    <p className="text-muted">تم إرسال الدعوة إلى: <strong>{inviteInfo?.sentToEmail}</strong></p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>كلمة المرور</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>تأكيد كلمة المرور</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>رقم الهوية</Form.Label>
                            <Form.Control
                                name="nationalId"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>العنوان</Form.Label>
                            <Form.Control
                                name="address"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>رقم الحساب البنكي</Form.Label>
                            <Form.Control
                                name="bankAccount"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'جارٍ التفعيل...' : 'تفعيل الحساب'}
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    );
}
