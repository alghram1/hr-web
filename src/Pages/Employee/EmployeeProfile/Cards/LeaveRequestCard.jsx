// LeaveRequestCard.jsx
import React from 'react';
import { Card, Row, Col, Badge, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { BsCalendarEvent, BsClockHistory, BsCheckCircle, BsXCircle } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


const statusConfig = {
    'مقبولة': { bg: 'success', icon: <BsCheckCircle /> },
    'مرفوضة': { bg: 'danger', icon: <BsXCircle /> },
    'قيد الانتظار': { bg: 'secondary', icon: <BsClockHistory /> }
};

const LeaveRequestCard = ({ request }) => {
    const {
        type,
        from,
        to,
        days,
        status,
        approvedBy,
        requestedBy,
        requestDate,
        avatar
    } = request;

    const start = dayjs(from);
    const isUpcoming = start.isAfter(dayjs());
    const daysUntil = start.diff(dayjs(), 'day');
    const statusInfo = statusConfig[status] || { bg: 'light', icon: null };

    return (
        
        
        <Card className="mb-4 shadow-sm border-0" style={{ borderRight: '5px solid #198754', borderRadius: 14 }}>
            <Card.Body dir="rtl">
                <Row className="align-items-center g-4">

                    {/* الصورة الرمزية والمقدم */}
                    <Col md={2} className="text-center">
                        <Image
                            src={avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="border mb-2"
                            alt="avatar"
                        />
                        <div className="small text-muted">بواسطة</div>
                        <div className="fw-semibold">{requestedBy}</div>
                    </Col>

                    {/* تفاصيل الطلب */}
                    <Col md={6}>
                        <div className="fw-bold fs-6 text-dark">{type}</div>
                        <div className="text-muted small">
                            {from} - {to} ({days} يوم)
                        </div>
                        {isUpcoming && (
                            <div className="text-info small mt-1">
                                تبدأ بعد {daysUntil} يوم ({start.fromNow()})
                            </div>
                        )}
                        <div className="text-muted small mt-2">
                            <BsCalendarEvent className="me-1" /> تاريخ التقديم: {requestDate}
                        </div>
                        <div className="text-muted small mt-1">
                            {approvedBy ? (
                                <>تمت الموافقة بواسطة <strong>{approvedBy}</strong></>
                            ) : (
                                <>بانتظار الموافقة</>
                            )}
                        </div>
                    </Col>

                    {/* حالة الطلب */}
                    <Col md={4} className="text-center">
                        <OverlayTrigger overlay={<Tooltip>{status}</Tooltip>}>
                            <div className="d-inline-flex flex-column align-items-center">
                                <div
                                    className={`bg-${statusInfo.bg} text-white d-flex align-items-center justify-content-center`}
                                    style={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: '50%',
                                        fontSize: 22
                                    }}
                                >
                                    {statusInfo.icon}
                                </div>
                                <Badge bg={statusInfo.bg} className="mt-2 px-3 py-1">{status}</Badge>
                            </div>
                        </OverlayTrigger>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default LeaveRequestCard;
