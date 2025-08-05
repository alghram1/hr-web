import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TaskWidget = ({ todayCount = 0, weekCount = 0, overdueCount = 0 }) => {
    const [tab, setTab] = useState("assigned");
    const navigate = useNavigate();

    // 🎨 ألوان الهوية
    const primary = '#02365B';
    const accent = '#00BAC6';
    const muted = '#6C757D';

    const tabs = [
        { id: "assigned", label: "معين لي" },
        { id: "created", label: "أنشأتها أنا" },
    ];

    const boxStyle = {
        base: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: '0.5rem',
        },
        today: {
            backgroundColor: '#FFF3CD',
            border: '1px solid #FFEEBA',
            dot: '🟡',
            label: 'يجب إنجازه اليوم',
            count: todayCount,
        },
        week: {
            backgroundColor: '#DBE9FF',
            border: '1px solid #C7DBFF',
            dot: '🔵',
            label: 'مستحق خلال 7 أيام',
            count: weekCount,
        },
        late: {
            backgroundColor: '#F8D7DA',
            border: '1px solid #F5C6CB',
            dot: '🔴',
            label: 'متأخرة',
            count: overdueCount,
        },
    };

    const handleViewAllTasks = () => {
        navigate('/dashboard/Tasks/TaskManagerPage');
    };

    return (
        <Col xs={12}>
            <Card className="shadow-sm border-0">
                <Card.Body className="p-3">

                    {/* ✅ التبويبات - بتنسيق تركوازي للتاب النشط */}
                    <div className="d-flex justify-content-start gap-4 mb-4 border-bottom pb-2">
                        {tabs.map(tabItem => {
                            const isActive = tab === tabItem.id;
                            return (
                                <div
                                    key={tabItem.id}
                                    onClick={() => setTab(tabItem.id)}
                                    className="fw-bold pb-1"
                                    style={{
                                        cursor: 'pointer',
                                        color: isActive ? accent : muted,
                                        borderBottom: isActive ? `2px solid ${accent}` : '2px solid transparent',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {tabItem.label}
                                </div>
                            );
                        })}
                    </div>

                    {/* ✅ صناديق الحالات */}
                    <div className="d-flex flex-column gap-3">
                        {[boxStyle.today, boxStyle.week, boxStyle.late].map((box, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...boxStyle.base,
                                    backgroundColor: box.backgroundColor,
                                    border: box.border,
                                }}
                            >
                                <span className="fw-bold" style={{ color: primary }}>{box.dot} {box.label}</span>
                                <span
                                    className="badge rounded-pill"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        color: primary,
                                        fontWeight: 500,
                                    }}
                                >
                                    tasks {box.count}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ✅ زر عرض الكل */}
                    <div className="text-center mt-4">
                        <Button
                            size="sm"
                            className="fw-bold"
                            onClick={handleViewAllTasks}
                            style={{
                                color: accent,
                                borderColor: accent,
                                borderWidth: '1.5px',
                                backgroundColor: '#ffffff',
                            }}
                            variant="outline"
                        >
                            عرض جميع المهام
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default TaskWidget;
