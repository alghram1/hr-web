import React from 'react';
import { Table, Spinner, Badge, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import theme from '../../../theme'; // ✅ الهوية البصرية

const DocumentListTable = ({ documents, isLoading }) => {
    const navigate = useNavigate();

    const groupByEmployee = (docs = []) => {
        const map = new Map();
        docs.forEach(doc => {
            if (!map.has(doc.employeeId)) {
                map.set(doc.employeeId, {
                    employeeName: doc.employeeName,
                    employeeId: doc.employeeId,
                    documents: []
                });
            }
            map.get(doc.employeeId).documents.push(doc);
        });
        return Array.from(map.values());
    };

    const groupedEmployees = groupByEmployee(documents);

    const getStatusBadge = (docs) => {
        const now = new Date();
        const expired = docs.some(doc => new Date(doc.expiryDate) < now);
        const allValid = docs.every(doc => new Date(doc.expiryDate) >= now);

        if (allValid) {
            return (
                <Badge
                    pill
                    style={{ backgroundColor: theme.colors.accent, color: '#fff' }}
                >
                    ساري
                </Badge>
            );
        }
        if (expired && !allValid) {
            return (
                <Badge
                    pill
                    style={{ backgroundColor: theme.colors.warning, color: '#212529' }}
                >
                    بعضها منتهي
                </Badge>
            );
        }
        return (
            <Badge
                pill
                style={{ backgroundColor: theme.colors.danger, color: '#fff' }}
            >
                منتهي
            </Badge>
        );
    };

    const getNearestExpiry = (docs) => {
        const sorted = [...docs].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
        return format(new Date(sorted[0].expiryDate), 'yyyy-MM-dd');
    };

    const goToEmployeeDocs = (employeeId, employeeName) => {
        navigate(`/dashboard/employee/${employeeId}/documents`, {
            state: {
                employeeName,
                fromAllDocumentsPage: true
            }
        });
    };

    return (
        <div className="table-responsive">
            <Table striped bordered hover responsive className="text-center align-middle shadow-sm">
                <thead style={{ backgroundColor: theme.colors.accent, color: '#fff' }}>
                    <tr>
                        <th>#</th>
                        <th>اسم الموظف</th>
                        <th>الرقم الوظيفي</th>
                        <th>عدد المستندات</th>
                        <th>أقرب تاريخ انتهاء</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="7" className="py-4">
                                <Spinner animation="border" style={{ color: theme.colors.accent }} />
                            </td>
                        </tr>
                    ) : groupedEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-muted">لا توجد بيانات</td>
                        </tr>
                    ) : (
                        groupedEmployees.map((emp, index) => (
                            <tr key={emp.employeeId}>
                                <td>{index + 1}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        className="fw-bold p-0"
                                        style={{ color: theme.colors.accent }}
                                        onClick={() => goToEmployeeDocs(emp.employeeId, emp.employeeName)}
                                    >
                                        {emp.employeeName}
                                    </Button>
                                </td>
                                <td>{emp.employeeId}</td>
                                <td>{emp.documents.length}</td>
                                <td>{getNearestExpiry(emp.documents)}</td>
                                <td>{getStatusBadge(emp.documents)}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        style={{
                                            borderColor: theme.colors.accent,
                                            color: theme.colors.accent
                                        }}
                                        onClick={() => goToEmployeeDocs(emp.employeeId, emp.employeeName)}
                                    >
                                        عرض التفاصيل
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default DocumentListTable;
