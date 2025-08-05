import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const getStatusBadge = (status) => {
    let bgStyle = {};
    let label = status;

    if (status === 'مقبول') {
        bgStyle = { backgroundColor: theme.colors.accent, color: '#fff' };
    } else if (status === 'مرفوض') {
        bgStyle = { backgroundColor: '#dc3545', color: '#fff' }; // أحمر
    } else if (status === 'قيد الانتظار') {
        bgStyle = { backgroundColor: '#ffc107', color: '#000' }; // أصفر
    } else {
        bgStyle = { backgroundColor: '#6c757d', color: '#fff' }; // رمادي
    }

    return (
        <Badge style={{ ...bgStyle }} className="px-3 py-2 fw-semibold">
            {label}
        </Badge>
    );
};

const TimeAdjustmentsTable = ({ data, onApprove, onReject, onEdit }) => {
    return (
        <div className="mt-2 table-responsive">
            <Table hover borderless className="align-middle text-center" dir="rtl">
                <thead style={{ backgroundColor: theme.colors.grayBg }}>
                    <tr style={{ color: theme.colors.textDark }}>
                        <th>#</th>
                        <th>اسم الموظف</th>
                        <th>المعرف</th>
                        <th>التاريخ</th>
                        <th>دخول أصلي</th>
                        <th>خروج أصلي</th>
                        <th>دخول جديد</th>
                        <th>خروج جديد</th>
                        <th>المبرر</th>
                        <th>الحالة</th>
                        <th>إجراء</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.employeeId}</td>
                                <td>{item.date}</td>
                                <td>{item.originalIn || '--'}</td>
                                <td>{item.originalOut || '--'}</td>
                                <td>{item.newIn || '--'}</td>
                                <td>{item.newOut || '--'}</td>
                                <td>{item.reason || '--'}</td>
                                <td>{getStatusBadge(item.status)}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => onEdit?.(item)}
                                            style={{ color: theme.colors.primary, borderColor: theme.colors.primary }}
                                        >
                                            تعديل
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-muted py-4">
                                لا توجد طلبات تعديل زمنية مطابقة.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default TimeAdjustmentsTable;
