import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import MainLayout from '../../Layout/MainLayout';
import LeavePolicyFormModal from './LeavePolicyFormModal';
import SmartTable from '../../Components/SmartTable';
import theme from '../../theme'; // ✅ الهوية البصرية

const MemoizedLeavePolicyFormModal = memo(LeavePolicyFormModal);

export default function LeavePolicySetup() {
    const [policies, setPolicies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [policyToDelete, setPolicyToDelete] = useState(null);

    useEffect(() => {
        const fetchPolicies = async () => {
            const dummyData = [
                {
                    id: 1,
                    name: 'إجازة سنوية',
                    type: 'مدفوعة',
                    days: 30,
                    eligibilityAfterMonths: 12,
                    carryOver: true,
                    maxCarryDays: 60,
                    active: true
                },
                {
                    id: 2,
                    name: 'إجازة مرضية',
                    type: 'مدفوعة',
                    days: 15,
                    eligibilityAfterMonths: 6,
                    carryOver: false,
                    maxCarryDays: 0,
                    active: true
                }
            ];
            setPolicies(dummyData);
        };
        fetchPolicies();
    }, []);

    const handleSavePolicy = useCallback((formData) => {
        if (editingPolicy) {
            setPolicies(prev => prev.map(p =>
                p.id === editingPolicy.id ? { ...editingPolicy, ...formData } : p
            ));
        } else {
            const nextId = policies.length ? Math.max(...policies.map(p => p.id)) + 1 : 1;
            setPolicies(prev => [...prev, { ...formData, id: nextId }]);
        }
        setEditingPolicy(null);
        setShowModal(false);
    }, [editingPolicy, policies]);

    const confirmDelete = useCallback(() => {
        setPolicies(prev => prev.filter(p => p.id !== policyToDelete.id));
        setShowDeleteModal(false);
        setPolicyToDelete(null);
    }, [policyToDelete]);

    const handleEdit = useCallback((policy) => {
        setEditingPolicy({ ...policy });
        setShowModal(true);
    }, []);

    const handleDeleteRequest = useCallback((policy) => {
        setPolicyToDelete(policy);
        setShowDeleteModal(true);
    }, []);

    const columns = [
        { key: 'name', label: 'اسم الإجازة' },
        { key: 'type', label: 'النوع' },
        { key: 'days', label: 'عدد الأيام' },
        { key: 'eligibilityAfterMonths', label: 'الاستحقاق بعد (شهور)' },
        {
            key: 'carryOver',
            label: 'الترحيل',
            render: val => (
                <span className={`badge`} style={{
                    backgroundColor: val ? theme.colors.accent : '#6c757d'
                }}>
                    {val ? 'نعم' : 'لا'}
                </span>
            )
        },
        {
            key: 'maxCarryDays',
            label: 'الحد الأعلى للترحيل',
            render: (val, item) => item.carryOver ? val : '-'
        },
        {
            key: 'active',
            label: 'الحالة',
            render: val => (
                <span className="badge" style={{
                    backgroundColor: val ? theme.colors.accent : '#adb5bd'
                }}>
                    {val ? 'مفعّلة' : 'معطلة'}
                </span>
            )
        }
    ];

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4">
                <Card className="shadow rounded-4 border-0">
                    <Card.Body>
                        <Row className="mb-4 align-items-center">
                            <Col>
                                <h3 className="fw-bold" style={{ color: theme.colors.accent }}>
                                    تعريف سياسات الإجازات
                                </h3>
                            </Col>
                            <Col className="text-start">
                                <Button
                                    style={{
                                        backgroundColor: theme.colors.accent,
                                        borderColor: theme.colors.accent
                                    }}
                                    className="fw-bold"
                                    onClick={() => {
                                        setShowModal(true);
                                        setEditingPolicy(null);
                                    }}
                                >
                                    <FaPlusCircle className="ms-2" />
                                    سياسة جديدة
                                </Button>
                            </Col>
                        </Row>

                        <SmartTable
                            columns={columns}
                            data={policies}
                            onEdit={handleEdit}
                            onDelete={handleDeleteRequest}
                        />
                    </Card.Body>
                </Card>

                <MemoizedLeavePolicyFormModal
                    show={showModal}
                    onClose={() => { setShowModal(false); setEditingPolicy(null); }}
                    onSave={handleSavePolicy}
                    initialData={editingPolicy}
                />

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger fw-bold">تأكيد الحذف</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        هل أنت متأكد أنك تريد حذف سياسة "{policyToDelete?.name}"؟
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>إلغاء</Button>
                        <Button variant="danger" onClick={confirmDelete}>نعم، حذف</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </MainLayout>
    );
}
