// LeaveRequestsSection.jsx
import React from 'react';
import LeaveRequestCard from '../../Cards/LeaveRequestCard';
import theme from '../../../../../theme'; // تأكد من صحة المسار

const mockRequests = [
    {
        type: 'إجازة مرضية غير مدفوعة',
        from: '2025-03-12',
        to: '2025-03-13',
        days: 2,
        status: 'مقبولة',
        requestedBy: 'Abdulrahman',
        approvedBy: 'Motab',
        avatar: '/images/avatar1.jpg'
    },
    {
        type: 'إجازة زواج',
        from: '2025-04-10',
        to: '2025-04-12',
        days: 3,
        status: 'مرفوضة',
        requestedBy: 'Mohammed',
        approvedBy: null,
        avatar: '/images/avatar1.jpg'
    }
];

const LeaveRequestsSection = () => {
    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ color: theme.colors.accent }}>
                    الطلبات
                </h5>

                <button
                    className="btn btn-sm fw-bold"
                    style={{
                        backgroundColor: theme.colors.accent,
                        border: `1px solid ${theme.colors.accent}`,
                        color: '#fff'
                    }}
                >
                    طلب إجازة جديد
                </button>
            </div>

            {mockRequests.map((req, idx) => (
                <LeaveRequestCard key={idx} request={req} />
            ))}
        </div>
    );
};

export default LeaveRequestsSection;
