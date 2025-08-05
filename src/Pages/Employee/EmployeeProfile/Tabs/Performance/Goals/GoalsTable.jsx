// Components/Performance/Goals/GoalsTable.jsx

import React from 'react';
import { Table } from 'react-bootstrap';
import GoalItemRow from './GoalItemRow';
import '../../../../../../Styles/EmployeeProfilePage.scss'
// 👇 بيانات تجريبية (قابلة للإزالة عند ربط API)
const mockGoals = [
    {
        id: 1,
        name: 'الانضباط في الحضور',
        type: 'إدارة الوقت والموارد',
        startDate: '2024-11-21',
        endDate: '2025-02-20',
        weight: 70,
        createdBy: 'Abdulrahman Sha'
    },
    {
        id: 2,
        name: 'الإلتزام بضوابط العمل',
        type: 'السلوك الوظيفي',
        startDate: '2024-11-21',
        endDate: '2025-02-20',
        weight: 45,
        createdBy: 'Abdulrahman Sha'
    },
    {
        id: 3,
        name: 'تحقيق المبيعات',
        type: 'الإنجازات',
        startDate: '2024-11-21',
        endDate: '2025-02-20',
        weight: 20,
        createdBy: 'Motab almansor'
    }
];

const GoalsTable = ({ goals = mockGoals }) => {
    const totalWeight = goals.reduce((sum, g) => sum + g.weight, 0);

    return (
        <div className="table-responsive">
            <Table hover borderless className="align-middle text-center small shadow-sm goals-table">
                <thead className="table-light">
                    <tr>
                        <th className="text-nowrap">اسم الهدف</th>
                        <th className="text-nowrap">نوع الهدف</th>
                        <th>تاريخ البداية</th>
                        <th>تاريخ النهاية</th>
                        <th className="text-nowrap">أنشئ من قبل</th>
                        <th className="text-nowrap text-end">الوزن</th>
                        <th style={{ width: 50 }}></th>
                        <th style={{ width: 50 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {goals.length > 0 ? (
                        goals.map(goal => <GoalItemRow key={goal.id} goal={goal} />)
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-muted">
                                لا توجد أهداف حالياً لهذه الدورة.
                            </td>
                        </tr>
                    )}
                </tbody>

                {goals.length > 0 && (
                    <tfoot>
                        <tr>
                            <td colSpan="8" className={`text-center fw-bold ${totalWeight !== 100 ? 'text-danger' : 'text-success'}`}>
                                {totalWeight !== 100
                                    ? `⚠️ المجموع = ${totalWeight}% (يجب أن يكون 100%)`
                                    : `✅ المجموع = ${totalWeight}%`}
                            </td>
                        </tr>
                    </tfoot>
                )}
            </Table>
        </div>
    );
};

export default GoalsTable;
