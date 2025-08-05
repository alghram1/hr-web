import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

export default function LeavePolicyFormModal({ show, onClose, onSave }) {
    const [form, setForm] = useState({
        name: '',
        type: 'مدفوعة',
        days: '',
        eligibilityAfterMonths: '',
        carryOver: false,
        maxCarryDays: '',
        active: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header
                closeButton
                style={{ backgroundColor: theme.colors.grayBg }}
                className="border-0"
            >
                <Modal.Title className="fw-bold" style={{ color: theme.colors.primary }}>
                    📋 إضافة سياسة إجازة جديدة
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-white">
                <Form>

                    {/* 📝 المعلومات الأساسية */}
                    <div className="border rounded-3 p-3 mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                            📝 المعلومات الأساسية
                        </h6>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>اسم الإجازة</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="مثال: إجازة سنوية"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>نوع الإجازة</Form.Label>
                                    <Form.Select name="type" value={form.type} onChange={handleChange}>
                                        <option value="مدفوعة">مدفوعة</option>
                                        <option value="غير مدفوعة">غير مدفوعة</option>
                                        <option value="مرنة">مرنة</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    {/* 📆 تفاصيل الاستحقاق */}
                    <div className="border rounded-3 p-3 mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                            📆 تفاصيل الاستحقاق
                        </h6>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>عدد الأيام المسموحة</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="days"
                                        value={form.days}
                                        onChange={handleChange}
                                        placeholder="مثال: 30"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>الاستحقاق بعد (شهور)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="eligibilityAfterMonths"
                                        value={form.eligibilityAfterMonths}
                                        onChange={handleChange}
                                        placeholder="مثال: 3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mt-4 pt-2">
                                    <Form.Check
                                        type="switch"
                                        name="carryOver"
                                        checked={form.carryOver}
                                        onChange={handleChange}
                                        label="قابلة للترحيل"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {form.carryOver && (
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>الحد الأعلى لترحيل الأيام</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="maxCarryDays"
                                            value={form.maxCarryDays}
                                            onChange={handleChange}
                                            placeholder="مثال: 60"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                    </div>

                    {/* ⚙️ الإعدادات العامة */}
                    <div className="border rounded-3 p-3 mb-2">
                        <h6 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                            ⚙️ الإعدادات العامة
                        </h6>
                        <Form.Group>
                            <Form.Check
                                type="switch"
                                name="active"
                                checked={form.active}
                                onChange={handleChange}
                                label="السياسة مفعّلة"
                            />
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer
                style={{ backgroundColor: theme.colors.grayBg }}
                className="border-0"
            >
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    إلغاء
                </Button>
                <Button
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent
                    }}
                    onClick={handleSubmit}
                >
                    حفظ السياسة
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
