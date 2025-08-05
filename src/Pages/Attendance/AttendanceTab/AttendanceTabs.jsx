// File: src/pages/AttendanceTab/AttendanceTabs.jsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from '../../../theme'; // ✅ استيراد ألوان الهوية البصرية

// 🟢 تعريف التبويبات مع المسارات المرتبطة بها
const TABS = [
    { label: 'تقرير الحضور', path: '/dashboard/attendance' },
    { label: 'تعديلات الوقت', path: '/dashboard/time-adjustments' },
    { label: 'البيانات الأولية', path: '/dashboard/raw-data' },
];

const AttendanceTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    return (
        <Nav
            variant="tabs"
            activeKey={currentPath}
            onSelect={(selectedPath) => navigate(selectedPath)}
            className="border-bottom fw-semibold mb-3 justify-content-start"
            dir="rtl"
        >
            {TABS.map(({ label, path }) => {
                const isActive = currentPath === path;
                return (
                    <Nav.Item key={path}>
                        <Nav.Link
                            eventKey={path}
                            className="px-4"
                            style={{
                                fontSize: '1rem',
                                borderBottom: isActive ? `3px solid ${theme.colors.accent}` : 'none',
                                color: isActive ? theme.colors.accent : theme.colors.primary,
                                backgroundColor: 'transparent',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {label}
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default AttendanceTabs;
