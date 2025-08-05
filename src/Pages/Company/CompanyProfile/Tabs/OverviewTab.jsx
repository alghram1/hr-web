import React from 'react';
import { Row, Col, Card, Button, ListGroup, ProgressBar, Badge } from 'react-bootstrap';
import {
    BiStore, BiUser, BiGroup, BiCheckShield, BiPlus, BiRefresh,
    BiLinkAlt, BiFingerprint
} from 'react-icons/bi';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import theme from '../../../../theme'; // ✅ استيراد الهوية البصرية

const OverviewTab = ({
    stats = {
        branches: 12,
        employees: 87,
        activeUsers: 34,
        subscriptionStatus: 'نشط',
        subscriptionPlan: 'الباقة المتقدمة',
        joinedDate: '2024-10-01',
        renewalDaysLeft: 107,
        renewalProgress: 70,
        allowedSystems: ['قوى', 'مقيم', 'تأمينات', 'مدد'],
        enabledSystems: ['قوى', 'تأمينات'],
        attendanceMethods: ['تطبيق الموظف', 'جهاز البصمة'],
    },
    loginChart = {
        labels: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
        data: [22, 34, 28, 45, 37, 19, 40],
    }
}) => {

    const kpiCards = [
        { icon: <BiStore size={28} />, title: 'عدد الفروع', value: stats.branches },
        { icon: <BiUser size={28} />, title: 'عدد الموظفين', value: stats.employees },
        { icon: <BiGroup size={28} />, title: 'المستخدمين الفعالين', value: stats.activeUsers },
        { icon: <BiCheckShield size={28} />, title: 'الاشتراك', value: stats.subscriptionStatus },
    ];

    const chartData = {
        labels: loginChart.labels,
        datasets: [
            {
                label: 'تسجيلات الدخول',
                data: loginChart.data,
                fill: true,
                backgroundColor: `${theme.colors.accent}20`,
                borderColor: theme.colors.accent,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="p-2 p-md-3" dir="rtl">
            {/* ✅ بطاقات KPIs */}
            <Row className="gy-3 mb-4">
                {kpiCards.map((card, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow-sm border-0 rounded-4" style={{ backgroundColor: theme.colors.grayBg }}>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="fw-bold small mb-1 text-muted">{card.title}</div>
                                    <h5 className="mb-0" style={{ color: theme.colors.accent }}>{card.value}</h5>
                                </div>
                                <div style={{ opacity: 0.75, color: theme.colors.accent }}>{card.icon}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="gy-4">
                {/* 🧾 ملخص الاشتراك */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <Card.Title className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                📦 ملخص الاشتراك
                            </Card.Title>
                            <p><strong>الباقة:</strong> {stats.subscriptionPlan}</p>
                            <p><strong>تاريخ الانضمام:</strong> {stats.joinedDate}</p>
                            <p><strong>تجديد الاشتراك:</strong> بعد {stats.renewalDaysLeft} أيام</p>
                            <ProgressBar
                                now={stats.renewalProgress}
                                label={`${stats.renewalProgress}%`}
                                style={{ backgroundColor: `${theme.colors.grayBorder}` }}
                                variant="info" // يمكن تغييره إذا رغبت
                            />
                        </Card.Body>
                    </Card>
                </Col>

                {/* ⚡ إجراءات سريعة */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 rounded-4 mb-4">
                        <Card.Body>
                            <Card.Title className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                ⚡ إجراءات سريعة
                            </Card.Title>
                            <div className="d-grid gap-2">
                                <Button style={{ borderColor: theme.colors.accent, color: theme.colors.accent }} variant="outline" className="rounded-pill">
                                    <BiPlus className="ms-2" /> إضافة فرع جديد
                                </Button>
                                <Button style={{ borderColor: theme.colors.accent, color: theme.colors.accent }} variant="outline" className="rounded-pill">
                                    <BiRefresh className="ms-2" /> تحديث بيانات الاشتراك
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 📊 حركة تسجيل الدخول */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <Card.Title className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                📊 حركة تسجيل الدخول
                            </Card.Title>
                            <Line data={chartData} />
                        </Card.Body>
                    </Card>
                </Col>

                {/* 🔗 الأنظمة المتكاملة */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body>
                            <Card.Title className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                <BiLinkAlt className="ms-2" />الأنظمة المتكاملة
                            </Card.Title>
                            <ListGroup variant="flush">
                                {stats.allowedSystems.map((system, idx) => {
                                    const enabled = stats.enabledSystems.includes(system);
                                    return (
                                        <ListGroup.Item
                                            key={idx}
                                            style={{
                                                backgroundColor: enabled ? `${theme.colors.accent}10` : theme.colors.grayBg,
                                                borderRight: `4px solid ${enabled ? theme.colors.accent : theme.colors.grayBorder}`,
                                                color: enabled ? theme.colors.accent : theme.colors.grayDark
                                            }}
                                        >
                                            <Badge
                                                bg={enabled ? 'info' : 'secondary'}
                                                className="me-2"
                                                style={{ backgroundColor: enabled ? theme.colors.accent : undefined }}
                                            >
                                                {enabled ? 'مفعّل' : 'غير مفعل'}
                                            </Badge>
                                            {system}
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 🕹️ طريقة تسجيل الحضور */}
                <Col md={12}>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <Card.Title className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                <BiFingerprint className="ms-2" />طريقة تسجيل الحضور
                            </Card.Title>
                            <ul className="mb-0">
                                {stats.attendanceMethods.map((method, i) => (
                                    <li key={i} className="text-muted">{method}</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OverviewTab;
