import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import MainLayout from '../../../Layout/MainLayout';
import AttendanceTabs from '../AttendanceTab/AttendanceTabs';
import TimeAdjustmentsFilters from './TimeAdjustmentsFilters';
import TimeAdjustmentsTable from './TimeAdjustmentsTable';
import EditTimeModal from './EditTimeModal';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const TimeAdjustmentsPage = () => {
    const location = useLocation();
    const isActive = location.pathname === '/dashboard/time-adjustments';

    const [filters, setFilters] = useState({
        employeeId: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        search: ''
    });

    const [adjustments, setAdjustments] = useState([]);

    useEffect(() => {
        const mockData = [
            {
                id: 'ADJ001',
                employeeName: 'محمد الزهراني',
                employeeId: 'EMP001',
                date: '2025-05-06',
                originalIn: '09:00',
                originalOut: '17:00',
                requestedIn: '10:00',
                requestedOut: '16:30',
                newIn: '',
                newOut: '',
                reason: 'ظرف طارئ',
                status: 'قيد الانتظار'
            },
            {
                id: 'ADJ002',
                employeeName: 'سارة سعيد',
                employeeId: 'EMP002',
                date: '2025-05-05',
                originalIn: '08:30',
                originalOut: '16:30',
                requestedIn: '09:00',
                requestedOut: '16:00',
                newIn: '',
                newOut: '',
                reason: 'موعد طبي',
                status: 'مرفوض'
            },
            {
                id: 'ADJ003',
                employeeName: 'حنان سعيد',
                employeeId: 'EMP0302',
                date: '2025-05-05',
                originalIn: '08:30',
                originalOut: '16:30',
                requestedIn: '09:00',
                requestedOut: '16:00',
                newIn: '',
                newOut: '',
                reason: 'موعد طبي',
                status: 'مقبول'
            }
        ];
        setAdjustments(mockData);
    }, [filters]);

    const handleFilterChange = useCallback((updatedFilters) => {
        setFilters(updatedFilters);
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleEditClick = (request) => {
        setSelectedRequest(request);
        setModalVisible(true);
    };

    const handleSaveEdit = (updatedRequest) => {
        setAdjustments((prev) =>
            prev.map((item) => (item.id === updatedRequest.id ? updatedRequest : item))
        );
        setModalVisible(false);
    };

    const handleReject = (request) => {
        setAdjustments((prev) =>
            prev.map((item) =>
                item.id === request.id ? { ...item, status: 'مرفوض' } : item
            )
        );
    };

    const handleApprove = (request) => {
        setSelectedRequest(request);
        setModalVisible(true);
    };

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4">
                <h3 className="fw-bold text-end mb-4" style={{ color: theme.colors.primary }}>
                    إدارة تعديلات الحضور والانصراف
                </h3>

                {/* ✅ التبويبات الرئيسية */}
                <AttendanceTabs />

                {isActive && (
                    <>
                        <Card className="mt-3 p-3 shadow-sm border-0">
                            <Row className="mb-4">
                                <Col>
                                    <TimeAdjustmentsFilters
                                        filters={filters}
                                        onChange={handleFilterChange}
                                        onReset={() =>
                                            setFilters({
                                                employeeId: '',
                                                status: '',
                                                dateFrom: '',
                                                dateTo: '',
                                                search: ''
                                            })
                                        }
                                    />
                                </Col>
                            </Row>

                            <TimeAdjustmentsTable
                                data={adjustments}
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onEdit={handleEditClick}
                            />
                        </Card>

                        <EditTimeModal
                            show={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onSave={handleSaveEdit}
                            selectedRequest={selectedRequest}
                        />
                    </>
                )}
            </Container>
        </MainLayout>
    );
};

export default TimeAdjustmentsPage;
