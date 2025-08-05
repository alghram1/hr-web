import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Nav,
    Tab,
    Button,
    Spinner,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BiEnvelope, BiPhone, BiEdit, BiCamera } from 'react-icons/bi';
import MainLayout from '../../../Layout/MainLayout';
import { getEmployeeById } from '../../../services/EmployeeService'; // ✅ استخدمنا دالة مركزية
import '../../../Styles/EmployeeProfilePage.scss';

// التبويبات
import AboutTab from './Tabs/About/AboutTab';
import WorkTab from './Tabs/Work/WorkTab';
import DocumentTab from './Tabs/Documents/DocumentTab';
import DependentsTab from './Tabs/Dependents/DependentsTab';
import LeaveTab from './Tabs/Leave/LeaveTab';
import HealthInsuranceTab from './Tabs/Insurance/HealthInsuranceTab';
import FlightTicketsTab from './Tabs/FlightTickets/FlightTicketsTab';
import PerformanceTab from './Tabs/Performance/PerformanceTab';

const EmployeeProfilePage = () => {
    const { id } = useParams();
    const brandPrimary = '#02365B';
    const brandAccent = '#00BAC6';

    const [activeTab, setActiveTab] = useState('عني');
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ تحميل بيانات الموظف
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data);
            } catch (err) {
                setError('حدث خطأ أثناء تحميل بيانات الموظف');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (isLoading) {
        return (
            <MainLayout>
                <Container className="text-center p-5">
                    <Spinner animation="border" variant="primary" />
                    <div className="mt-3">جاري تحميل بيانات الموظف...</div>
                </Container>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <Container className="text-center p-5 text-danger">
                    {error}
                </Container>
            </MainLayout>
        );
    }

    if (!employee) {
        return (
            <MainLayout>
                <Container className="text-center p-5 text-muted">
                    لم يتم العثور على بيانات الموظف
                </Container>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Container fluid className="p-4" dir="rtl">
                {/* ✅ رأس الصفحة */}
                <Row className="align-items-center pb-4 mb-4 border-bottom">
                    <Col md="auto">
                        <div className="position-relative d-inline-block">
                            <img
                                src={employee.profileImageUrl || `https://i.pravatar.cc/120?u=${employee.id}`}
                                alt={employee.fullName}
                                className="rounded-circle shadow"
                                style={{ width: 110, height: 110, objectFit: 'cover' }}
                            />
                            <Button
                                variant="light"
                                size="sm"
                                className="edit-avatar-btn"
                                style={{
                                    border: `2px solid ${brandAccent}`,
                                    color: brandAccent
                                }}
                            >
                                <BiCamera />
                            </Button>
                        </div>
                    </Col>
                    <Col md>
                        <h4 className="fw-bold text-dark">{employee.fullName}</h4>
                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <a href={`tel:${employee.phoneNumber}`} className="text-decoration-none text-dark d-flex align-items-center">
                                <BiPhone className="me-1" /> {employee.phoneNumber}
                            </a>
                            <a href={`mailto:${employee.emailAddress}`} className="text-decoration-none text-dark d-flex align-items-center">
                                <BiEnvelope className="me-1" /> {employee.emailAddress}
                            </a>
                        </div>
                    </Col>
                    <Col md="auto" className="text-center">
                        <Button
                            variant="outline"
                            className="fw-bold"
                            style={{
                                borderColor: brandAccent,
                                color: brandAccent
                            }}
                        >
                            <BiEdit className="me-1" />
                            تعديل
                        </Button>
                    </Col>
                </Row>

                {/* ✅ التبويبات */}
                <Tab.Container activeKey={activeTab}>
                    <Row>
                        <Col>
                            <Nav variant="tabs" className="mb-4 flex-nowrap overflow-auto border-bottom">
                                {[
                                    'عني', 'العمل', 'مستندات', 'الاجازات',
                                    'التابعين', 'التأمين الصحي', 'تذاكر الطيران', 'الأداء'
                                ].map((tab, idx) => (
                                    <Nav.Item key={idx}>
                                        <Nav.Link
                                            eventKey={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`custom-tab ${activeTab === tab ? 'active' : ''}`}
                                        >
                                            {tab}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>

                    <Tab.Content className="px-3">
                        <Tab.Pane eventKey="عني"><AboutTab employee={employee} /></Tab.Pane>
                        <Tab.Pane eventKey="العمل"><WorkTab employee={employee} /></Tab.Pane>
                        <Tab.Pane eventKey="مستندات"><DocumentTab employeeId={employee.id} /></Tab.Pane>
                        <Tab.Pane eventKey="الاجازات"><LeaveTab employeeId={employee.id} /></Tab.Pane>
                        <Tab.Pane eventKey="التابعين"><DependentsTab employeeId={employee.id} /></Tab.Pane>
                        <Tab.Pane eventKey="التأمين الصحي"><HealthInsuranceTab employeeId={employee.id} /></Tab.Pane>
                        <Tab.Pane eventKey="تذاكر الطيران"><FlightTicketsTab employeeId={employee.id} /></Tab.Pane>
                        <Tab.Pane eventKey="الأداء"><PerformanceTab employeeId={employee.id} /></Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </MainLayout>
    );
};

export default EmployeeProfilePage;
