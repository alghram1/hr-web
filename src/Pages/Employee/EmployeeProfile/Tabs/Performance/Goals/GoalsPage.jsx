// Pages/Employee/EmployeeProfile/Tabs/GoalsPage.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsGift, BsArrowRightCircle } from 'react-icons/bs';
import GoalsTable from './GoalsTable';
import MainLayout from '../../../../../../Layout/MainLayout';
import GoalsPageHeader from './GoalsPageHeader';
import '../../../../../../Styles/EmployeeProfilePage.scss';
import { useNavigate } from 'react-router-dom';
import EditWeightsModal from './EditWeightsModal'

// ✅ بيانات الأهداف حسب الدورة (Mock مؤقت لحين ربط API)
const goalsByCycle = {
    1: [
        {
            id: 1,
            name: 'الانضباط في الحضور',
            type: 'إدارة الوقت والموارد',
            startDate: '2024-11-21',
            endDate: '2025-02-20',
            weight: 70,
            createdBy: 'Abdulrahman Sha',
        },
        {
            id: 2,
            name: 'الإلتزام بضوابط العمل',
            type: 'السلوك الوظيفي',
            startDate: '2024-11-21',
            endDate: '2025-02-20',
            weight: 45,
            createdBy: 'Abdulrahman Sha',
        },
    ],
    2: [
        {
            id: 3,
            name: 'تحقيق المبيعات',
            type: 'الإنجازات',
            startDate: '2025-02-22',
            endDate: '2025-05-10',
            weight: 60,
            createdBy: 'Motab almansor',
        },
    ],
    3: [] // لا أهداف حتى الآن
};

const GoalsPage = () => {
    const [selectedCycleId, setSelectedCycleId] = useState(1);
    const needsWeightReview = true;

    const currentGoals = goalsByCycle[selectedCycleId] || [];

    const [showEditModal, setShowEditModal] = useState(false);
    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    


    return (
        <MainLayout>
            <Container fluid className="pt-5 position-relative" dir="rtl">
                {/* 🔹 رأس الصفحة */}
                <GoalsPageHeader
                    selectedCycleId={selectedCycleId}
                    onChangeCycle={setSelectedCycleId}
                />

                {/* 🔹 تنبيه مراجعة الأوزان */}
                {needsWeightReview && (
                    <div
                        className="rounded border p-3 mb-4"
                        style={{
                            backgroundColor: '#fff8e1',
                            borderColor: '#ffeeba',
                            borderWidth: '1px',
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                                <div className="fw-semibold text-warning mb-1">
                                    ⚠️ الأوزان تحتاج المراجعة.
                                </div>
                                <div className="small text-muted">
                                    لا يمكن تعديل أوزان الهدف بعد تاريخ انتهاء الدورة (20 فبراير 2025).
                                </div>
                            </div>
                           <Button size="sm" variant="outline-secondary" onClick={handleOpenEditModal}>
                                تعديل الأوزان
                            </Button>

                        </div>
                    </div>
                )}

                {/* 🔹 جدول الأهداف حسب الدورة المختارة */}
                <GoalsTable goals={currentGoals} />

                {/* 🔹 زر عائم */}
                <Button
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '30px',
                        backgroundColor: '#6f42c1',
                        border: 'none',
                        borderRadius: '50%',
                        width: '52px',
                        height: '52px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        zIndex: 99
                    }}
                    title="نقاط إضافية أو حوافز"
                >
                    <BsGift size={24} color="#fff" />
                </Button>
                {showEditModal && (
            <EditWeightsModal
                show={showEditModal}
                onClose={handleCloseEditModal}
                goals={currentGoals}
                onSave={(updatedGoals) => {
                    // لاحقًا: حدث حفظ الأوزان في الـ API أو الحالة
                    console.log('تم الحفظ:', updatedGoals);
                    handleCloseEditModal();
                }}
            />
)}

            </Container>
        </MainLayout>
    );
};

export default GoalsPage;
