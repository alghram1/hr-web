import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import MainLayout from '../../Layout/MainLayout';
import PerformanceFilters from './PerformanceFilters';
import { getEmployeeAttendanceSummary } from '../../api/performanceAPI';
import AttendanceDetailModal from './AttendanceDetailModal';
import '../../Styles/EmployeeProfilePage.scss';
import PerformanceTabNavigation from './PerformanceTabNavigation';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ الهوية البصرية

const systemSettings = {
    weekends: ['الجمعة', 'السبت'],
};

const weekDaysArabic = [
    'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

const getWorkingDays = (startDate, endDate) => {
    let workingDays = [];
    let current = new Date(startDate);

    while (current <= endDate) {
        const dayName = weekDaysArabic[current.getDay()];
        if (!systemSettings.weekends.includes(dayName)) {
            workingDays.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }
    return workingDays;
};

const AttendanceReviewTab = ({ isSelfView = false }) => {
    const [filters, setFilters] = useState({
        employee: [],
        cycle: '',
        branch: '',
        department: '',
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState([
        {
            id: 'emp-001',
            present: 18,
            absent: 4,
            late: 2,
            workingDaysCount: 22,
            attendanceDetails: [
                { date: '2023-10-01', status: 'حاضر', time: '08:00', late: false }
            ]
        }
    ]);
    const [loading, setLoading] = useState(false);

    const employees = [
        { value: 'emp-001', label: 'أحمد محمد' },
        { value: 'emp-002', label: 'صالح محمد' },
    ];

    const cycles = [
        { value: '2025-01-01', label: '2025 - الربع الأول' },
    ];

    const branches = [
        { value: 'riyadh', label: 'فرع الرياض' },
    ];

    const departments = [
        { value: 'hr', label: 'الموارد البشرية' },
    ];

    const calculateCompliance = (present, late, totalWorkingDays) => {
        if (totalWorkingDays === 0) return 0;
        return (((present - late) / totalWorkingDays) * 100).toFixed(1);
    };

    const getComplianceBadge = (percentage) => {
        let color = theme.colors.accent;
        if (percentage >= 85) color = theme.colors.accent;
        else if (percentage >= 70) color = '#ffc107';
        else if (percentage >= 50) color = '#dc3545';
        else color = '#6c757d';

        return (
            <span
                style={{
                    backgroundColor: `${color}20`,
                    color,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '0.85rem'
                }}
            >
                {percentage >= 85 ? 'ممتاز' : percentage >= 70 ? 'جيد' : percentage >= 50 ? 'ضعيف' : 'حرج'}
            </span>
        );
    };

    const handleLoad = async () => {
        if (!filters.cycle || filters.employee.length === 0) {
            setDataList([]);
            return;
        }

        setLoading(true);

        const startDate = new Date(filters.cycle);
        const endDate = new Date();
        const workingDays = getWorkingDays(startDate, endDate);

        const results = await Promise.all(
            filters.employee.map(async (empId) => {
                const summary = await getEmployeeAttendanceSummary(
                    empId,
                    filters.cycle,
                    filters.branch,
                    filters.department
                );

                const attendanceDates = summary.attendanceDetails?.map(d => d.date) || [];
                const presentDays = workingDays.filter(day =>
                    attendanceDates.includes(day.toISOString().split('T')[0])
                ).length;

                const lateDays = summary.attendanceDetails?.filter(d => d.late)?.length || 0;
                const absentDays = workingDays.length - presentDays;

                return {
                    id: empId,
                    department: summary.department,
                    branch: summary.branch,
                    attendanceDetails: summary.attendanceDetails,
                    workingDaysCount: workingDays.length,
                    present: presentDays,
                    late: lateDays,
                    absent: absentDays
                };
            })
        );

        setDataList(results);
        setLoading(false);
    };

    return (
        <MainLayout>
            <PerformanceTabNavigation />
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

                <div className="text-start mb-3">
                    <Button
                        className="px-4 fw-bold"
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff'
                        }}
                        onClick={handleLoad}
                    >
                        🔍 عرض تقييم الحضور
                    </Button>
                </div>

                <div className="table-responsive">
                    <Table borderless responsive="md" className="align-middle shadow-sm rounded-3 overflow-hidden" dir="rtl">
                        <thead className="table-light text-nowrap text-center fw-bold">
                            <tr>
                                <th>اسم الموظف</th>
                                <th>القسم</th>
                                <th>الفرع</th>
                                <th>أيام العمل</th>
                                <th>الحضور</th>
                                <th>التأخير</th>
                                <th>الغياب</th>
                                <th>نسبة الالتزام</th>
                                <th>التقييم</th>
                                <th>تفاصيل</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {loading ? (
                                <tr>
                                    <td colSpan="10" className="text-muted py-4">🔄 جاري تحميل البيانات...</td>
                                </tr>
                            ) : dataList.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="text-muted py-4">🚫 لا توجد بيانات لعرضها</td>
                                </tr>
                            ) : dataList.map((record) => {
                                const compliance = calculateCompliance(record.present, record.late, record.workingDaysCount);
                                const employeeName = employees.find(e => e.value === record.id)?.label || '—';

                                return (
                                    <tr key={record.id}>
                                        <td className="fw-semibold text-dark">{employeeName}</td>
                                        <td>{record.department || '—'}</td>
                                        <td>{record.branch || '—'}</td>
                                        <td className="text-secondary">{record.workingDaysCount}</td>
                                        <td style={{ color: theme.colors.accent }}>{record.present}</td>
                                        <td style={{ color: '#ffc107', fontWeight: 'bold' }}>{record.late}</td>
                                        <td style={{ color: '#dc3545' }}>{record.absent}</td>
                                        <td className="fw-bold" style={{ color: theme.colors.accent }}>{compliance}%</td>
                                        <td>{getComplianceBadge(compliance)}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                className="px-3 py-1"
                                                style={{
                                                    color: theme.colors.accent,
                                                    borderColor: theme.colors.accent,
                                                    backgroundColor: 'transparent',
                                                    fontWeight: '500'
                                                }}
                                                onClick={() => {
                                                    setSelectedEmployee({
                                                        name: employeeName,
                                                        details: record.attendanceDetails || []
                                                    });
                                                    setShowModal(true);
                                                }}
                                            >
                                                تفاصيل
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        <AttendanceDetailModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            employeeName={selectedEmployee?.name || '—'}
                            details={selectedEmployee?.details || []}
                        />
                    </Table>
                </div>

            </Container>
        </MainLayout>
    );
};

AttendanceReviewTab.propTypes = {
    isSelfView: PropTypes.bool
};

export default AttendanceReviewTab;
