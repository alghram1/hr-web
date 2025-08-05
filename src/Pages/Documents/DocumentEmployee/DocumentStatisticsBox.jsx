import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const DocumentStatisticsBox = ({ stats }) => {
    const {
        total = 0,
        valid = 0,
        expiringSoon = 0,
        expired = 0
    } = stats || {};

    const statStyle = {
        iconSize: 22,
        fontSize: '1.1rem',
        fontWeight: '600',
    };

    const boxData = [
        {
            title: 'سارية',
            value: valid,
            icon: <FaCheckCircle color={theme.colors.accent} size={statStyle.iconSize} />,
            badgeColor: theme.colors.accent,
        },
        {
            title: 'تنتهي قريباً',
            value: expiringSoon,
            icon: <FaExclamationTriangle color={theme.colors.warning} size={statStyle.iconSize} />,
            badgeColor: theme.colors.warning,
        },
        {
            title: 'منتهية',
            value: expired,
            icon: <FaClock color={theme.colors.danger} size={statStyle.iconSize} />,
            badgeColor: theme.colors.danger,
        },
    ];

    return (
        <Card className="mb-4 shadow-sm" dir="rtl">
            <Card.Body>
                <h5 className="fw-bold mb-3" style={{ color: theme.colors.primary }}>
                    📊 إحصائيات المستندات
                </h5>

                <Row className="text-center">
                    {boxData.map((box, idx) => (
                        <Col key={idx} xs={12} md={4} className="mb-3 mb-md-0">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                {box.icon}
                                <div>
                                    <span className="d-block" style={{ fontWeight: 'bold', color: theme.colors.grayDark }}>
                                        {box.title}
                                    </span>
                                    <Badge
                                        pill
                                        style={{
                                            backgroundColor: box.badgeColor,
                                            color: '#fff',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {box.value}
                                    </Badge>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <div className="text-center mt-3 text-muted fw-light">
                    إجمالي المستندات: <strong>{total}</strong>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DocumentStatisticsBox;
