import React, { useState, useMemo, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Dropdown,
    InputGroup,
} from 'react-bootstrap';
import { BiFilter, BiDownload, BiPlus } from 'react-icons/bi';
import MainLayout from '../../Layout/MainLayout';
import CircularProgressEmployee from './CircularProgressEmployee';
import { useNavigate, Link } from 'react-router-dom';
import SmartTable from '../../Components/SmartTable';
import theme from '../../theme';
import AddEmployeeModal from './AddEmployeeModal';
import { getEmployees } from '../../services/EmployeeService';

const EmployeesPage = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('الكل');
    const [showAddModal, setShowAddModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // 🚀 تحميل الموظفين من API
    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getEmployees(search, statusFilter);
                setEmployees(data);
            } catch (err) {
                console.error('❌ Axios Error:', err);
                setError('حدث خطأ أثناء تحميل بيانات الموظفين');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, [search, statusFilter]);

    // 📊 أعمدة الجدول
    const columns = [
        {
            key: 'fullName',
            label: 'الاسم',
            render: (value, row) => (
                <div className="d-flex align-items-center gap-2 fw-bold">
                    <img
                        src={`https://i.pravatar.cc/40?img=${row.index}`}
                        alt={value}
                        className="profile-img"
                    />
                    <Link to={`/dashboard/employees/${row.id}`} className="employee-link">
                        {value}
                    </Link>
                </div>
            ),
        },
        { key: 'id', label: 'معرف الموظف' },
        { key: 'hireDate', label: 'توظف في' },
        {
            key: 'position',
            label: 'العنوان الوظيفي',
            render: (value) => value || '—',
        },
        { key: 'department', label: 'القسم' },
        {
            key: 'profileCompletion',
            label: 'ملء الملف الشخصي',
            render: (value) => (
                <div className="d-flex justify-content-center">
                    <CircularProgressEmployee
                        percentage={value || 0}
                        size={38}
                        stroke={3.5}
                        color={theme.colors.accent}
                    />
                </div>
            ),
        },
    ];

    // 🎯 تنسيق البيانات المصفاة
    const filteredData = useMemo(() => {
        return employees.map((emp, idx) => ({
            ...emp,
            index: idx + 1,
        }));
    }, [employees]);

    return (
        <MainLayout>
            <Container fluid className="employees-page p-4" dir="rtl">
                {/* رأس الصفحة */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h3 className="fw-bold mb-1">الموظفين</h3>
                        <p className="text-muted">عرض جميع أعضاء فريقك وإدارة بياناتهم</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline"
                            className="fw-semibold"
                            style={{
                                color: theme.colors.accent,
                                borderColor: theme.colors.accent,
                            }}
                        >
                            تنزيل <BiDownload className="me-2" />
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    borderColor: theme.colors.accent,
                                    color: '#fff',
                                }}
                            >
                                <BiPlus className="me-2" />
                                إضافة موظف
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setShowAddModal(true)}>إضافة فردي</Dropdown.Item>
                                <Dropdown.Item>استيراد من ملف</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* البحث والفلاتر */}
                <Row className="align-items-center mb-5">
                    <Col md={8}>
                        <InputGroup>
                            <Form.Control
                                placeholder="البحث عن طريق اسم الموظف"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary">
                                    <BiFilter className="me-1" />
                                    الفلاتر
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setStatusFilter('الكل')}>الكل</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStatusFilter('نشط')}>نشط</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setStatusFilter('متوقف')}>متوقف</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Col>
                    <Col md={4} className="text-end">
                        <span
                            className="badge text-white px-3 py-2 rounded-pill"
                            style={{
                                backgroundColor: theme.colors.accent,
                            }}
                        >
                            الحالة: {statusFilter}
                        </span>
                    </Col>
                </Row>

                {/* جدول الموظفين */}
                {isLoading ? (
                    <div className="text-center">جاري التحميل...</div>
                ) : error ? (
                    <div className="text-danger text-center">{error}</div>
                ) : (
                    <SmartTable columns={columns} data={filteredData} showActions={false} />
                )}
            </Container>

            {/* نافذة إضافة موظف */}
            <AddEmployeeModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onSuccess={() => {
                    setSearch(''); // إعادة تحميل البيانات بعد الإضافة
                    setStatusFilter('الكل');
                }}
            />
        </MainLayout>
    );
};

export default EmployeesPage;
