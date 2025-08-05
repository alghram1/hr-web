import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import theme from '../../theme'; // ✅ استيراد الهوية الموحدة
import '../../Styles/EmployeeProfilePage.scss';

/**
 * ✅ TaskSummaryTable Component
 * ملخص تقييم المهام لكل موظف
 */
const TaskSummaryTable = ({ data, onShowDetails }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-5 text-muted">
                🚫 لا توجد تقييمات مهام حالياً للعرض
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <Table
                borderless
                className="align-middle text-center shadow-sm rounded-3 overflow-hidden"
                style={{ backgroundColor: '#fff' }}
                dir="rtl"
            >
                <thead className="table-light text-nowrap">
                    <tr>
                        <th>اسم الموظف</th>
                        <th>اسم المشرف</th>
                        <th>عدد المهام</th>
                        <th>متوسط التقييم (%)</th>
                        <th>تفاصيل المهام</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((employee, idx) => (
                        <tr key={idx}>
                            <td className="fw-semibold">{employee.employeeName}</td>
                            <td>{employee.supervisorName}</td>
                            <td>{employee.tasks.length}</td>
                            <td className="fw-bold" style={{ color: theme.colors.accent }}>
                                {employee.averageRating}%
                            </td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="outline-accent"
                                    className="px-3 py-1 fw-semibold"
                                    style={{
                                        color: theme.colors.accent,
                                        borderColor: theme.colors.accent,
                                        backgroundColor: 'transparent'
                                    }}
                                    onClick={() =>
                                        onShowDetails({
                                            employeeName: employee.employeeName,
                                            tasks: employee.tasks
                                        })
                                    }
                                >
                                    عرض التفاصيل
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

TaskSummaryTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            employeeName: PropTypes.string.isRequired,
            supervisorName: PropTypes.string.isRequired,
            averageRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
        })
    ).isRequired,
    onShowDetails: PropTypes.func.isRequired,
};

export default TaskSummaryTable;
