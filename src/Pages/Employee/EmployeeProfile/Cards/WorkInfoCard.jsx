// Pages/Employee/EmployeeProfile/Cards/WorkInfoCard.jsx
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

// 🎨 ألوان الهوية البصرية
const brandPrimary = '#02365B'; // الكحلي
const brandAccent = '#00BAC6';  // التركوازي

const WorkInfoCard = () => {
    const workInfo = [
        ['نوع الوظيفة', 'وقت كامل'],
        ['تاريخ التوظيف', '2024-04-27'],
        ['تاريخ انتهاء فترة التجربة', 'غير متاح'],
        ['أسبوع العمل', 'Default'],
        ['مكان العمل', 'الرياض'],
        ['توقيت العمل', '09:00 ص - 06:00 م'],
        ['مكتب', 'King Khalid Airport - Terminal 1'],
        ['مكتب إضافي لتسجيل الدخول/الخروج', 'غير متاح'],
        ['المدير المباشر', 'غير متاح'],
        ['دولة الإقامة القانونية', 'غير متاح'],
    ];

    const workSettings = [
        ['يدير الإجازات لفريقه', false],
        ['تتطلب قرارات الإجازة موافقة إضافية', false],
    ];

    return (
        <Card
            className="shadow-sm border-0 mb-3"
            style={{ maxWidth: 600, direction: 'rtl' }}
        >
            <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: `3px solid ${brandAccent}`,
                }}
            >
                <h5 className="mb-0 fw-bold" style={{ color: brandAccent }}>
                    معلومات العمل
                </h5>
                <Button
                    variant="outline"
                    size="sm"
                    className="fw-bold"
                    style={{
                        borderColor: brandAccent,
                        color: brandAccent,
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    تعديل
                </Button>
            </Card.Header>

            <Card.Body className="d-flex flex-column gap-3 p-4">
                {workInfo.map(([label, value], index) => (
                    <div key={index}>
                        <div className="text-muted small mb-1">{label}</div>
                        <div className="fw-semibold">{value}</div>
                    </div>
                ))}

                <hr />

                {workSettings.map(([label, checked], index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        label={label}
                        checked={checked}
                        disabled
                        className="fw-semibold"
                    />
                ))}
            </Card.Body>
        </Card>
    );
};

export default WorkInfoCard;
