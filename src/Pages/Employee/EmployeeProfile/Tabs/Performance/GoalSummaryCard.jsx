import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import theme from '../../../../../theme'; // ← تأكد من صحة المسار

const GoalSummaryCard = ({ goalsData }) => {
    const navigate = useNavigate();

    const handleViewGoals = () => {
        navigate('/employees/Goals');
    };

    if (!goalsData) {
        return (
            <Card className="border-0 shadow-sm h-100 text-center py-5">
                <Card.Body style={{ color: theme.colors.grayDark }}>
                    لا توجد بيانات متاحة للأهداف
                </Card.Body>
            </Card>
        );
    }

    const { count = 0, weight = 0, needsReview = false } = goalsData;

    const getWeightColor = () => {
        if (weight === 100) return theme.colors.success;
        if (weight > 100) return theme.colors.danger;
        if (weight < 100) return theme.colors.warning;
        return theme.colors.grayDark;
    };

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="fw-bold mb-0" style={{ color: theme.colors.accent }}>الأهداف</h6>
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleViewGoals}
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff'
                        }}
                    >
                        عرض الأهداف
                    </Button>
                </div>

                {needsReview && (
                    <div
                        className="p-2 rounded mb-3 small fw-semibold"
                        style={{
                            backgroundColor: theme.colors.soft.warning,
                            color: theme.colors.warning
                        }}
                    >
                        ⚠️ الأوزان تحتاج المراجعة. يجب أن يكون الوزن الكلي يساوي 100٪ قبل تأكيد الأهداف.
                    </div>
                )}

                <div className="d-flex justify-content-between small" style={{ color: theme.colors.grayDark }}>
                    <span>تمت إضافة الأهداف</span>
                    <span>إجمالي الأوزان</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-1">
                    <h4 className="fw-bold mb-0" style={{ color: theme.colors.textDark }}>{count}</h4>
                    <h4 className="fw-bold mb-0" style={{ color: getWeightColor() }}>{weight}%</h4>
                </div>
            </Card.Body>
        </Card>
    );
};

export default GoalSummaryCard;
