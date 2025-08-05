import React from 'react';
import { Nav } from 'react-bootstrap';
import theme from '../../../theme'; // ✅ استيراد ألوان الهوية

const subTabs = [
    'التقرير اليومي',
    'تقرير مخصص',
    'تقرير الموقع'
];

const AttendanceSubTabs = ({ activeSubTab, onSelect }) => {
    return (
        <Nav
            variant="pills"
            activeKey={activeSubTab}
            onSelect={onSelect}
            className="mb-3 justify-content-start"
            dir="rtl"
        >
            {subTabs.map((tab) => {
                const isActive = activeSubTab === tab;
                return (
                    <Nav.Item key={tab}>
                        <Nav.Link
                            eventKey={tab}
                            className="px-4 rounded-pill fw-semibold"
                            style={{
                                fontSize: '0.95rem',
                                marginInlineEnd: '0.5rem',
                                transition: 'all 0.2s ease-in-out',
                                backgroundColor: isActive ? theme.colors.primary : 'transparent',
                                color: isActive ? '#fff' : theme.colors.primary,
                                border: `1.5px solid ${theme.colors.primary}`
                            }}
                        >
                            {tab}
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default AttendanceSubTabs;
