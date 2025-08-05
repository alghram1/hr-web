// utils/exportToExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportAttendanceToExcel = (data) => {
    if (!data || data.length === 0) return;

    const formattedData = data.map((row) => ({
        'معرّف الموظف': row.id,
        'اسم الموظف': row.name,
        'المدير المباشر': row.manager,
        'أوقات العمل': row.shift,
        'تسجيل الدخول': row.inTime,
        'تسجيل الخروج': row.outTime,
        'الحالة': row.status,
        'عدد ساعات العمل': row.workHours,
        'الموقع': row.location || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { origin: 'A1' });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'الحضور');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, `تقرير_الحضور_${new Date().toLocaleDateString('ar-EG')}.xlsx`);
};
