import React, { useState } from 'react';
import {
    Row, Col, Card, Button, Badge,
    Dropdown, Form, InputGroup, Toast, ToastContainer, Modal
} from 'react-bootstrap';
import {
    BiPlus, BiMap, BiUser, BiGroup,
    BiDotsVertical, BiSearchAlt2, BiCheckShield, BiInfoCircle
} from 'react-icons/bi';
import theme from '../../../../theme'; // ✅ الهوية البصرية الموحدة

const initialBranches = [
    {
        id: 1,
        name: 'فرع الرياض',
        location: 'الرياض - طريق الملك فهد',
        manager: 'سالم الزهراني',
        employees: 25,
        status: 'نشط',
        integrations: ['نظام قوى', 'تأمينات'],
    },
    {
        id: 2,
        name: 'فرع جدة',
        location: 'جدة - حي الأندلس',
        manager: 'نورة الشهري',
        employees: 18,
        status: 'متوقف',
        integrations: ['مقيم'],
    },
];

const BranchesTab = () => {
    const [branches, setBranches] = useState(initialBranches);
    const [searchTerm, setSearchTerm] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShowDetails = (branch) => {
        setSelectedBranch(branch);
        setShowModal(true);
    };

    const handleEditBranch = (branch) => {
        setEditingBranch({ ...branch });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        setBranches(prev =>
            prev.map(b => b.id === editingBranch.id ? editingBranch : b)
        );
        setShowEditModal(false);
        setToastMessage('✅ تم تحديث بيانات الفرع بنجاح');
        setShowToast(true);
    };

    const getStatusStyle = (status) => ({
        backgroundColor: status === 'نشط' ? theme.colors.accent : `${theme.colors.accent}40`,
        color: '#fff',
        fontWeight: '500'
    });

    return (
        <div className="p-2 p-md-3" dir="rtl">
            {/* ✅ شريط الأدوات */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h4 className="fw-bold mb-0">🏢 إدارة الفروع ({branches.length})</h4>
                <InputGroup style={{ maxWidth: 300 }}>
                    <InputGroup.Text><BiSearchAlt2 /></InputGroup.Text>
                    <Form.Control
                        placeholder="بحث عن فرع..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                <Button
                    className="rounded-pill fw-bold"
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent,
                        color: '#fff'
                    }}
                >
                    <BiPlus className="ms-2" /> إضافة فرع جديد
                </Button>
            </div>

            {/* ✅ بطاقات الفروع */}
            <Row className="gy-4">
                {filteredBranches.map(branch => (
                    <Col key={branch.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="shadow-sm border-0 rounded-4 h-100">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5 className="fw-bold mb-1">{branch.name}</h5>
                                        <Badge style={getStatusStyle(branch.status)}>
                                            {branch.status}
                                        </Badge>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" size="sm" className="border-0">
                                            <BiDotsVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleShowDetails(branch)}>عرض التفاصيل</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleEditBranch(branch)}>تعديل الفرع</Dropdown.Item>
                                            <Dropdown.Item
                                                className="text-danger"
                                                onClick={() => {
                                                    setToastMessage('⚠️ تم إيقاف الفرع مؤقتًا');
                                                    setShowToast(true);
                                                }}
                                            >
                                                إيقاف الفرع
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                <div className="text-muted small mb-2"><BiMap className="ms-2" /> {branch.location}</div>
                                <div className="text-muted small mb-2"><BiUser className="ms-2" /> مدير: {branch.manager}</div>
                                <div className="text-muted small mb-3"><BiGroup className="ms-2" /> الموظفين: {branch.employees}</div>

                                <div className="border-top pt-2">
                                    <div className="fw-bold small mb-1">الأنظمة:</div>
                                    {branch.integrations.length > 0 ? (
                                        branch.integrations.map((intg, i) => (
                                            <Badge
                                                key={i}
                                                className="me-2 mb-1"
                                                style={{
                                                    backgroundColor: theme.colors.accent,
                                                    color: '#fff',
                                                    fontWeight: 500
                                                }}
                                            >
                                                <BiCheckShield className="ms-1" />
                                                {intg}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted small">لا يوجد تكامل حتى الآن</span>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ✅ Toast الإشعارات */}
            <ToastContainer position="bottom-start" className="p-3">
                <Toast bg="light" onClose={() => setShowToast(false)} show={showToast} delay={2500} autohide>
                    <Toast.Header closeButton>
                        <strong className="me-auto">تنبيه</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* ✅ Modal عرض التفاصيل */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title><BiInfoCircle className="ms-2" />تفاصيل الفرع</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBranch && (
                        <div>
                            <p><strong>الاسم:</strong> {selectedBranch.name}</p>
                            <p><strong>الموقع:</strong> {selectedBranch.location}</p>
                            <p><strong>المدير:</strong> {selectedBranch.manager}</p>
                            <p><strong>عدد الموظفين:</strong> {selectedBranch.employees}</p>
                            <p><strong>الحالة:</strong> {selectedBranch.status}</p>
                            <p><strong>الأنظمة:</strong> {selectedBranch.integrations.join(', ') || 'لا يوجد'}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* ✅ Modal تعديل الفرع */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>✏️ تعديل بيانات الفرع</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingBranch && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>اسم الفرع</Form.Label>
                                <Form.Control
                                    value={editingBranch.name}
                                    onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>الموقع</Form.Label>
                                <Form.Control
                                    value={editingBranch.location}
                                    onChange={(e) => setEditingBranch({ ...editingBranch, location: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>المدير</Form.Label>
                                <Form.Control
                                    value={editingBranch.manager}
                                    onChange={(e) => setEditingBranch({ ...editingBranch, manager: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>عدد الموظفين</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editingBranch.employees}
                                    onChange={(e) =>
                                        setEditingBranch({ ...editingBranch, employees: parseInt(e.target.value) || 0 })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>الحالة</Form.Label>
                                <Form.Select
                                    value={editingBranch.status}
                                    onChange={(e) => setEditingBranch({ ...editingBranch, status: e.target.value })}
                                >
                                    <option value="نشط">نشط</option>
                                    <option value="متوقف">متوقف</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>إلغاء</Button>
                    <Button
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent
                        }}
                        onClick={handleSaveEdit}
                    >
                        💾 حفظ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BranchesTab;
