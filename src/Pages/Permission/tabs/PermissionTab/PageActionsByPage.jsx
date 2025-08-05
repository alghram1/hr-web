import React, { useState } from 'react';
import SmartTable from '../../../../Components/SmartTable';
import { Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import theme from '../../../../theme'; // ✅ الهوية البصرية

const PageActionsByPage = ({ pageId, pageName, actions, roleId }) => {
    const [actionList, setActionList] = useState(actions);
    const [toast, setToast] = useState({ show: false, message: '', success: true });

    const handleToggle = async (action) => {
        try {
            const newValue = !action.isGranted;

            setActionList((prev) =>
                prev.map((a) =>
                    a.code === action.code ? { ...a, isGranted: newValue } : a
                )
            );

            await axios.post(`/api/roles/${roleId}/toggle-permission`, {
                permissionCode: action.code,
                isGranted: newValue,
            });

            setToast({
                show: true,
                message: `تم ${newValue ? 'تفعيل' : 'إلغاء'} الصلاحية: ${action.actionName}`,
                success: true,
            });
        } catch (err) {
            console.error(err);
            setToast({
                show: true,
                message: 'حدث خطأ أثناء تحديث الصلاحية',
                success: false,
            });

            setActionList((prev) =>
                prev.map((a) =>
                    a.code === action.code ? { ...a, isGranted: !action.isGranted } : a
                )
            );
        }
    };

    const columns = [
        { key: 'code', label: 'الكود' },
        { key: 'actionName', label: 'الإجراء' },
        {
            key: 'group',
            label: 'المجموعة',
            render: (value) => value || <span className="text-muted">—</span>,
        },
        {
            key: 'description',
            label: 'الوصف',
            render: (value) => value || <span className="text-muted">—</span>,
        },
        {
            key: 'isGranted',
            label: 'مفعل',
            render: (value, row) => (
                <Form.Check
                    type="switch"
                    id={`toggle-${pageId}-${row.code}`}
                    checked={value}
                    onChange={() => handleToggle(row)}
                />
            ),
        },
    ];

    return (
        <div className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: theme.colors.accent }}>
                {pageName}
            </h6>

            <SmartTable
                columns={columns}
                data={actionList}
                bordered
                hover
                striped
                responsive
                showActions={false}
                showIndex={true}
            />

            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    onClose={() => setToast({ ...toast, show: false })}
                    show={toast.show}
                    delay={2500}
                    autohide
                    style={{
                        borderRight: `4px solid ${toast.success ? theme.colors.accent : '#dc3545'}`,
                        backgroundColor: `${toast.success ? theme.colors.accent : '#dc3545'}15`
                    }}
                >
                    <Toast.Body style={{ color: toast.success ? theme.colors.accent : '#dc3545' }}>
                        {toast.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default PageActionsByPage;
