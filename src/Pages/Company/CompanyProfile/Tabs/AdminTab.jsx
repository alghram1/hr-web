import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { BiEdit, BiUserCircle } from 'react-icons/bi';
import theme from '../../../../theme'; // ✅ استيراد الهوية البصرية

const AdminTab = () => {
    const admin = {
        name: 'عبدالرحمن العمري',
        email: 'admin@company.com',
        role: 'مدير النظام',
        lastLogin: '2025-06-16 09:15',
        status: 'نشط',
    };

    return (
        <div className="p-2 p-md-3" dir="rtl">
            <h4 className="fw-bold mb-4">🛡️ الصفحة الإدارية (الرئيسية)</h4>

            {/* ✅ بطاقة الأدمن */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
                <Card.Body className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center">
                        <BiUserCircle size={48} style={{ color: theme.colors.primary }} className="me-3" />
                        <div>
                            <h5 className="fw-bold mb-1">{admin.name}</h5>
                            <p className="mb-1 text-muted small">{admin.email}</p>
                            <Badge
                                className="me-2"
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    color: '#fff',
                                    fontWeight: '500'
                                }}
                            >
                                {admin.status}
                            </Badge>
                            <Badge
                                style={{
                                    backgroundColor: theme.colors.primaryDark,
                                    color: '#fff',
                                    fontWeight: '500'
                                }}
                            >
                                {admin.role}
                            </Badge>
                        </div>
                    </div>
                    <div className="mt-3 mt-md-0 text-center text-md-end">
                        <p className="mb-1 small text-muted">آخر دخول:</p>
                        <p className="mb-2 fw-bold">{admin.lastLogin}</p>
                        <Button
                            className="rounded-pill fw-bold"
                            style={{
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <BiEdit className="ms-2" />
                            تعديل الملف الشخصي
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminTab;
