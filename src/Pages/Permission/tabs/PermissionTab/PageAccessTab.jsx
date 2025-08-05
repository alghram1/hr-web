import React, { useEffect, useState } from 'react';
import SmartTable from '../../../../Components/SmartTable';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import theme from '../../../../theme'; // ✅ الهوية البصرية

const PageAccessTab = ({ roleId }) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const useMock = true;

    const staticActions = [
        { key: 'view', label: 'عرض' },
        { key: 'add', label: 'إضافة' },
        { key: 'edit', label: 'تعديل' },
        { key: 'delete', label: 'حذف' }
    ];

    useEffect(() => {
        if (!roleId) return;

        const fetchData = async () => {
            try {
                if (useMock) {
                    const mock = [
                        {
                            pageId: 1,
                            pageName: 'لوحة التحكم',
                            route: '/dashboard',
                            actions: [
                                { name: 'view', label: 'عرض', granted: true },
                                { name: 'add', label: 'إضافة', granted: true },
                                { name: 'edit', label: 'تعديل', granted: true },
                                { name: 'delete', label: 'حذف', granted: false },
                            ]
                        },
                        {
                            pageId: 2,
                            pageName: 'الموظفين',
                            route: '/employees',
                            actions: [
                                { name: 'view', label: 'عرض', granted: true },
                                { name: 'add', label: 'إضافة', granted: false },
                                { name: 'edit', label: 'تعديل', granted: true },
                                { name: 'delete', label: 'حذف', granted: false },
                            ]
                        }
                    ];
                    setPermissions(mock);
                } else {
                    const { data } = await axios.get(`/api/permissions/page-access/full?roleId=${roleId}`);
                    setPermissions(data);
                }
            } catch (error) {
                console.error("❌ فشل تحميل صلاحيات الصفحات", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roleId]);

    const togglePermission = async (pageId, actionName, currentValue) => {
        try {
            if (!useMock) {
                await axios.post('/api/permissions/page-access/update', {
                    roleId,
                    pageId,
                    permissionType: actionName,
                    value: !currentValue
                });
            }

            setPermissions(prev =>
                prev.map(p =>
                    p.pageId === pageId
                        ? {
                            ...p,
                            actions: p.actions.map(a =>
                                a.name === actionName ? { ...a, granted: !currentValue } : a
                            )
                        }
                        : p
                )
            );
        } catch (error) {
            console.error('❌ فشل تعديل الصلاحية', error);
        }
    };

    const toggleAll = (value) => {
        const updated = permissions.map(p => ({
            ...p,
            actions: p.actions.map(a => ({ ...a, granted: value }))
        }));
        setPermissions(updated);
    };

    const handleSaveAll = async () => {
        try {
            if (!useMock) {
                await axios.post('/api/permissions/page-access/bulk-update', {
                    roleId,
                    permissions
                });
            }
            setShowToast(true);
        } catch {
            alert('❌ فشل في حفظ التغييرات');
        }
    };

    const columns = [
        { key: 'pageName', label: 'اسم الصفحة' },
        { key: 'route', label: 'المسار' },
        ...staticActions.map(action => ({
            key: action.key,
            label: action.label,
            render: (_, row) => {
                const actionObj = row.actions?.find(a => a.name === action.key);
                return (
                    <Form.Check
                        type="switch"
                        id={`${action.key}-${row.pageId}`}
                        checked={actionObj?.granted || false}
                        onChange={() => togglePermission(row.pageId, action.key, actionObj?.granted || false)}
                    />
                );
            }
        }))
    ];

    return (
        <div className="page-access-tab">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ color: theme.colors.accent }}>🔓 صلاحيات الوصول للصفحات</h5>
                <span
                    className="badge"
                    style={{
                        backgroundColor: `${theme.colors.accent}20`,
                        color: theme.colors.accent,
                        fontWeight: 500
                    }}
                >
                    الدور الحالي: #{roleId}
                </span>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll(true)}>✅ تفعيل الكل</Button>
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll(false)}>🔒 تعطيل الكل</Button>
                <Button size="sm" style={buttonStyle(true)} onClick={handleSaveAll}>💾 حفظ التغييرات</Button>
            </div>

            {loading ? (
                <p>⏳ جاري تحميل صلاحيات الصفحات...</p>
            ) : (
                <SmartTable
                    columns={columns}
                    data={permissions}
                    showActions={false}
                />
            )}

            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={2000}
                    autohide
                    style={{
                        borderRight: `4px solid ${theme.colors.accent}`,
                        backgroundColor: `${theme.colors.accent}15`
                    }}
                >
                    <Toast.Body style={{ color: theme.colors.accent }}>
                        ✅ تم حفظ التغييرات بنجاح
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

// ✅ أسلوب مركزي لتوحيد الأزرار
const buttonStyle = (filled = false) => ({
    backgroundColor: filled ? theme.colors.accent : 'transparent',
    borderColor: theme.colors.accent,
    color: filled ? '#fff' : theme.colors.accent,
    fontWeight: 500
});

export default PageAccessTab;
