import React from 'react';
import { Card, Button } from 'react-bootstrap';
import theme from '../../../../theme'; // تأكد من المسار الصحيح حسب المشروع

const ContactInfoCard = () => {
    return (
        <Card className="shadow-sm border-0 mb-3" style={{ maxWidth: 600 }}>
            <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                    backgroundColor: theme.colors.grayBg,
                    borderBottom: `2px solid ${theme.colors.accent}`
                }}
            >
                <h5 className="mb-0 fw-bold" style={{ color: theme.colors.accent }}>
                    تواصل
                </h5>
                <Button
                    variant="outline-success"
                    size="sm"
                    className="fw-bold"
                    style={{
                        color: theme.colors.accent,
                        borderColor: theme.colors.accent
                    }}
                >
                    تعديل
                </Button>
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-3 p-4">
                {[
                    ['رقم الهاتف المحمول', '+962799242839'],
                    ['البريد الإلكتروني الشخصي', 'Eng.Abdulrahman@OroomUnit.com'],
                    ['رقم هاتف العمل', 'غير متاح'],
                    ['البريد الإلكتروني للعمل', 'Eng.Abdulrahman@OroomUnit.com'],
                    ['العنوان الشخصي', 'Riyadh / SA'],
                ].map(([label, value], idx) => (
                    <div key={idx}>
                        <div className="text-muted small mb-1">{label}</div>
                        <div className="fw-semibold">{value}</div>
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
};

export default ContactInfoCard;
