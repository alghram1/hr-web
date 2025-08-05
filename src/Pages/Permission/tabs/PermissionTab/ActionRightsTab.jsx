import React, { useEffect, useState } from 'react';
import { Accordion, Spinner, Alert } from 'react-bootstrap';
import PageActionsByPage from './PageActionsByPage';
import axios from 'axios';
import theme from '../../../../theme'; // ✅ استيراد الهوية البصرية

const useMock = true;

const ActionRightsTab = ({ roleId }) => {
    const [pagesWithActions, setPagesWithActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!roleId) return;

        const fetchActions = async () => {
            setLoading(true);
            setError('');
            try {
                if (useMock) {
                    const mockData = [
                        {
                            pageId: 1,
                            pageName: 'الموظفين',
                            actions: [
                                {
                                    actionId: 101,
                                    actionName: 'طباعة السيرة الذاتية',
                                    code: 'PRINT_CV',
                                    group: 'UI',
                                    description: 'يسمح بطباعة السيرة الذاتية',
                                    isGranted: true,
                                },
                                {
                                    actionId: 102,
                                    actionName: 'حذف الموظف',
                                    code: 'DELETE_EMPLOYEE',
                                    group: 'Workflow',
                                    description: 'إجراء لحذف سجل الموظف',
                                    isGranted: false,
                                },
                            ],
                        },
                        {
                            pageId: 2,
                            pageName: 'الإجازات',
                            actions: [
                                {
                                    actionId: 201,
                                    actionName: 'اعتماد الإجازة',
                                    code: 'APPROVE_LEAVE',
                                    group: 'Workflow',
                                    description: '',
                                    isGranted: true,
                                },
                                {
                                    actionId: 202,
                                    actionName: 'إلغاء الإجازة',
                                    code: 'CANCEL_LEAVE',
                                    group: 'Workflow',
                                    description: '',
                                    isGranted: false,
                                },
                            ],
                        },
                    ];
                    console.log('[Mock] Actions by page:', mockData);
                    setPagesWithActions(mockData);
                } else {
                    const { data } = await axios.get(`/api/roles/${roleId}/actions`);
                    setPagesWithActions(data);
                }
            } catch (err) {
                console.error('❌ Error fetching actions:', err);
                setError('فشل في تحميل صلاحيات الإجراءات. يرجى المحاولة لاحقاً.');
            } finally {
                setLoading(false);
            }
        };

        fetchActions();
    }, [roleId]);

    // ✅ تصميم مخصص للتنبيهات حسب اللون الموحد
    const customAlertStyle = {
        borderRight: `4px solid ${theme.colors.accent}`,
        backgroundColor: `${theme.colors.accent}10`,
        color: theme.colors.textDark
    };

    if (!roleId)
        return (
            <Alert style={customAlertStyle}>
                ⚠️ الرجاء تحديد دور لعرض الصلاحيات.
            </Alert>
        );

    if (loading)
        return (
            <div className="text-center py-5">
                <Spinner animation="border" style={{ color: theme.colors.accent }} />
            </div>
        );

    if (error)
        return (
            <Alert style={{ ...customAlertStyle, borderRightColor: 'red' }}>
                {error}
            </Alert>
        );

    return (
        <div>
            <h5 className="mb-4" style={{ color: theme.colors.accent }}>
                🛠️ صلاحيات الإجراءات حسب الصفحات
            </h5>

            {pagesWithActions.length === 0 ? (
                <Alert style={customAlertStyle}>
                    لا توجد إجراءات مرتبطة بهذا الدور حالياً.
                </Alert>
            ) : (
                <Accordion defaultActiveKey={pagesWithActions[0]?.pageId.toString()}>
                    {pagesWithActions.map((page) => (
                        <Accordion.Item eventKey={page.pageId.toString()} key={page.pageId}>
                            <Accordion.Header>
                                <span style={{ color: theme.colors.accent }}>📄 {page.pageName}</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <PageActionsByPage
                                    pageId={page.pageId}
                                    pageName={page.pageName}
                                    actions={page.actions}
                                    roleId={roleId}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default ActionRightsTab;
