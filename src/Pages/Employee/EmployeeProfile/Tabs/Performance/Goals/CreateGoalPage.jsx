// Components/Performance/Goals/CreateGoalPage.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowRightCircle, BsPlusCircle } from 'react-icons/bs';
import MainLayout from '../../../../../../Layout/MainLayout';

const mockGoalTypes = [
    'السلوك الوظيفي',
    'إدارة الوقت والموارد',
    'تحقيق المبيعات',
    'التطوير الشخصي',
    'تحسين جودة الخدمة'
];

const CreateGoalPage = () => {
    const navigate = useNavigate();

    const [goalTypes, setGoalTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        startDate: '',
        endDate: '',
        weight: '',
        evaluationType: '' // ✅ حقل جديد لطريقة التقييم
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        // ✅ مستقبلاً: استدعاء الأنواع من قاعدة البيانات
        setGoalTypes(mockGoalTypes);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        console.log('🚀 بيانات الهدف:', formData);
        navigate(-1);
    };

    return (
        <MainLayout>
            <Container className="py-5" dir="rtl">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-lg border-0">
                            <Card.Body>

                                {/* 🔵 رأس الصفحة */}
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                                    <div>
                                        <h5 className="fw-bold text-dark mb-1">
                                            <BsPlusCircle className="ms-2 text-success" size={20} />
                                            إنشاء هدف جديد
                                        </h5>
                                        <div className="text-muted small">
                                            قم بتعبئة الحقول أدناه لإضافة هدف جديد لهذا الموظف
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => navigate(-1)}
                                    >
                                        <BsArrowRightCircle className="ms-1" />
                                        العودة
                                    </Button>
                                </div>

                                {/* ✅ النموذج */}
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>اسم الهدف</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="مثال: تطوير مهارات التواصل"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            يرجى إدخال اسم الهدف.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>وصف الهدف</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="وصف مختصر يوضح تفاصيل هذا الهدف"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>نوع الهدف</Form.Label>
                                        <Form.Select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">-- اختر نوع الهدف --</option>
                                            {goalTypes.map((type, idx) => (
                                                <option key={idx} value={type}>{type}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            يرجى اختيار نوع الهدف.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* ✅ طريقة تقييم الهدف */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>طريقة تقييم الهدف</Form.Label>
                                        <div className="d-flex gap-4 flex-wrap">
                                            <Form.Check
                                                type="radio"
                                                id="evaluation-task"
                                                name="evaluationType"
                                                label="مرتبط بالمهام (تقييم تلقائي)"
                                                value="task"
                                                checked={formData.evaluationType === 'task'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <Form.Check
                                                type="radio"
                                                id="evaluation-manual"
                                                name="evaluationType"
                                                label="تقييم يدوي (تقييم الموظف والمدير)"
                                                value="manual"
                                                checked={formData.evaluationType === 'manual'}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            يرجى اختيار طريقة تقييم الهدف.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>تاريخ البداية</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    أدخل تاريخ بداية صالح.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>تاريخ النهاية</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    أدخل تاريخ نهاية صالح.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>الوزن (٪)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            min="1"
                                            max="100"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            أدخل وزن بين 1% و100%.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* 🔘 الأزرار النهائية */}
                                    <div className="d-flex justify-content-between mt-4">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => navigate(-1)}
                                        >
                                            إلغاء
                                        </Button>
                                        <Button variant="success" type="submit">
                                            حفظ الهدف
                                        </Button>
                                    </div>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default CreateGoalPage;
