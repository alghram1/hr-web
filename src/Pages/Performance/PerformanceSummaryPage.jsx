import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import PerformanceHeaderSection from './PerformanceHeaderSection';
import PerformanceSectionCard from './PerformanceSectionCard';
import PerformanceFilters from './PerformanceFilters';
import PerformanceTabNavigation from './PerformanceTabNavigation';
import { getEmployeePerformanceData } from '../../api/performanceAPI';
import MainLayout from '../../Layout/MainLayout';
import theme from '../../theme'; // ✅ استيراد الهوية

const PerformanceSummaryPage = ({ isSelfView }) => {
    const [filters, setFilters] = useState(
        isSelfView
            ? { cycle: '', branch: '', department: '' }
            : { employee: [], cycle: '', branch: '', department: '' }
    );

    const [employeeDataList, setEmployeeDataList] = useState([]);
    const [selectedCycle, setSelectedCycle] = useState(null);

    const employees = [
        { value: 'emp-001', label: 'أحمد محمد' },
        { value: 'emp-002', label: 'صالح محمد' },
    ];

    const cycles = [
        { value: '2025-Q1', label: '2025 - الربع الأول', from: '2025-01-01', to: '2025-03-31', status: 'نشطة' },
    ];

    const branches = [{ value: 'riyadh', label: 'فرع الرياض' }];
    const departments = [{ value: 'hr', label: 'الموارد البشرية' }];

    const calculateTotal = (data) => (
        (data.goals.score * 0.4) +
        (data.tasks.score * 0.25) +
        (data.attendance.score * 0.2) +
        (data.quality.score * 0.15)
    ).toFixed(2);

    const getBadge = (score) => {
        let color = theme.colors.secondary;
        let label = 'ضعيف';

        if (score >= 85) {
            color = theme.colors.accent;
            label = 'ممتاز';
        } else if (score >= 70) {
            color = theme.colors.warning;
            label = 'جيد جداً';
        } else if (score >= 50) {
            color = theme.colors.danger;
            label = 'قيد التحسين';
        }

        return (
            <Badge
                style={{
                    backgroundColor: color,
                    padding: '6px 10px',
                    fontSize: '0.85rem',
                    borderRadius: '12px',
                    color: 'white'
                }}
            >
                {label}
            </Badge>
        );
    };

    const handleLoadData = async () => {
        if (!filters.cycle || (!isSelfView && filters.employee.length === 0)) {
            setEmployeeDataList([]);
            setSelectedCycle(null);
            return;
        }

        const cycleDetails = cycles.find(c => c.value === filters.cycle);
        setSelectedCycle(cycleDetails);

        const targetEmployeeIds = isSelfView
            ? [localStorage.getItem('employeeId')]
            : filters.employee;

        const results = await Promise.all(
            targetEmployeeIds.map(empId =>
                getEmployeePerformanceData(
                    empId,
                    filters.cycle,
                    filters.branch,
                    filters.department
                ).then(data => ({ ...data, id: empId }))
            )
        );

        setEmployeeDataList(results);
    };

    return (
        <MainLayout>
            <PerformanceTabNavigation isSelfView={isSelfView} />
            <Container fluid className="pt-4 px-4" dir="rtl">
                <PerformanceFilters
                    employees={employees}
                    cycles={cycles}
                    branches={branches}
                    departments={departments}
                    selectedFilters={filters}
                    onChange={setFilters}
                    hideEmployeeFilter={isSelfView}
                />

                <div className="text-start mb-4">
                    <Button
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff',
                            fontWeight: 'bold',
                            paddingInline: '1.5rem'
                        }}
                        onClick={handleLoadData}
                    >
                        عرض التقييم
                    </Button>
                </div>

                {employeeDataList.length > 0 && selectedCycle && (
                    <>
                        {employeeDataList.map((data) => {
                            const total = calculateTotal(data);
                            const employeeName = employees.find(e => e.value === data.id)?.label || '—';

                            return (
                                <div key={data.id} className="mb-5">
                                    <PerformanceHeaderSection
                                        cycle={{
                                            label: selectedCycle.label,
                                            from: selectedCycle.from,
                                            to: selectedCycle.to,
                                            status: selectedCycle.status,
                                            totalScore: total,
                                            ratingBadge: getBadge(total),
                                        }}
                                        employeeName={employeeName}
                                    />

                                    <Row className="gy-3 mt-3">
                                        <Col md={6} xl={3}>
                                            <PerformanceSectionCard label="الأهداف" score={data.goals.score} />
                                        </Col>
                                        <Col md={6} xl={3}>
                                            <PerformanceSectionCard label="المهام" score={data.tasks.score} />
                                        </Col>
                                        <Col md={6} xl={3}>
                                            <PerformanceSectionCard label="الحضور والانصراف" score={data.attendance.score} />
                                        </Col>
                                        <Col md={6} xl={3}>
                                            <PerformanceSectionCard label="جودة العمل" score={data.quality.score} />
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </>
                )}
            </Container>
        </MainLayout>
    );
};

export default PerformanceSummaryPage;
