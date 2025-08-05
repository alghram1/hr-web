import React, { useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import MainLayout from '../../Layout/MainLayout';
import PerformanceFilters from './PerformanceFilters';
import PerformanceTabNavigation from './PerformanceTabNavigation';
import TaskSummaryTable from './TaskSummaryTable';
import TaskDetailModal from './TaskDetailModal';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

// 🛠️ بيانات تجريبية مؤقتة
const mockTaskDatabase = [
    {
        id: 1,
        employeeId: 'emp-001',
        employeeName: 'أحمد محمد',
        supervisorName: 'م. خالد',
        title: 'إعداد تقرير الأداء الشهري',
        dueDate: '2025-04-25',
        status: 'قيد التنفيذ',
        employeeComment: 'أنجزت الجزء الأكبر',
        supervisorComment: 'جيد جدًا، ننتظر التحديث النهائي',
        supervisorRating: 85,
        linkedGoal: 'تحسين التقارير',
        weight: 20,
    },
    {
        id: 2,
        employeeId: 'emp-001',
        employeeName: 'أحمد محمد',
        supervisorName: 'م. خالد',
        title: 'تحسين أداء النظام',
        dueDate: '2025-05-10',
        status: 'مكتملة',
        employeeComment: 'تم إكمال التحسينات',
        supervisorComment: 'ممتاز جداً',
        supervisorRating: 90,
        linkedGoal: 'رفع كفاءة النظام',
        weight: 30,
    },
    {
        id: 3,
        employeeId: 'emp-002',
        employeeName: 'صالح محمد',
        supervisorName: 'م. خالد',
        title: 'تنفيذ خطة التدريب',
        dueDate: '2025-04-15',
        status: 'مكتملة',
        employeeComment: 'تم تنفيذ الخطة بنجاح',
        supervisorComment: 'أداء رائع، شكراً',
        supervisorRating: 95,
        linkedGoal: 'رفع كفاءة الفريق',
        weight: 30,
    }
];

const employeeOptions = [
    { value: 'emp-001', label: 'أحمد محمد' },
    { value: 'emp-002', label: 'صالح محمد' },
];

const TaskReviewPage = () => {
    const [filters, setFilters] = useState({
        employee: [],
        cycle: '',
        branch: '',
        department: '',
    });

    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleLoadTasks = () => {
        setLoading(true);
        setTimeout(() => {
            let tasks = [...mockTaskDatabase];

            if (filters.employee.length > 0) {
                tasks = tasks.filter(t => filters.employee.includes(t.employeeId));
            }

            const grouped = tasks.reduce((acc, task) => {
                const empId = task.employeeId;
                if (!acc[empId]) {
                    acc[empId] = {
                        employeeName: task.employeeName,
                        supervisorName: task.supervisorName,
                        tasks: [],
                    };
                }
                acc[empId].tasks.push(task);
                return acc;
            }, {});

            const finalGrouped = Object.values(grouped).map(employee => ({
                ...employee,
                averageRating: (
                    employee.tasks.reduce((sum, task) => sum + (task.supervisorRating || 0), 0) / employee.tasks.length
                ).toFixed(1),
            }));

            setSummaryData(finalGrouped);
            setLoading(false);
        }, 1000);
    };

    const handleShowDetails = (employeeData) => {
        setSelectedEmployee(employeeData);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
        setSelectedEmployee(null);
    };

    return (
        <MainLayout>
            <PerformanceTabNavigation />

            <Container fluid className="pt-4 px-4" dir="rtl">

                <PerformanceFilters
                    employees={employeeOptions}
                    cycles={[{ value: '2025-Q1', label: '2025 - الربع الأول' }]}
                    branches={[{ value: 'riyadh', label: 'فرع الرياض' }]}
                    departments={[{ value: 'hr', label: 'الموارد البشرية' }]}
                    selectedFilters={filters}
                    onChange={setFilters}
                />

                <div className="text-start mb-4">
                    <Button
                        className="px-4 fw-bold"
                        style={{
                            backgroundColor: theme.colors.accent,
                            border: 'none',
                            color: '#fff'
                        }}
                        onClick={handleLoadTasks}
                    >
                        🔄 عرض تقييمات المهام
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" style={{ color: theme.colors.accent }} />
                        <div className="mt-2 text-muted">جاري تحميل التقييمات...</div>
                    </div>
                ) : summaryData.length > 0 ? (
                    <TaskSummaryTable
                        data={summaryData}
                        onShowDetails={handleShowDetails}
                    />
                ) : (
                    <div className="text-center py-5 text-muted">
                        🚫 لا توجد تقييمات مهام حالياً للعرض
                    </div>
                )}

                {selectedEmployee && (
                    <TaskDetailModal
                        show={modalShow}
                        onHide={handleCloseModal}
                        employeeName={selectedEmployee.employeeName}
                        tasks={selectedEmployee.tasks}
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default TaskReviewPage;
