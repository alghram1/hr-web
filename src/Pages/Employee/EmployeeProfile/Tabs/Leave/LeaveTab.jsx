// Pages/Employee/EmployeeProfile/Tabs/LeaveTab.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import LeaveProgressCircle from '../Leave/LeaveProgressCircle';
import LeaveRequestsSection from '../Leave/LeaveRequestsSection';
import theme from '../../../../../theme'; // ← تأكد من المسار الصحيح حسب مشروعك

const leavesPerPage = 3;

const leaveDataByYear = {
    2023: [
        { name: 'الإجازة السنوية', available: 18, used: 12, unit: 'أيام تقويم', color: '#c9b8f9' },
        { name: 'إجازة مرضية', available: 10, used: 3, unit: 'أيام عمل', color: '#9ee7d5' },
        { name: 'إجازة وفاة قريب', available: 5, used: 2, unit: 'أيام عمل', color: '#ddd4fa' },
        { name: 'إجازة زواج', available: 5, used: 0, unit: 'أيام عمل', color: '#ffd1dc' },
        { name: 'إجازة بدون راتب', available: null, used: null, unit: '', color: '#f3f3f3' }
    ],
    2024: [
        { name: 'الإجازة السنوية', available: 21, used: 6, unit: 'أيام تقويم', color: '#c9b8f9' },
        { name: 'إجازة مرضية غير مدفوعة', available: 12, used: 2, unit: 'أيام تقويم', color: '#9ee7d5' },
        { name: 'تعويض الوقت الاضافي', available: null, used: null, unit: '', color: '#ffeccc' },
        { name: 'إجازة وضع (للأمهات)', available: 60, used: 0, unit: 'أيام تقويم', color: '#f7c7c9' },
        { name: 'إجازة وفاة قريب', available: 5, used: 1, unit: 'أيام عمل', color: '#ddd4fa' },
        { name: 'إجازة زواج', available: 5, used: 5, unit: 'أيام عمل', color: '#ffd1dc' },
        { name: 'إجازة دراسة', available: null, used: null, unit: '', color: '#d4edda' },
        { name: 'إجازة مرافقة مريض', available: 15, used: 5, unit: 'أيام عمل', color: '#d0e7f9' },
        { name: 'إجازة بدون راتب', available: null, used: null, unit: '', color: '#f3f3f3' }
    ],
    2025: [
        { name: 'الإجازة السنوية', available: 20, used: 0, unit: 'أيام تقويم', color: '#c9b8f9' },
        { name: 'إجازة مرضية', available: 15, used: 0, unit: 'أيام عمل', color: '#9ee7d5' },
        { name: 'إجازة دراسة', available: 30, used: 5, unit: 'أيام عمل', color: '#d4edda' },
        { name: 'إجازة بدون راتب', available: null, used: null, unit: '', color: '#f3f3f3' }
    ]
};

const LeaveTab = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [currentPage, setCurrentPage] = useState(0);

    const leaveTypes = leaveDataByYear[selectedYear] || [];
    const maxPage = Math.ceil(leaveTypes.length / leavesPerPage) - 1;
    const paginatedLeaves = leaveTypes.slice(currentPage * leavesPerPage, (currentPage + 1) * leavesPerPage);

    const handleYearChange = (dir) => {
        const newYear = selectedYear + dir;
        if (leaveDataByYear[newYear]) {
            setSelectedYear(newYear);
            setCurrentPage(0);
        }
    };

    return (
        <Card className="shadow-sm border-0" dir="rtl">
            <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                    backgroundColor: theme.colors.grayBg,
                    borderBottom: `2px solid ${theme.colors.accent}`
                }}
            >
                <h5 className="mb-0 fw-bold" style={{ color: theme.colors.accent }}>إدارة الإجازات</h5>
            </Card.Header>
            <Card.Body>
                {/* التحكم في السنة */}
                <Row className="justify-content-center align-items-center g-3 mb-4">
                    <Col xs="auto">
                        <Button
                            variant="light"
                            onClick={() => handleYearChange(-1)}
                            disabled={!leaveDataByYear[selectedYear - 1]}
                        >
                            <BsChevronRight />
                        </Button>
                    </Col>
                    <Col xs="auto" className="fw-bold fs-5">{selectedYear}</Col>
                    <Col xs="auto">
                        <Button
                            variant="light"
                            onClick={() => handleYearChange(1)}
                            disabled={!leaveDataByYear[selectedYear + 1]}
                        >
                            <BsChevronLeft />
                        </Button>
                    </Col>
                </Row>

                {/* التنقل بين صفحات أنواع الإجازات */}
                <div className="d-flex align-items-center justify-content-between">
                    <Button
                        variant="outline-secondary"
                        className="rounded-circle me-2 mb-5"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                    >
                        <BsChevronRight />
                    </Button>

                    <Row className="g-4 flex-grow-1 justify-content-center">
                        {paginatedLeaves.map((leave, idx) => (
                            <Col key={idx} md={4}>
                                <LeaveProgressCircle
                                    title={leave.name}
                                    available={leave.available}
                                    used={leave.used}
                                    unit={leave.unit}
                                    color={leave.color}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Button
                        variant="outline-secondary"
                        className="rounded-circle ms-2 mb-5"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, maxPage))}
                        disabled={currentPage === maxPage}
                    >
                        <BsChevronLeft />
                    </Button>
                </div>

                <hr className="my-5" />
                <LeaveRequestsSection />
            </Card.Body>
        </Card>
    );
};

export default LeaveTab;





//  في عالمٍ يعجّ بالفوضى الوظيفية، يظهر هذا المشهد كواحة نظام في صحراء الفوضى.
//حيث يتقدّم الموظف ليطلب إجازته، لا ورق، لا طوابير... فقط زرٌ أزرق يسطع على الصفحة:
//طلب إجازة جديد.
//وكأنها صرخة الحرية من سجن الروتين.