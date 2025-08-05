import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

const AcceptInvitePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axios.get(`/api/invitations/verify/${token}`);
                setUserInfo(res.data); // يجب أن يحتوي على الاسم والبريد
                setLoading(false);
            } catch (err) {
                setError('رابط الدعوة غير صالح أو منتهي.');
                setLoading(false);
            }
        };
        verifyToken();
    }, [token]);

    const schema = Yup.object().shape({
        password: Yup.string().min(6, 'كلمة المرور قصيرة').required('كلمة المرور مطلوبة'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
            .required('تأكيد كلمة المرور مطلوب'),
    });

    const handleActivate = async (values, { setSubmitting }) => {
        try {
            await axios.post(`/api/invitations/activate`, {
                token,
                password: values.password,
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('حدث خطأ أثناء تفعيل الحساب. يرجى المحاولة لاحقًا.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
    if (success) return <Alert variant="success" className="mt-5 text-center">✅ تم تفعيل الحساب بنجاح! سيتم توجيهك لتسجيل الدخول...</Alert>;

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center mb-4">تفعيل الحساب</Card.Title>
                    <p className="text-center">مرحبًا <strong>{userInfo?.name}</strong>، يرجى تعيين كلمة مرور لحسابك.</p>

                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={schema}
                        onSubmit={handleActivate}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>كلمة المرور الجديدة</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={touched.password && !!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>تأكيد كلمة المرور</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-100">
                                    {isSubmitting ? <Spinner animation="border" size="sm" /> : 'تفعيل الحساب'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AcceptInvitePage;
