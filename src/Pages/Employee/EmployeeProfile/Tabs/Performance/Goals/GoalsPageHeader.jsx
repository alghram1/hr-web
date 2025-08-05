// Components/Performance/Goals/GoalsPageHeader.jsx

import React from 'react';
import { Row, Col, Breadcrumb, Dropdown, Button } from 'react-bootstrap';
import { BsInfoCircle, BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BsGift, BsArrowRightCircle } from 'react-icons/bs';
const performanceCycles = [
    { id: 1, label: 'Q4 / 2024', from: '21/11/2024', to: '20/02/2025', status: 'ماضي' },
    { id: 2, label: 'Q1 / 2025', from: '21/02/2025', to: '20/05/2025', status: 'حالي' },
    { id: 3, label: 'Q2 / 2025', from: '21/05/2025', to: '20/08/2025', status: 'مستقبلي' }
];

const GoalsPageHeader = ({
    employeeName = 'Abdulrahman Alghram',
    selectedCycleId,
    onChangeCycle
}) => {
    const currentCycle = performanceCycles.find(c => c.id === selectedCycleId);
    const navigate = useNavigate();
    const handleViewGoals = () => {
        navigate('/employees/Goals/Create'); // 👈 التنقل للصفحة
    };

    return (
       
        <div className="mb-4" dir="rtl">
            {/* 🔹 مسار التصفح */}
            <Breadcrumb className="small mb-2">
                <Breadcrumb.Item href="#">الموظفين</Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{employeeName}</Breadcrumb.Item>
                <Breadcrumb.Item active>الأهداف</Breadcrumb.Item>
            </Breadcrumb>

            {/* 🔹 عنوان الصفحة وزر الإنشاء */}
            <Row className="align-items-center justify-content-between mb-3">
                <Col md="6" className="d-flex align-items-center gap-2 flex-wrap">
                    <h4 className="fw-bold mb-0">
                        الأهداف <span className="text-dark">{employeeName}</span>
                    </h4>
                </Col>

                <Col md="6" className="d-flex justify-content-md-end mt-2 mt-md-0">
                    <Button
                        variant="success"
                        className="d-flex align-items-center gap-2 px-3 py-1"
                        style={{ backgroundColor: '#198754', border: 'none' }}
                        onClick={handleViewGoals} // ← الربط هنا
                    >
                        <BsPlusCircle />
                        إنشاء هدف
                    </Button>
                </Col>
            </Row>

            {/* 🔹 بيانات الدورة والمعايرة */}
            <Row className="align-items-center justify-content-between g-2">
                <Col md="6" className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="small text-muted">دورة الأداء:</span>
                    <span className="fw-bold">{currentCycle.label}</span>
                    <span className="text-muted small">{currentCycle.from} - {currentCycle.to}</span>

                    <Dropdown onSelect={(val) => onChangeCycle(parseInt(val))}>
                        <Dropdown.Toggle
                            variant="light"
                            size="sm"
                            className="border text-dark small px-3 py-1"
                        >
                            {`${currentCycle.label} - ${currentCycle.status}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {performanceCycles.map(cycle => (
                                <Dropdown.Item
                                    key={cycle.id}
                                    eventKey={cycle.id}
                                    active={cycle.id === selectedCycleId}
                                >
                                    {`${cycle.label} | ${cycle.from} - ${cycle.to} | ${cycle.status}`}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col md="6" className="d-flex justify-content-md-end align-items-center gap-2">
                    <BsInfoCircle size={16} className="text-muted" />
                    <span className="fw-semibold text-dark small">المعايرة والإبلاغ:</span>
                    <span className="small text-muted">{`${currentCycle.from} - ${currentCycle.to}`}</span>
                </Col>
            </Row>
        </div>
    );
};

export default GoalsPageHeader;
