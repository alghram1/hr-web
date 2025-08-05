import React, { useEffect, useState } from 'react';
import theme from '../../theme'; // ← استيراد الهوية الرسمية

const CircularProgressEmployee = ({
    percentage = 0,
    size = 38,
    stroke = 5,
    color = theme.colors.accent,              // ✅ تركوازي معتمد
    bgColor = theme.colors.accentLight,       // ✅ خلفية مشتقة من الهوية
    fontSize = 12,
    duration = 1000,
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(percentage), 100);
        return () => clearTimeout(timeout);
    }, [percentage]);

    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} style={{ display: 'block' }}>
            {/* ✅ الدائرة الخلفية */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={bgColor}
                strokeWidth={stroke}
            />

            {/* ✅ الدائرة المتقدمة */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{
                    transition: `stroke-dashoffset ${duration}ms ease-out`,
                }}
            />

            {/* ✅ النص داخل الدائرة */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill={color}
            >
                {progress}%
            </text>
        </svg>
    );
};

export default CircularProgressEmployee;
