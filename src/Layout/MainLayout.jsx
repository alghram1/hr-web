import React from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import theme from '../theme';

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex" dir="rtl" style={{ minHeight: '100vh', backgroundColor: theme.colors.grayBg }}>
            {/* الشريط الجانبي */}
            <Sidebar />

            {/* محتوى الصفحة */}
            <div
                className="flex-grow-1"
                style={{
                    marginRight: theme.style.sidebarWidth,
                }}
            >
                {/* الشريط العلوي */}
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000,
                        backgroundColor: '#fff',
                        boxShadow: theme.style.boxShadow,
                    }}
                >
                    <Topbar />
                </div>

                {/* محتوى الصفحة الرئيسية */}
                <div style={{ padding: '1.5rem' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
