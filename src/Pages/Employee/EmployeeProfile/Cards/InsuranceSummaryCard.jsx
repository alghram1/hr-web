import React from 'react';
import { Card, Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsCalendarCheck, BsCalendarX, BsPaperclip } from 'react-icons/bs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import theme from '../../../../theme'; // ← تأكد من صحة المسار حسب المشروع

dayjs.extend(duration);
dayjs.extend(relativeTime);

const InsuranceSummaryCard = ({ insurance }) => {
    const {
        company,
        policyNumber,
        planType,
        startDate,
        endDate,
        attachmentUrl,
        status
    } = insurance;

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const today = dayjs();
    const remainingDays = end.diff(today, 'day');
    const isActive = remainingDays >= 0;

    const statusVariant = isActive ? 'accent' : 'danger';
    const statusColor = isActive ? theme.colors.accent : theme.colors.danger;

    return (
        <Card
            className="mb-4 shadow-sm border-0"
            style={{
                borderRight: `5px solid ${theme.colors.accent}`,
                borderRadius: 14
            }}
        >
            <Card.Body dir="rtl">
                <Row className="align-items-center g-4">

                    {/* بيانات الوثيقة */}
                    <Col md={4}>
                        <h6 className="fw-bold text-dark mb-1">شركة التأمين: {company}</h6>
                        <div className="text-muted small mb-1">نوع الخطة: {planType}</div>
                        <div className="text-muted small">رقم الوثيقة: <strong>{policyNumber}</strong></div>
                    </Col>

                    {/* التواريخ */}
                    <Col md={5}>
                        <div className="text-muted small mb-1">
                            <BsCalendarCheck className="me-1" /> تاريخ البداية: {start.format('YYYY-MM-DD')}
                        </div>
                        <div className="text-muted small mb-1">
                            <BsCalendarX className="me-1" /> تاريخ الانتهاء: {end.format('YYYY-MM-DD')}
                        </div>
                        <div className="fw-semibold small" style={{ color: statusColor }}>
                            {isActive
                                ? `سارية المفعول (${remainingDays} يوم متبقي)`
                                : `منتهية منذ ${Math.abs(remainingDays)} يوم`}
                        </div>
                    </Col>

                    {/* الحالة والمرفق */}
                    <Col md={3} className="text-center">
                        <OverlayTrigger
                            overlay={<Tooltip>{isActive ? 'نشطة' : 'منتهية'}</Tooltip>}
                        >
                            <div>
                                <Badge
                                    bg={statusVariant}
                                    className="px-3 py-2 fs-6"
                                    style={{
                                        backgroundColor: statusColor,
                                        opacity: 0.85
                                    }}
                                >
                                    {isActive ? 'نشطة' : 'منتهية'}
                                </Badge>
                            </div>
                        </OverlayTrigger>

                        {attachmentUrl && (
                            <div className="mt-3">
                                <a
                                    href={attachmentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm fw-semibold"
                                    style={{
                                        backgroundColor: theme.colors.accent,
                                        borderColor: theme.colors.accent,
                                        color: '#fff'
                                    }}
                                >
                                    <BsPaperclip className="me-1" /> عرض الوثيقة
                                </a>
                            </div>
                        )}

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default InsuranceSummaryCard;
