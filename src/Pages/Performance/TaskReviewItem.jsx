import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import theme from '../../theme'; // ✅ الهوية البصرية الرسمية

const TaskReviewItem = ({ task }) => {
    if (!task) return null;

    const {
        title,
        dueDate,
        status,
        employeeComment,
        supervisorComment,
        supervisorRating,
        linkedGoal,
        weight,
        employeeName,
        supervisorName
    } = task;

    const getStatusColor = (status) => {
        switch (status) {
            case 'مكتملة': return theme.colors.accent;
            case 'قيد التنفيذ': return theme.colors.accent;
            case 'متأخرة': return theme.colors.danger;
            default: return theme.colors.grayDark;
        }
    };

    return (
        <Card className="border-0 shadow-sm mb-4" dir="rtl" style={{ backgroundColor: theme.colors.white }}>
            <Card.Body>

                {/* 🧾 رأس المهمة */}
                <Row className="align-items-start">
                    <Col md={8}>
                        <h5 className="fw-bold" style={{ color: theme.colors.textDark }}>{title}</h5>
                        <div className="text-muted small mb-1">📅 تاريخ الاستحقاق: {dueDate}</div>

                        {linkedGoal && (
                            <div className="text-muted small">
                                🎯 مرتبط بالهدف: <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{linkedGoal}</span>
                            </div>
                        )}

                        {employeeName && (
                            <div className="text-muted small">
                                👤 الموظف المسؤول: <span style={{ fontWeight: 'bold', color: theme.colors.textDark }}>{employeeName}</span>
                            </div>
                        )}
                    </Col>

                    <Col md={4} className="text-md-end text-start mt-3 mt-md-0">
                        <Badge
                            style={{
                                backgroundColor: getStatusColor(status),
                                padding: '8px 12px',
                                fontSize: '0.95rem',
                                borderRadius: '6px',
                                color: '#fff'
                            }}
                        >
                            {status}
                        </Badge>
                        {weight && (
                            <div className="text-muted small mt-2">⚖️ الوزن: {weight}%</div>
                        )}
                    </Col>
                </Row>

                <hr className="my-3" />

                {/* 🗣️ ملاحظات الموظف */}
                <Row className="mb-3">
                    <Col>
                        <h6 className="text-muted small mb-1">🧑‍💼 ملاحظات الموظف:</h6>
                        <div style={{ color: theme.colors.textDark }}>{employeeComment || '—'}</div>
                    </Col>
                </Row>

                {/* 🧑‍🏫 تقييم المشرف */}
                <Row>
                    <Col>
                        <h6 className="text-muted small mb-1">👨‍🏫 تقييم المشرف:</h6>
                        {supervisorName && (
                            <div className="text-muted small mb-1">
                                👤 المشرف: <span className="fw-bold" style={{ color: theme.colors.textDark }}>{supervisorName}</span>
                            </div>
                        )}
                        <div style={{ color: theme.colors.textDark, marginBottom: '10px' }}>
                            {supervisorComment || '—'}
                        </div>
                        {typeof supervisorRating === 'number' && (
                            <ProgressBar
                                now={supervisorRating}
                                label={`${supervisorRating}%`}
                                variant="accent"
                                style={{
                                    height: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: theme.colors.grayBorder
                                }}
                            />
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

TaskReviewItem.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        employeeComment: PropTypes.string,
        supervisorComment: PropTypes.string,
        supervisorRating: PropTypes.number,
        linkedGoal: PropTypes.string,
        weight: PropTypes.number,
        employeeName: PropTypes.string,
        supervisorName: PropTypes.string
    }).isRequired
};

export default TaskReviewItem;
