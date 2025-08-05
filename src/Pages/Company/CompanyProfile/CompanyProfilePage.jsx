import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Button, Modal, Form } from 'react-bootstrap';
import { BiWorld, BiEdit } from 'react-icons/bi';
import MainLayout from '../../../Layout/MainLayout';
import '../../../Styles/CompanyProfilePage.scss';
import OverviewTab from './Tabs/OverviewTab';
import BranchesTab from './Tabs/BranchesTab';
import AdminTab from './Tabs/AdminTab';
import theme from '../../../theme'; // ✅ استيراد ألوان الهوية

const CompanyProfilePage = () => {
    const [activeTab, setActiveTab] = useState('نظرة عامة');
    const [showModal, setShowModal] = useState(false);

    const companyStatic = {
        name: 'اوورووم يونت',
        logo: 'https://via.placeholder.com/100x100.png?text=Logo',
        subdomain: 'oroomunit.saasplatform.com',
        plan: 'الباقة المتقدمة',
        status: 'نشطة',
        joinedDate: '2024-10-01',
        tabs: ['نظرة عامة', 'الفروع', 'المسؤول الإداري', 'الاشتراك', 'الإعدادات', 'المستندات', 'سجل النشاط']
    };

    const [formData, setFormData] = useState({
        email: 'info@oroomunit.com',
        phone: '+966500000000',
        address: 'الرياض، المملكة العربية السعودية',
        website: 'https://oroomunit.com',
        logo: companyStatic.logo
    });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, logo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const payload = new FormData();
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('address', formData.address);
        payload.append('website', formData.website);
        payload.append('logo', formData.logo);

        console.log('🚀 إرسال البيانات إلى API:', payload);
        setShowModal(false);
    };

    return (
        <MainLayout>
            <Container fluid className="p-3 p-md-4" dir="rtl">
                <section
                    className="company-profile-card p-4 mb-4 shadow rounded-4 border-0"
                    style={{ backgroundColor: theme.colors.white }}
                >
                    <Row className="align-items-center g-4 flex-column flex-md-row justify-content-between">
                        {/* الشعار */}
                        <Col xs="auto" className="text-center">
                            <div
                                className="position-relative"
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    backgroundColor: theme.colors.grayBg,
                                    border: `3px solid ${theme.colors.grayBorder}`,
                                    boxShadow: '0 0 10px rgba(0,0,0,0.05)'
                                }}
                            >
                                <img
                                    src={formData.logo}
                                    alt="شعار الشركة"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </Col>

                        {/* بيانات الشركة */}
                        <Col md className="text-md-end text-center">
                            <h4 className="fw-bold mb-1">{companyStatic.name}</h4>
                            <div className="text-muted mb-2 small">
                                <BiWorld />
                                <a
                                    href={`https://${companyStatic.subdomain}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none ms-1"
                                >
                                    {companyStatic.subdomain}
                                </a>
                            </div>
                            <Row className="g-2 text-secondary small mb-2">
                                <Col xs={12} md={6}>📧 البريد: <strong className="text-dark">{formData.email}</strong></Col>
                                <Col xs={12} md={6}>📱 الهاتف: <strong className="text-dark">{formData.phone}</strong></Col>
                                <Col xs={12} md={6}>📍 العنوان: <strong className="text-dark">{formData.address}</strong></Col>
                                <Col xs={12} md={6}>🌐 الموقع: <a href={formData.website} className="text-dark text-decoration-none">{formData.website}</a></Col>
                            </Row>
                        </Col>

                        {/* الاشتراك + زر التعديل */}
                        <Col xs="auto" className="text-center text-md-start">
                            <div className="text-secondary small mb-3">
                                <div>📦 الباقة: <strong className="text-dark">{companyStatic.plan}</strong></div>
                                <div>🔵 الحالة: <strong className="text-dark">{companyStatic.status}</strong></div>
                                <div>🗓️ الاشتراك: <strong className="text-dark">{companyStatic.joinedDate}</strong></div>
                            </div>
                            <Button
                                variant="outline-success"
                                className="px-4 rounded-pill fw-bold"
                                style={{
                                    borderColor: theme.colors.primary,
                                    color: theme.colors.primary
                                }}
                                onClick={() => setShowModal(true)}
                            >
                                <BiEdit className="ms-2" />
                                تعديل بيانات التواصل
                            </Button>
                        </Col>
                    </Row>
                </section>

                {/* مودال التعديل */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>تعديل بيانات الشركة</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>تحديث الشعار</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleLogoChange} />
                                <div className="mt-2 text-center">
                                    <img
                                        src={formData.logo}
                                        alt="معاينة الشعار"
                                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', border: `1px solid ${theme.colors.grayBorder}` }}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>البريد الإلكتروني</Form.Label>
                                <Form.Control type="email" value={formData.email} onChange={handleChange('email')} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>رقم الهاتف</Form.Label>
                                <Form.Control type="text" value={formData.phone} onChange={handleChange('phone')} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>العنوان</Form.Label>
                                <Form.Control type="text" value={formData.address} onChange={handleChange('address')} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>الموقع الإلكتروني</Form.Label>
                                <Form.Control type="url" value={formData.website} onChange={handleChange('website')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>إلغاء</Button>
                        <Button variant="success" onClick={handleSave}>حفظ</Button>
                    </Modal.Footer>
                </Modal>

                {/* التبويبات */}
                <Tab.Container activeKey={activeTab}>
                    <Row>
                        <Col>
                            <Nav variant="tabs" className="mb-3 flex-nowrap overflow-auto border-bottom">
                                {companyStatic.tabs.map((tab, idx) => (
                                    <Nav.Item key={idx}>
                                        <Nav.Link
                                            eventKey={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`custom-tab ${activeTab === tab ? 'active' : ''}`}
                                            style={{
                                                color: activeTab === tab ? '#fff' : theme.colors.primary,
                                                backgroundColor: activeTab === tab ? theme.colors.primary : 'transparent',
                                                borderRadius: '20px',
                                                marginInlineEnd: '0.5rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {tab}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>
                    <Tab.Content className="px-2 px-md-4">
                        <Tab.Pane eventKey="نظرة عامة">
                            <OverviewTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="الفروع">
                            <BranchesTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="المسؤول الإداري">
                            <AdminTab />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </MainLayout>
    );
};

export default CompanyProfilePage;
