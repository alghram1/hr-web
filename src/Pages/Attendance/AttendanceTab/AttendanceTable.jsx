import React, { useEffect, useMemo } from 'react';
import SmartTable from '../../../Components/SmartTable';
import { Badge, Button } from 'react-bootstrap';
import theme from '../../../theme'; // ✅ الهوية البصرية

const sampleData = [
    {
        id: 'EMP001', name: 'محمد أحمد', manager: 'أحمد فهد', shift: '9:00 ص - 5:00 م',
        inTime: '9:12 ص', outTime: '4:58 م', status: 'متأخر', workHours: '7:46',
        date: '٢٠٢٤-٠٥-٠٤', location: 'الرياض',
    },
    {
        id: 'EMP002', name: 'سارة علي', manager: 'أحمد فهد', shift: '9:00 ص - 5:00 م',
        inTime: '9:00 ص', outTime: '5:00 م', status: 'حاضر', workHours: '8:00',
        date: '2025-05-04', location: 'جدة',
    },
    {
        id: 'EMP003', name: 'فيصل ناصر', manager: 'أحمد فهد', shift: '9:00 ص - 5:00 م',
        inTime: '--', outTime: '--', status: 'غائب', workHours: '--',
        date: '2025/05/03', location: 'الرياض',
    },
];

const normalizeDate = (value) => {
    if (!value) return '';
    const arabicToEnglish = (str) => str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    const cleaned = arabicToEnglish(String(value)).replace(/\s/g, '').replace(/\//g, '-');
    const parts = cleaned.split('-');
    if (parts.length !== 3) return '';
    const year = parts[0].padStart(4, '20').substring(0, 4);
    const month = parts[1].padStart(2, '0').substring(0, 2);
    const day = parts[2].padStart(2, '0').substring(0, 2);
    const dateStr = `${year}-${month}-${day}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return '';
    return dateStr;
};

const AttendanceTable = ({ filters, subTab, onDataReady }) => {
    const filteredData = useMemo(() => {
        const filterDate = normalizeDate(filters.date);
        const filterStart = normalizeDate(filters.startDate);
        const filterEnd = normalizeDate(filters.endDate);

        return sampleData.filter((emp) => {
            const empDate = normalizeDate(emp.date);
            if (!empDate) return false;

            const searchTerm = (filters.search || '').trim();
            const matchesSearch = !searchTerm || emp.name.includes(searchTerm) || emp.id.includes(searchTerm);
            const matchesDaily = subTab !== 'التقرير اليومي' || (!filterDate || empDate === filterDate);
            const matchesRange = subTab !== 'تقرير مخصص' || (!filterStart || empDate >= filterStart) && (!filterEnd || empDate <= filterEnd);
            const matchesLocation = subTab !== 'تقرير الموقع' || (!filters.location || emp.location === filters.location);

            return matchesSearch && matchesDaily && matchesRange && matchesLocation;
        });
    }, [filters, subTab]);

    useEffect(() => {
        onDataReady?.(filteredData);
    }, [filteredData, onDataReady]);

    const formatDisplayDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'حاضر':
                return theme.colors.accent; // ✅ التركوازي المعتمد
            case 'متأخر':
                return '#ffc107'; // أصفر تحذيري
            case 'غائب':
                return '#dc3545'; // أحمر
            default:
                return '#6c757d'; // رمادي
        }
    };

    const columns = [
        { key: 'id', label: 'المعرف' },
        {
            key: 'name',
            label: 'اسم الموظف',
            render: (val) => (
                <Button
                    variant="link"
                    className="fw-bold p-0"
                    style={{ color: theme.colors.primary }}
                >
                    {val}
                </Button>
            ),
        },
        { key: 'manager', label: 'المدير المباشر' },
        { key: 'shift', label: 'أوقات العمل' },
        {
            key: 'date',
            label: 'التاريخ',
            render: (val) => normalizeDate(val) ? formatDisplayDate(normalizeDate(val)) : 'تاريخ غير صحيح',
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <Badge
                    className="fs-6 px-3 py-2"
                    style={{
                        backgroundColor: getStatusColor(val),
                        color: '#fff'
                    }}
                >
                    {val}
                </Badge>
            ),
        },
        { key: 'inTime', label: 'تسجيل الحضور' },
        { key: 'outTime', label: 'تسجيل الانصراف' },
        { key: 'workHours', label: 'ساعات العمل' },
    ];

    return (
        <SmartTable
            columns={columns}
            data={filteredData}
            responsive={true}
            showActions={false}
            striped={false}
            bordered={false}
        />
    );
};

export default AttendanceTable;
