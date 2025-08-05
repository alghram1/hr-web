import React from 'react';
import theme from '../../../../../theme'; // تأكد من المسار الصحيح حسب هيكل مشروعك

const LeaveProgressCircle = ({
    title = '',
    available = null,
    used = null,
    unit = '',
    color = theme.colors.accent // ← الآن اللون الافتراضي مركزي
}) => {
    const size = 150;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const isValid = typeof available === 'number' && typeof used === 'number';
    const progress = isValid && available > 0 ? (used / available) * 100 : 0;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <div className="text-center">
            <svg width={size} height={size} style={{ marginBottom: '1rem' }}>
                <circle
                    stroke={theme.colors.grayBorder}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {isValid && (
                    <circle
                        stroke={color}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                )}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="20"
                    fontWeight="bold"
                    fill={theme.colors.textDark}
                >
                    {isValid ? `${available}` : 'غير متاح'}
                </text>
            </svg>

            {isValid && (
                <div className="text-muted small mb-1">
                    {unit}<br />
                    المستخدمة {used} من {available}
                </div>
            )}

            <div className="fw-bold">{title}</div>

            <div className="mt-1">
                <button
                    className="btn btn-link btn-sm fw-semibold p-0"
                    style={{
                        color: theme.colors.accent,
                        textDecoration: 'none'
                    }}
                >
                    تعديل
                </button>
            </div>
        </div>
    );
};

export default LeaveProgressCircle;
