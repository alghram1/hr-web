import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    Spinner,
    Card
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../../Layout/MainLayout';
import { DOCUMENT_TYPES } from '../../../constants/documentTypes';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const CreateNewDocument = ({ isSelfView = false }) => {
    const navigate = useNavigate();
    const { employeeId: routeEmployeeId } = useParams();

    const actualEmployeeId = isSelfView ? 'CURRENT_EMPLOYEE_ID' : routeEmployeeId;

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        number: '',
        expiryDate: '',
        file: null,
        employeeId: actualEmployeeId,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const { type, name, expiryDate, file } = formData;

        if (!type || !name || !expiryDate || !file) {
            setError('❌ يرجى تعبئة جميع الحقول المطلوبة');
            setLoading(false);
            return;
        }

        // محاكاة الإرسال
        setTimeout(() => {
            console.log('📤 تم إرسال المستند:', formData);
            setSuccess('✅ تم إضافة المستند بنجاح');
            setFormData({
                type: '',
                name: '',
                number: '',
                expiryDate: '',
                file: null,
                employeeId: actualEmployeeId
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4 px-4">
                <h4
                    className="fw-bold mb-4"
                    style={{ color: theme.colors.primary }}
                >
                    📄 إنشاء مستند جديد
                </h4>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Card className="p-4 shadow-sm" style={{ maxWidth: 750 }}>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="documentType">
                                    <Form.Label className="fw-bold">نوع المستند *</Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                        style={{ borderColor: theme.colors.accent }}
                                    >
                                        <option value="">اختر النوع</option>
                                        {DOCUMENT_TYPES.map((type) => (
                                            <option key={type.key} value={type.key}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="documentName">
                                    <Form.Label className="fw-bold">اسم المستند *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="مثال: جواز السفر"
                                        required
                                        style={{ borderColor: theme.colors.accent }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="documentNumber">
                                    <Form.Label className="fw-bold">رقم المستند</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        placeholder="مثال: 123456"
                                        style={{ borderColor: theme.colors.accent }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="expiryDate">
                                    <Form.Label className="fw-bold">تاريخ الانتهاء *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        required
                                        style={{ borderColor: theme.colors.accent }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group controlId="file">
                                    <Form.Label className="fw-bold">رفع المستند (PDF أو صورة) *</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                        style={{ borderColor: theme.colors.accent }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                style={{
                                    borderColor: theme.colors.secondary,
                                    color: theme.colors.secondary
                                }}
                                onClick={() => navigate(-1)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    borderColor: theme.colors.accent,
                                    color: '#fff'
                                }}
                            >
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    'حفظ المستند'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </MainLayout>
    );
};

export default CreateNewDocument;
