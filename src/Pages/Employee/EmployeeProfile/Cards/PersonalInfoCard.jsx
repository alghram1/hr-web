// Pages/Employee/EmployeeProfile/Cards/PersonalInfoCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// 🎨 ألوان الهوية
const brandPrimary = '#02365B'; // الكحلي
const brandAccent = '#00BAC6';  // التركوازي

const PersonalInfoCard = () => {
    return (
        <Card
            className="shadow-sm border-0 mb-3"
            style={{ maxWidth: 600 }}
        >
            <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: `3px solid ${brandAccent}`,
                }}
            >
                <h5 className="mb-0 fw-bold" style={{ color: brandAccent }}>
                    معلومات شخصية
                </h5>
                <Button
                    variant="outline"
                    size="sm"
                    className="fw-bold"
                    style={{
                        color: brandAccent,
                        borderColor: brandAccent,
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    تعديل
                </Button>
            </Card.Header>

            <Card.Body className="d-flex flex-column gap-3 p-4">
                {[
                    ['الاسم المفضل', 'غير متاح'],
                    ['الاسم الأول', 'abdulrahman'],
                    ['اسم العائلة', 'AlGhram'],
                    ['تاريخ الميلاد', '1997-04-04'],
                    ['الجنسية', 'يمني'],
                    ['الجنس', 'ذكر'],
                    ['الحالة الاجتماعية', 'أعزب'],
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

export default PersonalInfoCard;
