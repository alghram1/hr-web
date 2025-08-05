import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MainLayout from '../../../Layout/MainLayout';
import AttendanceTabs from './AttendanceTabs';
import AttendanceSubTabs from './AttendanceSubTabs';
import AttendanceFilters from './AttendanceFilters';
import AttendanceTable from './AttendanceTable';
import { exportAttendanceToExcel } from '../../../utils/exportToExcel';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

// 🟢 دالة تنسيق التاريخ اليومي إلى "yyyy-mm-dd"
const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
};

// 🟢 فلاتر افتراضية لكل تبويب فرعي
const getInitialFilters = (subTab) => {
    switch (subTab) {
        case 'التقرير اليومي':
            return { date: getTodayString(), search: '' };
        case 'تقرير مخصص':
            return { startDate: '', endDate: '', search: '' };
        case 'تقرير الموقع':
            return {
                date: getTodayString(),
                startDate: '',
                endDate: '',
                location: '',
                search: '',
            };
        default:
            return { search: '' };
    }
};

const AttendancePage = () => {
    const [activeTab, setActiveTab] = useState('تقرير الحضور');
    const [activeSubTab, setActiveSubTab] = useState('التقرير اليومي');
    const [filters, setFilters] = useState(getInitialFilters('التقرير اليومي'));
    const [tableData, setTableData] = useState([]);

    // 🔄 إعادة تعيين الفلاتر عند تغيير التاب الرئيسي
    useEffect(() => {
        if (activeTab === 'تقرير الحضور') {
            const defaultSubTab = 'التقرير اليومي';
            setActiveSubTab(defaultSubTab);
            setFilters(getInitialFilters(defaultSubTab));
        }
    }, [activeTab]);

    // 🔄 تحديث الفلاتر عند تغيير التبويب الفرعي
    useEffect(() => {
        if (activeTab === 'تقرير الحضور') {
            setFilters(getInitialFilters(activeSubTab));
        }
    }, [activeSubTab, activeTab]);

    // ✅ تصدير الجدول إلى Excel
    const handleDownload = useCallback(() => {
        exportAttendanceToExcel(tableData);
    }, [tableData]);

    return (
        <MainLayout>
            <Container fluid className="pt-4" dir="rtl">
                <h3
                    className="fw-bold text-end mb-4"
                    style={{ color: theme.colors.accent }} // ✅ استخدام لون accent من الهوية
                >
                    الحضور والانصراف
                </h3>

                {/* ✅ التبويب الرئيسي */}
                <AttendanceTabs activeTab={activeTab} onSelect={setActiveTab} />

                {activeTab === 'تقرير الحضور' && (
                    <>
                        {/* ✅ التبويبات الفرعية */}
                        <AttendanceSubTabs
                            activeSubTab={activeSubTab}
                            onSelect={setActiveSubTab}
                        />

                        {/* ✅ كرت الفلاتر والجدول */}
                        <Card
                            className="p-3 mt-3 shadow-sm border-0"
                            style={{ borderRadius: '1rem' }}
                        >
                            <Row className="mb-3">
                                <Col>
                                    <AttendanceFilters
                                        filters={filters}
                                        onChange={setFilters}
                                        activeSubTab={activeSubTab}
                                        onDownload={handleDownload}
                                    />
                                </Col>
                            </Row>

                            <AttendanceTable
                                filters={filters}
                                subTab={activeSubTab}
                                onDataReady={setTableData}
                            />
                        </Card>
                    </>
                )}
            </Container>
        </MainLayout>
    );
};

export default AttendancePage;
