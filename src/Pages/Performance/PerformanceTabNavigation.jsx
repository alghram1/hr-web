// Components/Performance/PerformanceTabNavigation.jsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

const PerformanceTabNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { label: 'التقييم العام', path: '/dashboard/PerformanceSummaryPage' },
        { label: 'تقيم الاهداف', path: '/dashboard/GoalsEvaluationTab' },
        { label: 'تقييم الحضور', path: '/dashboard/AttendanceReviewTab' },
        { label: 'تقييم المهام', path: '/dashboard/TaskReviewPage' },
        { label: 'جودة العمل', path: '/dashboard/QualityOfWorkTab' },
    ];

    return (
        <Nav
            variant="tabs"
            className="mb-4 mt-4 flex-nowrap overflow-auto border-bottom"
            fill
            dir="rtl"
        >
            {tabs.map((tab, idx) => {
                const isActive = location.pathname === tab.path;
                return (
                    <Nav.Item key={idx}>
                        <Nav.Link
                            active={isActive}
                            onClick={() => navigate(tab.path)}
                            style={{
                                fontWeight: '500',
                                color: isActive ? theme.colors.accent : theme.colors.grayDark,
                                borderBottom: isActive ? `3px solid ${theme.colors.accent}` : 'none',
                                backgroundColor: 'transparent',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {tab.label}
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default PerformanceTabNavigation;
