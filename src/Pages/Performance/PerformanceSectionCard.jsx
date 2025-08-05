import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ استيراد ملف الألوان

const PerformanceSectionCard = ({ label, score }) => {
    const normalizedScore = Number(score ?? 0).toFixed(1);

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body className="py-3 px-4 text-end" style={{ direction: 'rtl' }}>

                {/* ✅ عنوان + النسبة */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold" style={{ color: theme.colors.text }}>
                        {label}
                    </span>
                    <span className="small" style={{ color: theme.colors.grayDark }}>
                        {normalizedScore}%
                    </span>
                </div>

                {/* ✅ شريط التقدم بلون الهوية */}
                <ProgressBar
                    now={normalizedScore}
                    style={{
                        height: '10px',
                        borderRadius: '10px',
                        backgroundColor: theme.colors.grayBg
                    }}
                >
                    <ProgressBar
                        now={normalizedScore}
                        style={{
                            backgroundColor: theme.colors.accent
                        }}
                    />
                </ProgressBar>
            </Card.Body>
        </Card>
    );
};

PerformanceSectionCard.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number,
};

export default PerformanceSectionCard;
