import React, { useEffect, useState } from 'react';
import SmartTable from '../../../../Components/SmartTable';
import { Badge, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import theme from '../../../../theme'; // ✅ استيراد الهوية البصرية

const MenuAccessTab = ({ roleId }) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const useMock = true;

    useEffect(() => {
        if (!roleId) return;

        const fetchMenus = async () => {
            try {
                if (useMock) {
                    const mockData = [
                        {
                            menuId: 1,
                            menuName: 'لوحة التحكم',
                            type: 'main',
                            route: '/dashboard',
                            visible: true,
                            accessible: true,
                            order: 1,
                            updatedAt: '2025-06-26T12:00:00Z'
                        },
                        {
                            menuId: 2,
                            menuName: 'الموظفين',
                            type: 'submenu',
                            route: '/employees',
                            visible: true,
                            accessible: false,
                            order: 2,
                            updatedAt: '2025-06-25T11:00:00Z'
                        },
                        {
                            menuId: 3,
                            menuName: 'الإعدادات',
                            type: 'hidden',
                            route: '/settings',
                            visible: false,
                            accessible: false,
                            order: 3,
                            updatedAt: '2025-06-24T09:15:00Z'
                        }
                    ];
                    setMenus(mockData);
                } else {
                    const { data } = await axios.get(`/api/permissions/menu-access?roleId=${roleId}`);
                    setMenus(data);
                }
            } catch (err) {
                console.error('❌ فشل تحميل بيانات القوائم', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, [roleId]);

    const togglePermission = (menuId, type, currentValue) => {
        setMenus(prev =>
            prev.map(menu =>
                menu.menuId === menuId
                    ? {
                        ...menu,
                        [type]: !currentValue,
                        updatedAt: new Date().toISOString()
                    }
                    : menu
            )
        );
    };

    const toggleAll = (type, value) => {
        const updated = menus.map(menu => ({
            ...menu,
            [type]: value,
            updatedAt: new Date().toISOString()
        }));
        setMenus(updated);
    };

    const handleSaveAll = async () => {
        try {
            if (!useMock) {
                await axios.post('/api/permissions/menu-access/bulk-update', {
                    roleId,
                    menus
                });
            }
            setShowToast(true);
        } catch (err) {
            alert('❌ فشل حفظ التغييرات');
        }
    };

    const renderTypeBadge = (value) => {
        const map = {
            main: { text: 'رئيسية', color: theme.colors.accent },
            submenu: { text: 'فرعية', color: theme.colors.grayDark },
            hidden: { text: 'مخفية', color: '#6c757d' },
        };
        const config = map[value] || { text: value, color: '#adb5bd' };
        return (
            <span
                style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500
                }}
            >
                {config.text}
            </span>
        );
    };

    const columns = [
        {
            key: 'menuName',
            label: 'اسم القائمة',
            render: (_, row) => (
                <>
                    {row.menuName}
                    {row.type === 'hidden' && <i className="ms-2 text-muted bi bi-eye-slash" title="قائمة مخفية" />}
                </>
            )
        },
        {
            key: 'type',
            label: 'النوع',
            render: (value) => renderTypeBadge(value)
        },
        { key: 'route', label: 'المسار' },
        {
            key: 'visible',
            label: 'الظهور',
            render: (_, row) => (
                <Form.Check
                    type="switch"
                    id={`visible-${row.menuId}`}
                    checked={row.visible}
                    onChange={() => togglePermission(row.menuId, 'visible', row.visible)}
                />
            )
        },
        {
            key: 'accessible',
            label: 'الوصول',
            render: (_, row) => (
                <Form.Check
                    type="switch"
                    id={`accessible-${row.menuId}`}
                    checked={row.accessible}
                    onChange={() => togglePermission(row.menuId, 'accessible', row.accessible)}
                />
            )
        },
        {
            key: 'updatedAt',
            label: 'آخر تحديث',
            render: (value) => new Date(value).toLocaleString('ar-EG')
        }
    ];

    return (
        <div className="menu-access-tab">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ color: theme.colors.accent }}>📋 صلاحيات القوائم</h5>
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
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll('visible', true)}>👁️ إظهار الكل</Button>
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll('visible', false)}>🙈 إخفاء الكل</Button>
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll('accessible', true)}>✅ تفعيل الكل</Button>
                <Button size="sm" style={buttonStyle()} onClick={() => toggleAll('accessible', false)}>🔒 تعطيل الكل</Button>
                <Button size="sm" style={buttonStyle(true)} onClick={handleSaveAll}>💾 حفظ التغييرات</Button>
            </div>

            {loading ? (
                <p>⏳ جاري تحميل صلاحيات القوائم...</p>
            ) : (
                <SmartTable
                    columns={columns}
                    data={menus}
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

// ✅ زر موحد بلون الهوية
const buttonStyle = (filled = false) => ({
    backgroundColor: filled ? theme.colors.accent : 'transparent',
    borderColor: theme.colors.accent,
    color: filled ? '#fff' : theme.colors.accent,
    fontWeight: 500
});

export default MenuAccessTab;
