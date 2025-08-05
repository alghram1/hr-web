import React, { useState } from 'react';
import { Container, Card, Table, ProgressBar, Button, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

import MainLayout from '../../Layout/MainLayout';
import PerformanceFilters from './PerformanceFilters';
import PerformanceTabNavigation from './PerformanceTabNavigation';
import theme from '../../theme'; // ✅ الهوية البصرية

const mockGoalsDatabase = [
    {
        employeeId: 'emp-001',
        employeeName: "أحمد محمد",
        cycleId: '2025-Q1',
        branchId: 'riyadh',
        departmentId: 'sales',
        goals: [
            { title: 'زيادة مبيعات الفرع', description: 'تحقيق نمو 15%', weight: 40, score: 92, supervisorComment: 'ممتاز جدًا' },
            { title: 'تحسين خدمة العملاء', description: 'رفع الرضا إلى 90%', weight: 30, score: 78, supervisorComment: 'جيد مع بعض الملاحظات' },
            { title: 'تدريب الفريق', description: '', weight: 30, score: 65, supervisorComment: 'يحتاج تطوير' },
        ],
    },
    {
        employeeId: 'emp-002',
        employeeName: "صالح محمد",
        cycleId: '2025-Q1',
        branchId: 'jeddah',
        departmentId: 'hr',
        goals: [
            { title: 'رفع نسبة التوظيف', description: 'توظيف 20 موظف', weight: 50, score: 85, supervisorComment: 'أداء جيد' },
            { title: 'تحسين رضا الموظفين', description: 'رفع الرضا إلى 85%', weight: 50, score: 72, supervisorComment: 'مقبول' },
        ],
    }
];

const employeeOptions = [
    { value: 'emp-001', label: 'أحمد محمد' },
    { value: 'emp-002', label: 'صالح محمد' },
];

const cycleOptions = [
    { value: '2025-Q1', label: '2025 - الربع الأول' },
];

const branchOptions = [
    { value: 'riyadh', label: 'فرع الرياض' },
    { value: 'jeddah', label: 'فرع جدة' },
];

const departmentOptions = [
    { value: 'sales', label: 'المبيعات' },
    { value: 'hr', label: 'الموارد البشرية' },
];

const initialFilters = {
    employee: [],
    cycle: '',
    branch: '',
    department: '',
};

const calculateFinalScore = (goals) => {
    if (!goals || goals.length === 0) return 0;
    const total = goals.reduce((sum, goal) => {
        return sum + ((goal.score * goal.weight) / 100);
    }, 0);
    return total.toFixed(2);
};

const getScoreBadgeStyle = (score) => {
    let bg = theme.colors.accent;
    let icon = '✅';
    let textColor = '#fff';

    if (score < 85 && score >= 70) {
        bg = '#ffc107';
        icon = '⚠️';
        textColor = '#000';
    } else if (score < 70) {
        bg = '#dc3545';
        icon = '❌';
        textColor = '#fff';
    }

    return { bg, icon, textColor };
};

const GoalsEvaluationTab = ({ isSelfView = false }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const matchedResults = mockGoalsDatabase.filter(emp => {
            const matchEmployee = isSelfView
                ? emp.employeeId === localStorage.getItem('employeeId')
                : (filters.employee.length === 0 || filters.employee.includes(emp.employeeId));
            const matchCycle = !filters.cycle || emp.cycleId === filters.cycle;
            const matchBranch = !filters.branch || emp.branchId === filters.branch;
            const matchDepartment = !filters.department || emp.departmentId === filters.department;
            return matchEmployee && matchCycle && matchBranch && matchDepartment;
        });
        setResults(matchedResults);
    };

    return (
        <MainLayout>
            <PerformanceTabNavigation isSelfView={isSelfView} />
            <Container fluid className="pt-4 px-4" dir="rtl">

                <PerformanceFilters
                    employees={employeeOptions}
                    cycles={cycleOptions}
                    branches={branchOptions}
                    departments={departmentOptions}
                    selectedFilters={filters}
                    onChange={setFilters}
                    hideEmployeeFilter={isSelfView}
                />

                <div className="text-start mb-4">
                    <Button
                        className="px-4 fw-bold"
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff'
                        }}
                        onClick={handleSearch}
                    >
                        🔍 عرض نتائج الأهداف
                    </Button>
                </div>

                {results.length > 0 ? (
                    results.map((emp, idx) => {
                        const finalScore = calculateFinalScore(emp.goals);
                        return (
                            <Card key={idx} className="shadow-sm rounded-4 overflow-hidden mb-5" dir="rtl">
                                <Card.Header
                                    className="bg-light fw-bold fs-5 d-flex justify-content-between"
                                    style={{ color: theme.colors.accent }}
                                >
                                    🎯 تقييم الأهداف - {emp.employeeName}
                                </Card.Header>

                                <Card.Body className="p-4">
                                    <div className="text-center mb-5">
                                        <h4 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                            النتيجة النهائية: {finalScore}%
                                        </h4>
                                        <ProgressBar
                                            now={finalScore}
                                            label={`${finalScore}%`}
                                            style={{
                                                height: '18px',
                                                borderRadius: '12px',
                                                backgroundColor: '#eee'
                                            }}
                                            variant="accent"
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <Table bordered hover responsive className="align-middle text-center mb-0">
                                            <thead style={{ backgroundColor: `${theme.colors.accent}10` }}>
                                                <tr className="small">
                                                    <th>اسم الهدف</th>
                                                    <th>الوصف</th>
                                                    <th>الوزن (%)</th>
                                                    <th>الدرجة</th>
                                                    <th>ملاحظة المشرف</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {emp.goals.map((goal, goalIdx) => {
                                                    const { bg, icon, textColor } = getScoreBadgeStyle(goal.score);
                                                    return (
                                                        <tr key={goalIdx}>
                                                            <td className="fw-semibold">{goal.title}</td>
                                                            <td className="text-muted small">{goal.description || '—'}</td>
                                                            <td>{goal.weight}%</td>
                                                            <td>
                                                                <Badge style={{
                                                                    backgroundColor: bg,
                                                                    color: textColor,
                                                                    padding: '6px 12px',
                                                                    fontSize: '0.85rem'
                                                                }}>
                                                                    {icon} {goal.score}%
                                                                </Badge>
                                                            </td>
                                                            <td className="text-muted small">{goal.supervisorComment || '—'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })
                ) : (
                    <div className="text-center py-5 text-muted">
                        🚫 لا توجد نتائج مطابقة للمعايير المحددة.
                    </div>
                )}
            </Container>
        </MainLayout>
    );
};

GoalsEvaluationTab.propTypes = {
    isSelfView: PropTypes.bool,
};

export default GoalsEvaluationTab;
