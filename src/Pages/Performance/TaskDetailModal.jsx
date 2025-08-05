import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table, Badge, ProgressBar } from 'react-bootstrap';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

const TaskDetailModal = ({ show, onHide, employeeName, tasks }) => {
    const getStatusVariant = (status) => {
        switch (status) {
            case 'مكتملة': return theme.colors.accent;
            case 'قيد التنفيذ': return theme.colors.accent;
            case 'متأخرة': return theme.colors.danger || '#dc3545';
            default: return theme.colors.grayDark;
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
            backdrop="static"
            keyboard={true}
            dir="rtl"
        >
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold" style={{ color: theme.colors.accent }}>
                    🗂️ تفاصيل تقييم المهام - {employeeName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {tasks && tasks.length > 0 ? (
                    <div className="table-responsive">
                        <Table
                            hover
                            className="text-center align-middle shadow-sm rounded-3 overflow-hidden"
                            style={{ backgroundColor: theme.colors.white }}
                        >
                            <thead style={{ backgroundColor: theme.colors.grayBg }}>
                                <tr>
                                    <th>اسم المهمة</th>
                                    <th>تاريخ الاستحقاق</th>
                                    <th>الحالة</th>
                                    <th>الهدف المرتبط</th>
                                    <th>الوزن (%)</th>
                                    <th>ملاحظات الموظف</th>
                                    <th>ملاحظات المشرف</th>
                                    <th>تقييم المشرف</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks.map((task, idx) => (
                                    <tr key={idx}>
                                        <td className="fw-semibold">{task.title}</td>
                                        <td>{task.dueDate}</td>
                                        <td>
                                            <Badge
                                                style={{
                                                    backgroundColor: getStatusVariant(task.status),
                                                    padding: '8px 12px',
                                                    color: '#fff',
                                                    fontSize: '0.85rem',
                                                    borderRadius: '6px'
                                                }}
                                            >
                                                {task.status}
                                            </Badge>
                                        </td>
                                        <td>{task.linkedGoal || '—'}</td>
                                        <td>{task.weight ? `${task.weight}%` : '—'}</td>
                                        <td className="text-muted small">{task.employeeComment || '—'}</td>
                                        <td className="text-muted small">{task.supervisorComment || '—'}</td>
                                        <td>
                                            {typeof task.supervisorRating === 'number' ? (
                                                <ProgressBar
                                                    now={task.supervisorRating}
                                                    label={`${task.supervisorRating}%`}
                                                    variant="accent"
                                                    style={{
                                                        height: '10px',
                                                        borderRadius: '8px',
                                                        backgroundColor: theme.colors.grayBorder
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-muted">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-5 text-muted">
                        🚫 لا توجد مهام لعرضها
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer className="border-0">
                <Button
                    className="px-4 fw-bold"
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent,
                        color: '#fff'
                    }}
                    onClick={onHide}
                >
                    إغلاق
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

TaskDetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    employeeName: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            employeeComment: PropTypes.string,
            supervisorComment: PropTypes.string,
            supervisorRating: PropTypes.number,
            linkedGoal: PropTypes.string,
            weight: PropTypes.number,
        })
    ).isRequired,
};

export default TaskDetailModal;
