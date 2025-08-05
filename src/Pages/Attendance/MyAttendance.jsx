import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FaCalendarCheck, FaTimesCircle, FaFilter } from 'react-icons/fa';
import MainLayout from '../../Layout/MainLayout';
import SmartTable from '../../Components/SmartTable'; // 🧠 جدول ذكي رسمي
import theme from '../../theme';

export default function MyAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [appliedFilter, setAppliedFilter] = useState(false);

    const currentUserId = 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                {
                    id: 1,
                    userId: 1,
                    date: '2025-06-01',
                    status: 'present',
                    checkIn: '08:05',
                    checkOut: '16:00',
                    duration: '7:55',
                    shiftType: 'صباحي',
                    note: '—'
                },
                {
                    id: 2,
                    userId: 1,
                    date: '2025-05-31',
                    status: 'absent',
                    checkIn: null,
                    checkOut: null,
                    duration: null,
                    shiftType: 'صباحي',
                    note: 'لم يتم تسجيل حضور'
                },
                // يمكن إضافة بيانات إضافية هنا
            ];
            setAttendanceData(data);
        };
        fetchData();
    }, []);

    const applyFilters = () => {
        const filtered = attendanceData.filter(entry => {
            if (entry.userId !== currentUserId) return false;
            const entryDate = new Date(entry.date);
            if (startDate && entryDate < startDate) return false;
            if (endDate && entryDate > endDate) return false;
            if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
            return true;
        });
        setFilteredData(filtered);
        setAppliedFilter(true);
    };

    const summary = useMemo(() => {
        const userEntries = attendanceData.filter(e => e.userId === currentUserId);
        const total = userEntries.length;
        const present = userEntries.filter(e => e.status === 'present').length;
        const absent = userEntries.filter(e => e.status === 'absent').length;
        return { total, present, absent };
    }, [attendanceData]);

    const columns = [
        {
            key: 'date',
            label: 'التاريخ',
            render: (val) => new Date(val).toLocaleDateString('ar-EG')
        },
        {
            key: 'checkIn',
            label: 'وقت الدخول',
            render: (val) => val || '—'
        },
        {
            key: 'checkOut',
            label: 'وقت الخروج',
            render: (val) => val || '—'
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => val === 'present' ? (
                <span className="badge p-2 px-3 fs-6" style={{ backgroundColor: theme.colors.accent, color: '#fff' }}>
                    <FaCalendarCheck className="ms-1" /> حاضر
                </span>
            ) : (
                <span className="badge p-2 px-3 fs-6" style={{ backgroundColor: theme.colors.danger, color: '#fff' }}>
                    <FaTimesCircle className="ms-1" /> غائب
                </span>
            )
        },
        {
            key: 'duration',
            label: 'مدة الحضور',
            render: (val) => val || '—'
        },
        {
            key: 'shiftType',
            label: 'نوع الدوام',
            render: (val) => val || '—'
        },
        {
            key: 'note',
            label: 'ملاحظات',
            render: (val) => <span className="text-muted">{val || '—'}</span>
        }
    ];

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4">
                <Card className="shadow rounded-4 border-0">
                    <Card.Body>
                        <h3 className="mb-4 fw-bold" style={{ color: theme.colors.primary }}>
                            حضوري
                        </h3>

                        {/* 🎯 الفلاتر */}
                        <Row className="mb-3 g-3 align-items-end">
                            <Col md={3}>
                                <Form.Label>من تاريخ:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>إلى تاريخ:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>الحالة:</Form.Label>
                                <Form.Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">الكل</option>
                                    <option value="present">حاضر</option>
                                    <option value="absent">غائب</option>
                                </Form.Select>
                            </Col>
                            <Col md={3}>
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

                        {/* 📊 ملخص الحضور */}
                        <Row className="mb-4">
                            <Col>
                                <div className="p-3 rounded-3 shadow-sm d-flex justify-content-around text-center" style={{ backgroundColor: theme.colors.grayBg }}>
                                    <div>
                                        <p className="mb-1 fw-bold" style={{ color: theme.colors.accent }}>الحضور</p>
                                        <h5>{summary.present}</h5>
                                    </div>
                                    <div>
                                        <p className="mb-1 fw-bold text-danger">الغياب</p>
                                        <h5>{summary.absent}</h5>
                                    </div>
                                    <div>
                                        <p className="mb-1 fw-bold text-muted">الإجمالي</p>
                                        <h5>{summary.total}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* 📋 الجدول */}
                        {appliedFilter && (
                            <SmartTable
                                columns={columns}
                                data={filteredData}
                                showActions={false}
                                showIndex={true}
                                bordered={false}
                                striped={false}
                                hover={true}
                                responsive={true}
                                size="md"
                            />
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </MainLayout>
    );
}
