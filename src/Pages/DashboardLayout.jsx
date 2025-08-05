// Pages/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar'; // ⬅️ أضفنا الـ Topbar

import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar ثابت على اليسار */}
            <Sidebar />

            {/* المحتوى الأساسي */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* ✅ Topbar يظهر فوق كل الصفحات */}
                <Topbar />

                {/* ⬇️ Outlet لعرض محتوى الصفحة الديناميكي */}
                <main className="flex-grow-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
