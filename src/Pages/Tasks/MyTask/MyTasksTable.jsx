import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Badge, Row, Col, Form, Card } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import MainLayout from '../../../Layout/MainLayout';
import SmartTable from '../../../Components/SmartTable';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const mockTasks = [/* كما هو */];

const getStatusBadge = (status) => {
    switch (status) {
        case 'لم يبدأ':
            return <Badge bg="secondary">لم يبدأ</Badge>;
        case 'جاري التنفيذ':
            return (
                <Badge style={{ backgroundColor: theme.colors.primary }}>
                    جاري التنفيذ
                </Badge>
            );
        case 'مكتملة':
            return (
                <Badge style={{ backgroundColor: theme.colors.accent }}>
                    مكتملة
                </Badge>
            );
        case 'ملغاة':
            return <Badge bg="danger">ملغاة</Badge>;
        default:
            return <Badge bg="light" text="dark">غير معروف</Badge>;
    }
};

const getEvaluationBadge = (evaluationStatus) => {
    switch (evaluationStatus) {
        case 'بانتظار تقييم الموظف':
            return <Badge bg="warning" text="dark">بانتظار تقييمك</Badge>;
        case 'بانتظار اعتماد المشرف':
            return (
                <Badge style={{ backgroundColor: theme.colors.accent }}>
                    بانتظار اعتماد المشرف
                </Badge>
            );
        case 'تم الاعتماد':
            return (
                <Badge style={{ backgroundColor: theme.colors.accent }}>
                    تم الاعتماد
                </Badge>
            );
        case 'مرفوض':
            return <Badge bg="danger">مرفوض</Badge>;
        default:
            return <Badge bg="secondary">غير متاح</Badge>;
    }
};

const MyTasksTable = ({ tasks = mockTasks, onViewDetails = (task) => console.log('🔍 تفاصيل المهمة:', task) }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [appliedFilter, setAppliedFilter] = useState(false);

    const applyFilters = () => {
        setAppliedFilter(true);
    };

    const filteredTasks = useMemo(() => {
        const sorted = [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

        if (!fromDate && !toDate) return sorted; // ✅ عرض الكل عند عدم اختيار فلاتر

        return sorted.filter(task => {
            const taskDate = new Date(task.dueDate);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;
            return (!from || taskDate >= from) && (!to || taskDate <= to);
        });
    }, [tasks, fromDate, toDate]);


    const columns = [
        { key: 'title', label: 'اسم المهمة' },
        { key: 'dueDate', label: 'تاريخ الاستحقاق' },
        {
            key: 'linkedGoalName',
            label: 'الهدف المرتبط',
            render: (val, row) => (row.linkedGoal ? val : '—'),
        },
        {
            key: 'linkedGoal',
            label: 'نوع المهمة',
            render: (val) => (val ? '🎯 مرتبطة بهدف' : '📝 مستقلة'),
        },
        {
            key: 'status',
            label: 'حالة التنفيذ',
            render: (val) => getStatusBadge(val),
        },
        {
            key: 'evaluationStatus',
            label: 'حالة التقييم',
            render: (val) => getEvaluationBadge(val),
        },
        {
            key: 'alert',
            label: 'تنبيه',
            render: (val, row) =>
                val ? (
                    <Badge
                        style={{
                            backgroundColor: theme.colors.primary,
                            color: '#fff',
                        }}
                        className="px-2 py-1"
                    >
                        🚨 {row.alertMessage}
                    </Badge>
                ) : null,
        },
        {
            key: 'action',
            label: 'إدارة',
            render: (_, row) => (
                <Button
                    size="sm"
                    style={{
                        color: theme.colors.accent,
                        borderColor: theme.colors.accent,
                    }}
                    variant="outline"
                    onClick={() => onViewDetails(row)}
                >
                    عرض التفاصيل
                </Button>
            ),
        },
    ];

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4 px-4">
                <h3
                    className="fw-bold text-end mb-4"
                    style={{ color: theme.colors.accent }} // ✅ عنوان ملون بالهوية
                >
                    مهامي
                </h3>

                <Card className="shadow-sm rounded-4 border-0 p-3 mb-4">
                    <Row className="gy-3">
                        <Col md={6} lg={4}>
                            <Form.Group controlId="fromDate">
                                <Form.Label>من تاريخ</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fromDate}
                                    onChange={e => setFromDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={4}>
                            <Form.Group controlId="toDate">
                                <Form.Label>إلى تاريخ</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={toDate}
                                    onChange={e => setToDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={4} className="d-flex align-items-end">
                            <Button
                                className="w-100 fw-bold"
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    borderColor: theme.colors.accent,
                                }}
                                onClick={applyFilters}
                            >
                                <FaFilter className="ms-2" /> عرض النتائج
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {appliedFilter && (
                    filteredTasks.length > 0 ? (
                        <SmartTable
                            columns={columns}
                            data={filteredTasks}
                            showActions={false}
                        />
                    ) : (
                        <Card className="p-4 text-center text-muted fw-bold shadow-sm border-0 rounded-4">
                            لا توجد مهام تطابق الفلاتر المحددة
                        </Card>
                    )
                )}
            </Container>
        </MainLayout>
    );
};

MyTasksTable.propTypes = {
    tasks: PropTypes.array,
    onViewDetails: PropTypes.func,
};

export default MyTasksTable;
