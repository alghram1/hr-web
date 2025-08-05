// Pages/Employee/EmployeeProfile/Tabs/DocumentTab.jsx
import React, { useState } from 'react';
import { Card, Accordion, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { BsUpload, BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import theme from '../../../../../theme'; // تأكد من المسار حسب هيكل المشروع

const documentCategories = [
    {
        title: 'الإقامة',
        items: [{
            fileName: 'iqama.jpg',
            number: '513468431',
            expiry: '30 يوليو 2025 (خلال 4 أشهر)',
            image: '/images/iqama.jpg',
            note: 'تكامل مع مقيم الآن واستمتع بتحديثات الإقامة بسلاسة'
        }]
    },
    {
        title: 'الهوية الوطنية',
        items: [{
            fileName: 'id.png',
            number: '12636489',
            expiry: 'N/A',
            image: '/images/national-id.jpg',
        }]
    },
    {
        title: 'صورة جواز السفر',
        items: [{
            fileName: '',
            number: '',
            expiry: '',
            image: '',
        }]
    }
];

const DocumentTab = () => {
    const [activeKey, setActiveKey] = useState(null);

    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    return (
        <Row className="g-4" dir="rtl">

            {/* عرض المستندات - يمين */}
            <Col md={8}>
                <Card className="shadow-sm border-0">
                    <Card.Header className="d-flex justify-content-between align-items-center" style={{
                        backgroundColor: theme.colors.grayBg,
                        borderBottom: `1px solid ${theme.colors.grayBorder}`
                    }}>
                        <h5 className="mb-0 fw-bold" style={{ color: theme.colors.accent }}>
                            <i className=" me-2"></i> المستندات الإلزامية
                        </h5>
                        <Button size="sm" variant="outline-secondary" title="عرض كل المسودات">
                           مسودات كاملة (2)
                        </Button>
                    </Card.Header>

                    <Card.Body className="p-4">
                        <Accordion activeKey={activeKey}>
                            {documentCategories.map((doc, index) => (
                                <Accordion.Item
                                    eventKey={index.toString()}
                                    key={index}
                                    className="mb-3 border rounded shadow-sm"
                                >
                                    <Accordion.Header onClick={() => handleToggle(index.toString())}>
                                        <strong className="text-dark">{doc.title}</strong> ({doc.items.length})
                                    </Accordion.Header>

                                    <Accordion.Body className="px-3 pt-0 pb-4">
                                        {doc.items.map((item, idx) => {
                                            const isExpiredSoon = item.expiry.includes("شهر");

                                            return (
                                                <div
                                                    key={idx}
                                                    className="border rounded shadow-sm p-3 bg-white mb-4"
                                                    style={{
                                                        borderLeft: isExpiredSoon
                                                            ? `4px solid ${theme.colors.warning}`
                                                            : undefined,
                                                        transition: '0.3s'
                                                    }}
                                                >
                                                    <div className="d-flex justify-content-end gap-2 mb-3 flex-wrap">
                                                        <Button size="sm" variant="primary">عرض</Button>
                                                        <Button size="sm" variant="outline-secondary"><BsEye className="me-1" /> معاينة</Button>
                                                        <Button size="sm" variant="outline-secondary"><BsPencil className="me-1" /> تعديل</Button>
                                                        <Button size="sm" variant="outline-danger"><BsTrash className="me-1" /> حذف</Button>
                                                    </div>

                                                    <Row className="align-items-center">
                                                        <Col md={2} className="text-center">
                                                            <Image
                                                                src={item.image || '/placeholder.jpg'}
                                                                thumbnail
                                                                style={{
                                                                    width: 100,
                                                                    height: 70,
                                                                    objectFit: 'cover',
                                                                    borderRadius: 6
                                                                }}
                                                            />
                                                        </Col>

                                                        <Col md={10}>
                                                            <Row>
                                                                <Col md={4}><strong>رقم الوثيقة:</strong> {item.number || 'غير متوفر'}</Col>
                                                                <Col md={4}><strong>تاريخ الانتهاء:</strong> {item.expiry || 'غير متاح'}</Col>
                                                                <Col md={4}><strong>اسم الملف:</strong> {item.fileName || 'N/A'}</Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    {item.note && (
                                                        <div className="mt-3 px-3 py-2 bg-light rounded border-start border-4"
                                                            style={{ borderColor: theme.colors.primary }}>
                                                            <small className="text-muted">{item.note}</small>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>

                        <hr className="my-4" />
                        <div className="mt-3">
                            <h6 className="fw-bold text-muted">تأمين</h6>
                            <p className="text-muted">لا توجد بطاقات تأمين صحي.</p>

                            <h6 className="fw-bold text-muted">التابعين</h6>
                            <p className="text-muted">maisa ali – 0 من المستندات</p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* رفع المستندات - يسار */}
            <Col md={4}>
                <Card className="shadow-sm border-0 text-center mt-5">
                    <Card.Header
                        className="fw-bold"
                        style={{
                            backgroundColor: theme.colors.grayBg,
                            borderBottom: `2px solid ${theme.colors.primary}`,
                            color: theme.colors.primary
                        }}
                    >
                        تحميل المستندات
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="border rounded py-4 px-3" style={{ borderColor: theme.colors.grayBorder }}>
                            <BsUpload size={32} className="mb-2 text-muted" />
                            <div className="fw-semibold mb-2">
                                قم برفع و إسقاط الملف هنا أو{' '}
                                <span
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => document.getElementById('fileUploadInput').click()}
                                >
                                    تصفح الكمبيوتر
                                </span>
                            </div>
                            <small className="text-muted">حجم الملف و التنسيق المقبول</small>

                            <Form.Control
                                type="file"
                                id="fileUploadInput"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        console.log('📁 تم اختيار الملف:', file.name);
                                        // TODO: upload to backend or cloud
                                    }
                                }}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default DocumentTab;
