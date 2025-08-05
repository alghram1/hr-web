import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import { BiSave, BiXCircle } from 'react-icons/bi';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import '../../../Styles/EmployeeProfilePage.scss';
import theme from '../../../theme'; // ✅ استيراد ألوان الهوية البصرية

const EditTimeModal = ({ show, onClose, onSave, selectedRequest }) => {
    const [formData, setFormData] = useState({
        newIn: '',
        newOut: '',
        adminNote: '',
    });

    useEffect(() => {
        if (selectedRequest) {
            setFormData({
                newIn: selectedRequest.requestedIn || '',
                newOut: selectedRequest.requestedOut || '',
                adminNote: '',
            });
        }
    }, [selectedRequest]);

    const handleChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        if (!formData.newIn && !formData.newOut) {
            alert('يرجى إدخال وقت دخول أو خروج جديد.');
            return;
        }

        const updatedData = {
            ...selectedRequest,
            newIn: formData.newIn,
            newOut: formData.newOut,
            adminNote: formData.adminNote.trim(),
            status: 'مقبول',
        };

        onSave?.(updatedData);
        onClose?.();
    }, [formData, selectedRequest, onSave, onClose]);

    if (!selectedRequest) return null;

    return (
        <Modal show={show} onHide={onClose} centered dir="rtl">
            <Modal.Header closeButton className="border-0" style={{ backgroundColor: theme.colors.grayBg }}>
                <Modal.Title className="fw-bold" style={{ color: theme.colors.accent }}>
                         تعديل وقت الموظف
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Label className="fw-semibold">وقت الدخول الجديد</Form.Label>
                            <TimePicker
                                className="custom-timepicker"
                                onChange={(val) => handleChange('newIn', val)}
                                value={formData.newIn}
                                format="h:mm a"
                                locale="en-US"
                                clearIcon={null}
                                clockIcon={null}
                                disableClock
                            />
                        </Col>

                        <Col md={6}>
                            <Form.Label className="fw-semibold">وقت الخروج الجديد</Form.Label>
                            <TimePicker
                                className="custom-timepicker"
                                onChange={(val) => handleChange('newOut', val)}
                                value={formData.newOut}
                                format="h:mm a"
                                locale="en-US"
                                clearIcon={null}
                                clockIcon={null}
                                disableClock
                            />
                        </Col>

                        <Col md={12}>
                            <Form.Label className="fw-semibold">ملاحظة إدارية (اختياري)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.adminNote}
                                onChange={(e) => handleChange('adminNote', e.target.value)}
                                placeholder="مثال: تم التأخير بسبب اجتماع خارجي"
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer className="border-0" style={{ backgroundColor: theme.colors.grayBg }}>
                <Button variant="outline-secondary" onClick={onClose}>
                    <BiXCircle className="me-1" />
                    إلغاء
                </Button>
                <Button
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent,
                    }}
                    onClick={handleSubmit}
                >
                    <BiSave className="me-1" />
                    حفظ التعديل
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTimeModal;
