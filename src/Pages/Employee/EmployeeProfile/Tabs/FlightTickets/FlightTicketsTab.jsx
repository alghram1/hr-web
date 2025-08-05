import React from 'react';
import { Card, Row, Col, Button, Badge, Table } from 'react-bootstrap';
import { BsGift } from 'react-icons/bs';
import theme from '../../../../../theme'; // تأكد من المسار الصحيح حسب مشروعك

// 🧪 بيانات مؤقتة (قابلة للربط لاحقًا)
const policyStatus = false;
const flightStats = {
    remainingFlights: '-',
    remainingAllowance: '-',
    coverage: '-'
};
const requests = [];

const FlightTicketsTab = () => {
    return (
        <div className="pt-4 px-3" dir="rtl">

            {/* 1. عنوان الصفحة + زر */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4  style={{ color: theme.colors.accent }}>طلبات تذاكر الطيران</h4>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={!policyStatus}
                    style={{
                        borderColor: theme.colors.accent,
                        color: theme.colors.accent
                    }}
                >
                    طلب تذكرة طيران
                </Button>
            </div>

            {/* 2. كروت الإحصائيات */}
            <Row className="g-3 mb-4">
                <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="text-muted small">حالة السياسة</div>
                            <div className="fw-bold mt-2" style={{ color: policyStatus ? theme.colors.success : theme.colors.danger }}>
                                {policyStatus ? 'نشطة' : 'غير نشطة'}
                            </div>
                            {!policyStatus && (
                                <div className="small mt-2 text-muted">
                                    لم تتم إضافتك إلى السياسة
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="text-muted small">طلبات التذاكر الجوية المتبقية</div>
                            <div className="fw-bold mt-2">{flightStats.remainingFlights}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="text-muted small">رصيد البدل المتبقي</div>
                            <div className="fw-bold mt-2">{flightStats.remainingAllowance}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="text-muted small">تشمل التغطية</div>
                            <div className="fw-bold mt-2">{flightStats.coverage}</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* 3. جدول الطلبات */}
            <Card className="border-0 shadow-sm">
                <Card.Header
                    style={{
                        backgroundColor: theme.colors.grayBg,
                        color: theme.colors.primary,
                        fontWeight: 'bold'
                    }}
                >
                    طلباتك السابقة
                </Card.Header>
                <Card.Body className="px-0">
                    <Table responsive hover className="mb-0 text-center small">
                        <thead style={{ backgroundColor: theme.colors.grayBg }}>
                            <tr className="text-dark">
                                <th>نوع الطلب</th>
                                <th>المقدار</th>
                                <th>تم إرساله</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-4 text-muted">
                                        لا تتوفر أي بيانات
                                    </td>
                                </tr>
                            ) : (
                                requests.map((r, i) => (
                                    <tr key={i}>
                                        <td>{r.type}</td>
                                        <td>{r.amount}</td>
                                        <td>{r.sentAt}</td>
                                        <td>
                                            <Badge
                                                style={{
                                                    backgroundColor:
                                                        r.status === 'مقبول'
                                                            ? theme.colors.success
                                                            : r.status === 'مرفوض'
                                                                ? theme.colors.danger
                                                                : theme.colors.grayDark,
                                                    color: '#fff'
                                                }}
                                            >
                                                {r.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* زر عائم اختياري */}
            <Button
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    left: '30px',
                    backgroundColor: theme.colors.accent,
                    border: 'none',
                    borderRadius: '50%',
                    width: '52px',
                    height: '52px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                }}
                title="مزايا السفر"
            >
                <BsGift size={24} />
            </Button>
        </div>
    );
};

export default FlightTicketsTab;
