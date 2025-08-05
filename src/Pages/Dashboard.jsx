import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MiniLineChart from '../Components/MiniLineChart';
import MainLayout from '../Layout/MainLayout';
import EmployeesPreview from '../Pages/Employee/EmployeesPreview';
import TaskWidget from '../Pages/TaskWidget';
import AdminPosts from './AdminPosts';
import useTasksOverview from '../hooks/useTasksOverview';
import theme from '../theme'; // ✅ الهوية البصرية

import {
    BsPersonFill,
    BsClockHistory,
    BsClipboardCheck,
    BsBell,
} from 'react-icons/bs';

const Dashboard = () => {
    const { today, week, overdue, loading } = useTasksOverview();
    if (loading) return <div className="text-muted">جاري تحميل المهام...</div>;

    const cardStyle = {
        border: "none",
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        backgroundColor: "#ffffff"
    };

    return (
        <MainLayout>
            <Container fluid="lg" className="p-4" dir="rtl">
                {/* ✅ الترحيب */}
                <div
                    className="mb-4 d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                        backgroundColor: theme.colors.grayBg,
                        padding: "1.5rem",
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div>
                        <h4 className="mb-1" style={{ color: theme.colors.primary }}>
                            👋 أهلاً بك <span className="fw-bold">م عبد الرحمن</span>!
                        </h4>
                        <p className="mb-0 text-muted">
                            يمكنك متابعة عمليات الموارد البشرية بكل سهولة واحترافية.
                        </p>
                    </div>
                </div>

                {/* ✅ الكروت الإحصائية */}
                <Row className="g-4 mb-4">
                    <Col md={6} lg={3}>
                        <Card style={{ ...cardStyle, backgroundColor: theme.colors.primaryLight }}>
                            <Card.Body className="text-center">
                                <BsPersonFill size={26} style={{ color: theme.colors.primary }} />
                                <h6 className="mt-2 fw-bold text-secondary">عدد الموظفين</h6>
                                <h3 style={{ color: theme.colors.primary }}>152</h3>
                                <MiniLineChart dataPoints={[120, 130, 140, 145, 150, 152]} color={theme.colors.primary} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card style={cardStyle}>
                            <Card.Body className="text-center">
                                <BsClockHistory size={26} style={{ color: theme.colors.accent }} />
                                <h6 className="mt-2 fw-bold text-secondary">إجازات اليوم</h6>
                                <h3 style={{ color: theme.colors.accent }}>4</h3>
                                <MiniLineChart dataPoints={[2, 2, 3, 4]} color={theme.colors.accent} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card style={cardStyle}>
                            <Card.Body className="text-center">
                                <BsClipboardCheck size={26} style={{ color: theme.colors.primary }} />
                                <h6 className="mt-2 fw-bold text-secondary">الحضور</h6>
                                <h3 style={{ color: theme.colors.primary }}>148</h3>
                                <MiniLineChart dataPoints={[130, 132, 140, 148]} color={theme.colors.primary} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3}>
                        <Card style={cardStyle}>
                            <Card.Body className="text-center">
                                <BsBell size={26} style={{ color: theme.colors.danger }} />
                                <h6 className="mt-2 fw-bold text-secondary">المهام المعلقة</h6>
                                <h3 style={{ color: theme.colors.danger }}>7</h3>
                                <MiniLineChart dataPoints={[4, 5, 6, 7]} color={theme.colors.danger} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* ✅ القسم السفلي */}
                <Row className="g-4 mb-4">
                    <Col lg={8}>
                        <Row className="g-4">
                            <Col xs={12}>
                                <AdminPosts />
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={4}>
                        <Row className="g-4">
                            <Col xs={12}>
                                <Card className="shadow-sm border-0">
                                    <Card.Body className="p-1">
                                        <h5 style={{ color: theme.colors.primary }}>المهام</h5>
                                        <TaskWidget todayCount={today} weekCount={week} overdueCount={overdue} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Card className="shadow-sm border-0">
                                    <Card.Body className="p-1">
                                        <EmployeesPreview />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default Dashboard;
