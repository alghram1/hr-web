import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ استيراد ملف الهوية البصرية

const PerformanceHeaderSection = ({ cycle }) => {
    if (!cycle || !cycle.label || !cycle.from || !cycle.to) return null;

    return (
        <Card className="shadow-sm border-0 mb-4 bg-white">
            <Card.Body>
                <Row className="align-items-center gy-3 text-end flex-column-reverse flex-md-row">

                    {/* ✅ تفاصيل الدورة */}
                    <Col md={8}>
                        <h5
                            className="fw-bold mb-1"
                            style={{ color: theme.colors.text }}
                        >
                            تقييم الأداء
                        </h5>
                        <div className="small" style={{ color: theme.colors.grayDark }}>
                            <div>
                                <strong style={{ color: theme.colors.text }}>الدورة الحالية:</strong> {cycle.label}
                            </div>
                            <div>
                                <strong style={{ color: theme.colors.text }}>الفترة:</strong> {cycle.from} - {cycle.to}
                            </div>
                            {cycle.status && (
                                <div>
                                    <strong style={{ color: theme.colors.text }}>الحالة:</strong>{' '}
                                    <span style={{ color: theme.colors.primary }}>{cycle.status}</span>
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* ✅ التقييم النهائي */}
                    <Col md={4} className="text-center">
                        <div
                            className="rounded py-3 px-2"
                            style={{ backgroundColor: theme.colors.grayBg }}
                        >
                            <div className="small" style={{ color: theme.colors.grayDark }}>
                                المجموع النهائي
                            </div>
                            <div
                                className="fw-bold display-6"
                                style={{ color: theme.colors.success }}
                            >
                                {cycle.totalScore}%
                            </div>
                            <div className="mt-1">{cycle.ratingBadge}</div>
                        </div>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

PerformanceHeaderSection.propTypes = {
    cycle: PropTypes.shape({
        label: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        totalScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ratingBadge: PropTypes.node,
        status: PropTypes.string,
    }),
};

export default PerformanceHeaderSection;
