// Pages/Employee/EmployeeProfile/Tabs/DependentsTab.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Table, Row, Col, Spinner } from 'react-bootstrap';
import { BsPencil, BsTrash, BsCloudUpload } from 'react-icons/bs';
import axios from 'axios';
import theme from '../../../../../theme'; // تأكد من صحة المسار بناءً على مشروعك

const DependentsTab = () => {
    const [dependents, setDependents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMockDependents = async () => {
            const mockData = [
                {
                    name: 'Hanan Yehya',
                    relationship: 'Parent',
                    dob: '20 يوليو 1977',
                    gender: 'Female',
                    nationality: 'اليمن',
                    email: 'Hanan@example.com',
                    location: 'صنعاء',
                    documents: [
                        { type: 'إقامة', status: 'مرفوع' },
                        { type: 'تأشيرة الإقامة', status: 'غير مرفوع' },
                        { type: 'تأشيرة خروج / عودة', status: 'مرفوع' },
                        { type: 'تأشيرة خروج نهائي', status: 'غير مرفوع' },
                        { type: 'جواز السفر', status: 'مرفوع' },
                        { type: 'صورة جواز السفر', status: 'غير مرفوع' },
                    ]
                },
                {
                    name: 'Omar Abdulrahman',
                    relationship: 'Son',
                    dob: '10 مارس 2010',
                    gender: 'Male',
                    nationality: 'السعودية',
                    email: '',
                    location: '',
                    documents: [
                        { type: 'إقامة', status: 'غير مرفوع' },
                        { type: 'جواز السفر', status: 'غير مرفوع' },
                    ]
                }
            ];

            setDependents(mockData);
            setLoading(false);
        };

        fetchMockDependents();
    }, []);

    return (
        <Card className="shadow-sm border-0" dir="rtl">
            <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                    backgroundColor: theme.colors.grayBg,
                    borderBottom: `2px solid ${theme.colors.accent}`
                }}
            >
                <h5 className="mb-0 fw-bold" style={{ color: theme.colors.accent }}>التابعين</h5>
                <Button
                    size="sm"
                    className="fw-bold text-white"
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent
                    }}
                >
                    أضف تابع جديد
                </Button>
            </Card.Header>

            <Card.Body className="p-4">
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" style={{ color: theme.colors.accent }} />
                        <div className="mt-2 text-muted">جاري تحميل بيانات التابعين...</div>
                    </div>
                ) : dependents.length === 0 ? (
                    <div className="text-center text-muted py-4">لا توجد بيانات للتابعين</div>
                ) : (
                    dependents.map((dep, idx) => (
                        <Card key={idx} className="mb-4 border rounded shadow-sm bg-white p-3">
                            <Row className="align-items-center">
                                <Col md={9}>
                                    <h6 className="fw-bold text-dark">
                                        {dep.name} <small className="text-muted">({dep.relationship})</small>
                                    </h6>
                                    <div className="mb-2 text-muted small">
                                        <span className="me-3">🎂 {dep.dob}</span>
                                        <span className="me-3">👤 {dep.gender}</span>
                                        <span className="me-3">🏳️ {dep.nationality}</span>
                                    </div>
                                    <div className="text-muted small">
                                        📧 {dep.email || '-'} &nbsp; | &nbsp; 📍 {dep.location || '-'}
                                    </div>
                                </Col>
                                <Col md={3} className="text-end d-flex justify-content-end gap-2 flex-wrap">
                                    <Button size="sm" variant="outline-secondary"><BsPencil /> تعديل</Button>
                                    <Button size="sm" variant="outline-danger"><BsTrash /> حذف</Button>
                                </Col>
                            </Row>

                            <hr />

                            <h6 className="fw-bold mt-3 mb-2"> مستندات</h6>
                            <Table responsive hover className="align-middle">
                                <thead style={{
                                    backgroundColor: theme.colors.grayBg,
                                    borderBottom: `2px solid ${theme.colors.accent}`
                                }}>
                                    <tr className="text-dark small text-center">
                                        <th style={{ width: '35%', padding: '12px 16px', textAlign: 'right' }}>📄 نوع المستند</th>
                                        <th style={{ width: '25%', padding: '12px 8px' }}>📌 الحالة</th>
                                        <th style={{ width: '40%', padding: '12px 8px' }}>⬆️ إجراء</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dep.documents?.map((doc, i) => (
                                        <tr key={i} style={{
                                            transition: 'background 0.3s ease',
                                            verticalAlign: 'middle',
                                            textAlign: 'center'
                                        }}>
                                            <td className="text-end pe-4" style={{ padding: '14px 16px' }}>
                                                <span className="fw-semibold text-dark">{doc.type}</span>
                                            </td>

                                            <td style={{ padding: '14px 8px' }}>
                                                {doc.status === 'مرفوع' ? (
                                                    <span className="badge px-3 py-1" style={{
                                                        backgroundColor: theme.colors.accent,
                                                        opacity: 0.75,
                                                        color: '#fff'
                                                    }}>
                                                        ✅ مرفوع
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-secondary bg-opacity-50 px-3 py-1">📥 غير مرفوع</span>
                                                )}
                                            </td>

                                            <td style={{ padding: '14px 8px' }}>
                                                <Button
                                                    variant="outline-accent"
                                                    size="sm"
                                                    className="d-flex align-items-center justify-content-center mx-auto gap-2"
                                                    style={{ minWidth: 110 }}
                                                    onClick={() => {
                                                        console.log(`⬆️ رفع مستند ${doc.type} للتابع ${dep.name}`);
                                                    }}
                                                >
                                                    <BsCloudUpload /> رفع الآن
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    ))
                )}
            </Card.Body>
        </Card>
    );
};

export default DependentsTab;
