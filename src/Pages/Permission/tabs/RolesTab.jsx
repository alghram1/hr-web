import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SmartTable from '../../../Components/SmartTable';
import theme from '../../../theme';// ✅ استيراد الهوية البصرية

const initialRole = { id: null, roleName: '', description: '' };

const RolesTab = ({ onSelectRole }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(initialRole);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const mockRoles = [
                    { id: 1, roleName: 'مدير النظام', description: 'له جميع الصلاحيات', permissionsCount: 54 },
                    { id: 2, roleName: 'موارد بشرية', description: 'إدارة الموارد', permissionsCount: 33 },
                    { id: 3, roleName: 'محاسب', description: 'صلاحيات مالية', permissionsCount: 20 }
                ];
                setRoles(mockRoles);
            } catch (err) {
                console.error('حدث خطأ أثناء تحميل الأدوار', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentRole(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!currentRole.roleName.trim()) return setError('⚠️ اسم الدور مطلوب');
        try {
            setError('');
            if (isEditMode) {
                await axios.put(`/api/roles/${currentRole.id}`, currentRole);
            } else {
                await axios.post('/api/roles', currentRole);
            }

            setRoles(prev =>
                isEditMode
                    ? prev.map(r => r.id === currentRole.id
                        ? { ...currentRole, permissionsCount: r.permissionsCount }
                        : r)
                    : [...prev, { ...currentRole, id: Date.now(), permissionsCount: 0 }]
            );

            setModalOpen(false);
            setCurrentRole(initialRole);
        } catch (err) {
            setError('❌ حدث خطأ أثناء الحفظ');
        }
    };

    const handleEdit = (role) => {
        setCurrentRole(role);
        setIsEditMode(true);
        setModalOpen(true);
    };

    const handleDelete = async (role) => {
        if (!window.confirm('❗ هل أنت متأكد من حذف هذا الدور؟')) return;
        try {
            setRoles(prev => prev.filter(r => r.id !== role.id));
        } catch (err) {
            console.error('❌ فشل في حذف الدور', err);
        }
    };

    const handleViewPermissions = (role) => {
        if (typeof onSelectRole === 'function') {
            onSelectRole(role.id);
        }
    };

    const columns = [
        { key: 'roleName', label: 'اسم الدور' },
        { key: 'description', label: 'الوصف' },
        { key: 'permissionsCount', label: 'عدد الصلاحيات' }
    ];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ color: theme.colors.accent }}>🛡️ إدارة الأدوار والصلاحيات</h5>
                <button
                    className="btn"
                    style={{
                        backgroundColor: theme.colors.accent,
                        color: '#fff',
                        fontWeight: 'bold'
                    }}
                    onClick={() => {
                        setIsEditMode(false);
                        setCurrentRole(initialRole);
                        setModalOpen(true);
                    }}
                >
                    + إضافة دور
                </button>
            </div>

            {loading ? (
                <p>⏳ جاري تحميل البيانات...</p>
            ) : (
                <SmartTable
                    columns={columns}
                    data={roles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    customActions={(role, getIcon) => (
                        <button
                            className="btn btn-sm"
                            style={{
                                borderColor: theme.colors.accent,
                                color: theme.colors.accent,
                                backgroundColor: 'transparent',
                                borderRadius: '50px'
                            }}
                            onClick={() => handleViewPermissions(role)}
                        >
                            {getIcon('استعراض')} استعراض الصلاحيات
                        </button>
                    )}
                />
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal d-block" style={{ backgroundColor: '#00000080' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditMode ? 'تعديل الدور' : 'إضافة دور جديد'}
                                </h5>
                                <button className="btn-close" onClick={() => setModalOpen(false)} />
                            </div>
                            <div className="modal-body">
                                {error && (
                                    <div
                                        className="p-2 mb-3"
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        {error}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">اسم الدور</label>
                                    <input
                                        type="text"
                                        name="roleName"
                                        className="form-control"
                                        value={currentRole.roleName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">الوصف</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="3"
                                        value={currentRole.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setModalOpen(false)}
                                >
                                    إلغاء
                                </button>
                                <button
                                    className="btn"
                                    style={{
                                        backgroundColor: theme.colors.accent,
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                    onClick={handleSave}
                                >
                                    حفظ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesTab;
