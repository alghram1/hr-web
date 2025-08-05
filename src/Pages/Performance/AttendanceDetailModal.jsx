import React from 'react';
import { Modal, Button, Table, Row, Col, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ الهوية البصرية الرسمية

const AttendanceDetailModal = ({ show, onHide, employeeName, details }) => {

    const totalPresent = details.filter(entry => entry.status === 'حاضر').length;
    const totalAbsent = details.filter(entry => entry.status === 'غائب').length;
    const totalLate = details.filter(entry => entry.late).length;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'حاضر':
                return (
                    <Badge
                        style={{ backgroundColor: theme.colors.accent, padding: '8px', color: '#fff' }}
                    >
                        ✅ حاضر
                    </Badge>
                );
            case 'غائب':
                return (
                    <Badge bg="secondary" className="p-2">
                        ❌ غائب
                    </Badge>
                );
            case 'متأخر':
                return (
                    <Badge style={{ backgroundColor: '#ffc107', padding: '8px', color: '#000' }}>
                        ⚠️ متأخر
                    </Badge>
                );
            default:
                return <Badge bg="secondary" className="p-2">—</Badge>;
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered dir="rtl">
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold" style={{ color: theme.colors.accent }}>
                    📋 تفاصيل الحضور - {employeeName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* 🔵 ملخص سريع أعلى المودال */}
                <Row className="text-center mb-4">
                    <Col>
                        <h6 className="fw-bold" style={{ color: theme.colors.accent }}>الحضور</h6>
                        <p className="text-muted mb-0">{totalPresent} يوم</p>
                    </Col>
                    <Col>
                        <h6 className="fw-bold text-secondary">الغياب</h6>
                        <p className="text-muted mb-0">{totalAbsent} يوم</p>
                    </Col>
                    <Col>
                        <h6 className="fw-bold text-warning">التأخير</h6>
                        <p className="text-muted mb-0">{totalLate} يوم</p>
                    </Col>
                </Row>

                {/* جدول التفاصيل */}
                {details?.length > 0 ? (
                    <div className="table-responsive">
                        <Table bordered hover className="text-center align-middle shadow-sm rounded-3 overflow-hidden">
                            <thead className="table-light">
                                <tr>
                                    <th>اليوم</th>
                                    <th>الحالة</th>
                                    <th>وقت الحضور</th>
                                    <th>تأخير</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="fw-bold">{entry.date}</td>
                                        <td>{getStatusBadge(entry.status)}</td>
                                        <td>{entry.time || '—'}</td>
                                        <td>
                                            {entry.late ? (
                                                <Badge style={{ backgroundColor: '#ffc107', padding: '8px', color: '#000' }}>
                                                    تأخير
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    style={{ backgroundColor: theme.colors.accent, padding: '8px', color: '#fff' }}
                                                >
                                                    لا يوجد
                                                </Badge>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-muted text-center py-5">🚫 لا توجد بيانات حضور مفصلة خلال الدورة المحددة.</div>
                )}
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button variant="secondary" onClick={onHide}>إغلاق</Button>
            </Modal.Footer>
        </Modal>
    );
};

AttendanceDetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    employeeName: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            time: PropTypes.string,
            late: PropTypes.bool,
        })
    ).isRequired,
};

export default AttendanceDetailModal;
