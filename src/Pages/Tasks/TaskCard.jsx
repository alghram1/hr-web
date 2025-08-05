import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

// ✅ دالة تحويل HEX إلى RGBA مدمجة داخل الملف
const hexToRgba = (hex, alpha = 1) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ✅ أنماط البطاقات باستخدام الهوية البصرية
const cardStyles = {
    unassigned: {
        bg: '#f8f9fa',
        border: '#dee2e6',
        dot: '⚫',
        textColor: 'text-muted',
    },
    overdue: {
        bg: hexToRgba('#dc3545', 0.1), // أحمر شفاف
        border: '#dc3545',
        dot: '🔴',
        textColor: 'text-danger',
    },
    today: {
        bg: hexToRgba(theme.colors.accent, 0.1), // تركوازي شفاف من الثيم
        border: theme.colors.accent,
        dot: '🟡',
        textColor: 'text-info',
    },
    assigned: {
        bg: hexToRgba(theme.colors.primary, 0.1), // كحلي شفاف من الثيم
        border: theme.colors.primary,
        dot: '🔵',
        textColor: 'text-primary',
    },
};

const TaskCard = ({ type = 'unassigned', count = 0 }) => {
    const { bg, border, dot, textColor } = cardStyles[type] || cardStyles.unassigned;
    const labels = {
        unassigned: 'المهام غير المعينة',
        overdue: 'المهام المتأخرة',
        today: 'المهام المستحقة اليوم',
        assigned: 'المهام المعينة',
    };

    return (
        <Card
            className="shadow-sm border-0"
            style={{
                backgroundColor: bg,
                border: `1px solid ${border}`,
                borderRadius: '0.75rem',
                minHeight: '70px',
            }}
        >
            <Card.Body className="d-flex justify-content-between align-items-center px-3 py-2">
                <div className="d-flex align-items-center gap-2">
                    <span className={`fw-bold ${textColor}`}>{dot}</span>
                    <span className="fw-semibold text-dark small">{labels[type]}</span>
                </div>
                <span
                    className="rounded-circle bg-light text-dark fw-bold"
                    style={{
                        width: '32px',
                        height: '32px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {count}
                </span>
            </Card.Body>
        </Card>
    );
};

TaskCard.propTypes = {
    type: PropTypes.oneOf(['unassigned', 'overdue', 'today', 'assigned']),
    count: PropTypes.number,
};

export default TaskCard;
