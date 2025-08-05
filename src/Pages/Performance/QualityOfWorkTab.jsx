import React, { useState } from 'react';
import { Container, Card, Table, ProgressBar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MainLayout from '../../Layout/MainLayout';
import PerformanceFilters from './PerformanceFilters';
import PerformanceTabNavigation from './PerformanceTabNavigation';
import theme from '../../theme'; // ✅ استيراد الألوان

const mockQualityDatabase = [
    {
        employeeId: 'emp-001',
        employeeName: "أحمد محمد",
        cycleId: '2025-Q1',
        branchId: 'riyadh',
        departmentId: 'hr',
        scores: {
            accuracy: 92,
            attentionToDetail: 88,
            compliance: 85,
            creativity: 90,
        },
        supervisorComment: "عمله دقيق ومبتكر مع التزام جيد بالإجراءات.",
        evaluationDate: "2025-04-26",
    },
    {
        employeeId: 'emp-002',
        employeeName: "صالح محمد",
        cycleId: '2025-Q1',
        branchId: 'jeddah',
        departmentId: 'finance',
        scores: {
            accuracy: 78,
            attentionToDetail: 80,
            compliance: 75,
            creativity: 70,
        },
        supervisorComment: "أداء جيد ولكنه يحتاج لاهتمام أكبر بالتفاصيل.",
        evaluationDate: "2025-04-20",
    }
];

const WEIGHTS = {
    accuracy: 0.3,
    attentionToDetail: 0.25,
    compliance: 0.25,
    creativity: 0.2,
};

const employeeOptions = [
    { value: 'emp-001', label: 'أحمد محمد' },
    { value: 'emp-002', label: 'صالح محمد' },
];

const cycleOptions = [{ value: '2025-Q1', label: '2025 - الربع الأول' }];
const branchOptions = [
    { value: 'riyadh', label: 'فرع الرياض' },
    { value: 'jeddah', label: 'فرع جدة' },
];
const departmentOptions = [
    { value: 'hr', label: 'الموارد البشرية' },
    { value: 'finance', label: 'المالية' },
];

const initialFilters = {
    employee: [],
    cycle: '',
    branch: '',
    department: '',
};

const calculateFinalScore = (scores) => {
    if (!scores) return 0;
    const total =
        (scores.accuracy || 0) * WEIGHTS.accuracy +
        (scores.attentionToDetail || 0) * WEIGHTS.attentionToDetail +
        (scores.compliance || 0) * WEIGHTS.compliance +
        (scores.creativity || 0) * WEIGHTS.creativity;
    return total.toFixed(2);
};

const QualityOfWorkTab = ({ isSelfView = false }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);

    const employeeId = localStorage.getItem('employeeId');

    const handleSearch = () => {
        const matchedResults = mockQualityDatabase.filter(emp => {
            const matchEmployee = isSelfView
                ? emp.employeeId === employeeId
                : filters.employee.length === 0 || filters.employee.includes(emp.employeeId);
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
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            fontWeight: 'bold',
                        }}
                        className="px-4"
                        onClick={handleSearch}
                    >
                        🔍 عرض النتائج
                    </Button>
                </div>

                {results.length > 0 ? (
                    results.map((emp, idx) => (
                        <Card
                            key={idx}
                            className="border-0 shadow rounded-4 overflow-hidden mb-5"
                            dir="rtl"
                            style={{ backgroundColor: theme.colors.grayBg }}
                        >
                            <Card.Header
                                className="bg-white border-bottom d-flex justify-content-between align-items-center p-3"
                                style={{ color: theme.colors.primary }}
                            >
                                <h5 className="mb-0 fw-bold">
                                    🛠️ تقييم جودة العمل - {emp.employeeName}
                                </h5>
                                <span className="text-muted small">🗓️ {emp.evaluationDate}</span>
                            </Card.Header>

                            <Card.Body className="p-4">
                                <div className="text-center mb-5">
                                    <h4 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                                        النتيجة النهائية: {calculateFinalScore(emp.scores)}%
                                    </h4>
                                    <ProgressBar
                                        now={calculateFinalScore(emp.scores)}
                                        label={`${calculateFinalScore(emp.scores)}%`}
                                        variant="accent"
                                        style={{
                                            height: '18px',
                                            borderRadius: '12px',
                                            backgroundColor: theme.colors.grayBorder,
                                        }}
                                        className="shadow-sm"
                                    />
                                </div>

                                <div className="table-responsive mb-4">
                                    <Table bordered hover responsive className="align-middle text-center mb-0">
                                        <thead style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.textDark }}>
                                            <tr className="small">
                                                <th>المعيار</th>
                                                <th>الدرجة (%)</th>
                                                <th>الوزن النسبي</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            <tr>
                                                <td className="fw-semibold">الدقة</td>
                                                <td>{emp.scores.accuracy || 0}%</td>
                                                <td>30%</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">الإتقان</td>
                                                <td>{emp.scores.attentionToDetail || 0}%</td>
                                                <td>25%</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">الالتزام بالمعايير</td>
                                                <td>{emp.scores.compliance || 0}%</td>
                                                <td>25%</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">الإبداع</td>
                                                <td>{emp.scores.creativity || 0}%</td>
                                                <td>20%</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className="bg-white p-4 rounded shadow-sm mt-4">
                                    <h6 className="fw-bold mb-2" style={{ color: theme.colors.accent }}>
                                        ملاحظة المشرف:
                                    </h6>
                                    <p className="text-muted mb-0">
                                        {emp.supervisorComment || "لا توجد ملاحظات."}
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-5 text-muted">
                        🚫 لا توجد نتائج مطابقة للمعايير المحددة.
                    </div>
                )}
            </Container>
        </MainLayout>
    );
};

QualityOfWorkTab.propTypes = {
    isSelfView: PropTypes.bool,
};

export default QualityOfWorkTab;
