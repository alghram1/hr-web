import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import theme from '../../../../theme'; // تأكد من صحة المسار

const items = [
    ['توثيق قوي', 'غير متاح'],
    ['مقاس التيشيرت', 'غير متاح'],
    ['كفالة الموظف', 'غير متاح'],
    ['السجل التجاري', 'غير متاح'],
    ['فرع', 'غير متاح'],
    ['شركة الاستقدام', 'غير متاح'],
    ['ذوي احتياجات خاصة', 'غير متاح'],
];

const AdditionalInfoCard = () => {
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
                    بيانات إضافية
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
                {items.map(([label, value], idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="text-muted small mb-1">{label}</div>
                            <div className="fw-semibold">{value}</div>
                        </div>
                        <Badge
                            className="px-2 py-1 rounded-pill"
                            style={{
                                backgroundColor: theme.colors.warning,
                                color: theme.colors.textDark
                            }}
                        >
                            الرجاء ملء
                        </Badge>
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
};

export default AdditionalInfoCard;
