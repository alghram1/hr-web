import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import SmartTable from '../../Components/SmartTable';
import {
    Button, Modal, Form, Toast, ToastContainer, Spinner, Container
} from 'react-bootstrap';
import axios from 'axios';
import theme from '../../theme'; // ✅ الهوية البصرية

const PageManagementForDeveloper = () => {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [actions, setActions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAction, setNewAction] = useState({ code: '', actionName: '', group: '', description: '' });
    const [toast, setToast] = useState({ show: false, message: '', success: true });
    const [loading, setLoading] = useState(false);
    const useMock = true;

    useEffect(() => {
        if (useMock) {
            setPages([
                { id: 1, name: 'الموظفين', url: '/employees', displayOrder: 1 },
                { id: 2, name: 'الإجازات', url: '/leaves', displayOrder: 2 },
            ]);
        } else {
            fetchPages();
        }
    }, []);

    const fetchPages = async () => {
        try {
            const { data } = await axios.get('/api/pages');
            setPages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const openActionsModal = async (page) => {
        setSelectedPage(page);

        if (useMock) {
            setActions([
                { code: 'PRINT_CV', actionName: 'طباعة السيرة الذاتية', group: 'UI', description: 'زر لطباعة CV' },
                { code: 'DELETE_EMPLOYEE', actionName: 'حذف موظف', group: 'Workflow', description: 'حذف سجل الموظف' },
            ]);
            setShowModal(true);
            return;
        }

        try {
            const { data } = await axios.get(`/api/pages/${page.id}/actions`);
            setActions(data);
            setShowModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const isFormValid = newAction.code.trim() !== '' && newAction.actionName.trim() !== '';
    const isCodeDuplicate = actions.some(
        (a) => a.code.trim().toLowerCase() === newAction.code.trim().toLowerCase()
    );

    const handleSaveAction = async () => {
        if (!isFormValid || isCodeDuplicate) {
            setToast({ show: true, message: '⚠️ الرجاء إدخال كود فريد واسم الإجراء', success: false });
            return;
        }

        setLoading(true);

        const payload = {
            ...newAction,
            pageId: selectedPage?.id,
        };

        if (useMock) {
            setActions((prev) => [...prev, payload]);
            setNewAction({ code: '', actionName: '', group: '', description: '' });
            setToast({ show: true, message: '✅ تم إضافة الإجراء تجريبيًا وربطه بالصفحة', success: true });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`/api/pages/${selectedPage.id}/actions`, payload);
            setActions([...actions, data]);
            setNewAction({ code: '', actionName: '', group: '', description: '' });
            setToast({ show: true, message: '✅ تم إضافة الإجراء وتوليد الصلاحية بنجاح', success: true });
        } catch (err) {
            console.error(err);
            setToast({ show: true, message: '❌ فشل في حفظ الإجراء', success: false });
        } finally {
            setLoading(false);
        }
    };

    const pageColumns = [
        { key: 'name', label: 'اسم الصفحة' },
        { key: 'url', label: 'الرابط' },
        { key: 'displayOrder', label: 'ترتيب العرض' },
    ];

    const actionColumns = [
        { key: 'code', label: 'الكود' },
        { key: 'actionName', label: 'الإجراء' },
        { key: 'group', label: 'المجموعة' },
        { key: 'description', label: 'الوصف' },
    ];

    const renderPageActions = (page) => (
        <Button
            size="sm"
            className="rounded-pill px-3"
            title="عرض الإجراءات"
            style={{
                borderColor: theme.colors.accent,
                color: theme.colors.accent,
                backgroundColor: 'transparent'
            }}
            onClick={() => openActionsModal(page)}
        >
            <i className="bi bi-gear-fill"></i> إدارة
        </Button>
    );

    return (
        <MainLayout>
            <Container fluid className="container-fluid py-4">
                <h5 className="mt-4">⚙️ إدارة الصفحات والإجراءات (للمطور)</h5>

                <SmartTable
                    columns={pageColumns}
                    data={pages}
                    bordered
                    hover
                    striped
                    responsive
                    showIndex
                    customActions={(row) => renderPageActions(row)}
                />

                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>🧩 إدارة إجراءات الصفحة: {selectedPage?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SmartTable
                            columns={actionColumns}
                            data={actions}
                            bordered
                            hover
                            striped
                            responsive
                            showIndex={false}
                            showActions={false}
                        />

                        <Form className="mt-4">
                            <h6 className="mb-3">➕ إضافة إجراء جديد</h6>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>الكود *</Form.Label>
                                        <Form.Control
                                            value={newAction.code}
                                            onChange={(e) => setNewAction({ ...newAction, code: e.target.value })}
                                        />
                                        {isCodeDuplicate && (
                                            <Form.Text className="text-danger">
                                                ⚠️ هذا الكود مستخدم مسبقًا.
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>اسم الإجراء *</Form.Label>
                                        <Form.Control
                                            value={newAction.actionName}
                                            onChange={(e) => setNewAction({ ...newAction, actionName: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>المجموعة</Form.Label>
                                        <Form.Control
                                            value={newAction.group}
                                            onChange={(e) => setNewAction({ ...newAction, group: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group>
                                        <Form.Label>الوصف</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={newAction.description}
                                            onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <Button
                                    style={{
                                        backgroundColor: theme.colors.accent,
                                        borderColor: theme.colors.accent,
                                        color: '#fff'
                                    }}
                                    onClick={handleSaveAction}
                                    disabled={!isFormValid || isCodeDuplicate || loading}
                                >
                                    {loading ? <Spinner size="sm" animation="border" /> : 'حفظ الإجراء'}
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

                <ToastContainer position="bottom-end" className="p-3">
                    <Toast
                        bg="light"
                        show={toast.show}
                        onClose={() => setToast({ ...toast, show: false })}
                        delay={3000}
                        autohide
                        style={{
                            borderRight: `4px solid ${toast.success ? theme.colors.accent : '#dc3545'}`,
                            color: toast.success ? theme.colors.accent : '#dc3545'
                        }}
                    >
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container>
        </MainLayout>
    );
};

export default PageManagementForDeveloper;
