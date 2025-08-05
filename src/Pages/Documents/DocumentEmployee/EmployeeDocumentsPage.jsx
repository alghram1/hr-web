import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DocumentTabs from './DocumentTabs';
import DocumentCard from './DocumentCard';
import MainLayout from '../../../Layout/MainLayout';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

// ✅ بيانات وهمية مؤقتة لجميع الموظفين
const ALL_DOCUMENTS = [
    {
        id: '1',
        employeeId: 'EMP001',
        type: 'id',
        name: 'الهوية الوطنية',
        number: '1020304050',
        expiryDate: '2025-12-31',
        status: 'valid',
        fileUrl: '/docs/id_ahmed.pdf'
    },
    {
        id: '2',
        employeeId: 'EMP001',
        type: 'passport',
        name: 'جواز السفر',
        number: 'YEM123456',
        expiryDate: '2024-08-01',
        status: 'expiring_soon',
        fileUrl: '/docs/passport_ahmed.pdf'
    },
    {
        id: '3',
        employeeId: 'EMP002',
        type: 'contract',
        name: 'عقد العمل',
        number: 'CNT-2023',
        expiryDate: '2026-01-01',
        status: 'valid',
        fileUrl: '/docs/contract_sara.pdf'
    },
    {
        id: '4',
        employeeId: 'EMP002',
        type: 'iqama',
        name: 'الإقامة',
        number: 'IQ-7894',
        expiryDate: '2023-10-01',
        status: 'expired',
        fileUrl: '/docs/iqama_sara.pdf'
    },
];

const EmployeeDocumentsPage = ({ isSelfView = false }) => {
    const { employeeId: routeEmployeeId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const actualEmployeeId = isSelfView ? 'CURRENT_EMPLOYEE_ID' : routeEmployeeId;
    const employeeNameFromState = location.state?.employeeName;

    const [documentsByType, setDocumentsByType] = useState({});
    const [activeTab, setActiveTab] = useState('id');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [employeeName, setEmployeeName] = useState('');

    const filterDocumentsForEmployee = (employeeId) => {
        return ALL_DOCUMENTS.filter(doc => doc.employeeId === employeeId);
    };

    const groupDocumentsByType = (docs) => {
        return docs.reduce((acc, doc) => {
            if (!acc[doc.type]) acc[doc.type] = [];
            acc[doc.type].push(doc);
            return acc;
        }, {});
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const employeeDocs = filterDocumentsForEmployee(actualEmployeeId);
            const grouped = groupDocumentsByType(employeeDocs);
            setDocumentsByType(grouped);
            setEmployeeName(employeeDocs[0]?.employeeName || '');
            setLoading(false);
        }, 600);
    }, [actualEmployeeId]);

    const handleTabChange = (type) => setActiveTab(type);
    const handleClose = () => setShowModal(false);

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4 px-4">

                {/* ✅ عنوان ملون بالهوية */}
                <h4 className="fw-bold mb-4" style={{ color: theme.colors.primary }}>
                    📁 مستندات الموظف {employeeNameFromState ? `(${employeeNameFromState})` : `(${actualEmployeeId})`}
                </h4>

                <DocumentTabs
                    active={activeTab}
                    onChange={handleTabChange}
                    documentsByType={documentsByType}
                />

                <Row className="g-3 mb-4">
                    {loading ? (
                        <div className="text-center text-muted py-3">
                            <Spinner animation="border" size="sm" className="me-2" />
                            جاري تحميل المستندات...
                        </div>
                    ) : (
                        (documentsByType[activeTab] || []).map((doc) => (
                            <Col md={6} lg={4} key={doc.id}>
                                <DocumentCard document={doc} />
                            </Col>
                        ))
                    )}
                </Row>

                {/* 🔙 زر العودة للكل */}
                {!isSelfView && location.state?.fromAllDocumentsPage && (
                    <div className="text-start mb-3">
                        <Button
                            variant="outline"
                            onClick={() => navigate(-1)}
                            style={{
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary
                            }}
                        >
                            ← العودة إلى جميع المستندات
                        </Button>
                    </div>
                )}

                {/* ➕ زر إضافة مستند */}
                <div className="text-end mt-4">
                    <Button
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff'
                        }}
                        onClick={() =>
                            navigate(`/dashboard/employee/${actualEmployeeId}/documents/create`, {
                                state: { employeeName: employeeNameFromState }
                            })
                        }
                    >
                        + إضافة مستند جديد
                    </Button>
                </div>

                {/* <AddDocumentModal show={showModal} handleClose={handleClose} employeeId={actualEmployeeId} /> */}
            </Container>
        </MainLayout>
    );
};

export default EmployeeDocumentsPage;
