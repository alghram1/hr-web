import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSession } from '../../contexts/SessionContext';
import { createEmployee, checkUsernameExists } from '../../services/EmployeeService';
import { getBranches, getRoles } from '../../services/LookupService';
import theme from '../../theme'; // ← تأكد من المسار
import '../../Styles/variables.scss';
import axios from '../../services/axiosInstance'; // تأكد من المسار الصحيح لـ axios


const AddEmployeeModal = ({ show, onHide, onSuccess }) => {
    const { session } = useSession() || {};
    const tenantId = session?.tenantId || 'tenant_DEV';
    const companyId = session?.companyId || 'company_DEV';
    const userId = session?.userId || 'user_DEV';
    const [emailExists, setEmailExists] = useState(false);

    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userNameExists, setUserNameExists] = useState(false);

    useEffect(() => {
        if (show) {
            loadDropdowns();
        }
    }, [show]);

    const loadDropdowns = async () => {
        try {
            const [branchList, roleList] = await Promise.all([
                getBranches(tenantId, companyId),
                getRoles(tenantId),
            ]);
            setBranches(branchList);
            setRoles(roleList);
        } catch (err) {
            console.error('❌ خطأ في تحميل الفروع أو الأدوار:', err);
        }
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('الاسم الأول مطلوب'),
        middleName: Yup.string().required('الاسم الأوسط مطلوب'),
        lastName: Yup.string().required('الاسم الأخير مطلوب'),
        nationalId: Yup.string().required('رقم الهوية مطلوب'),
        gender: Yup.string().required('الجنس مطلوب'),
        dateOfBirth: Yup.date().required('تاريخ الميلاد مطلوب'),
        maritalStatus: Yup.string().required('الحالة الاجتماعية مطلوبة'),
        nationality: Yup.string().required('الجنسية مطلوبة'),
        phoneNumber: Yup.string().required('رقم الجوال مطلوب'),
        email: Yup.string()
            .email('صيغة البريد غير صحيحة')
            .when('sendInvite', (sendInvite, schema) => {
                return sendInvite
                    ? schema.required('❌ البريد الإلكتروني مطلوب عند تفعيل خيار الدعوة')
                    : schema.notRequired();
            }),
        position: Yup.string().required('المسمى الوظيفي مطلوب'),
        department: Yup.string().required('القسم مطلوب'),
        branchId: Yup.string().required('الفرع مطلوب'),
        hireDate: Yup.date().required('تاريخ التوظيف مطلوب'),
        contractType: Yup.string().required('نوع العقد مطلوب'),
        employmentType: Yup.string().required('نوع التوظيف مطلوب'),
        userName: Yup.string().required('اسم المستخدم مطلوب'),
        roleId: Yup.string().required('الدور مطلوب'),
        isActive: Yup.boolean(),
    });

    const initialValues = {
        sendInvite: true, // ✅ مهم جدًا
        firstName: '',
        middleName: '',
        lastName: '',
        nationalId: '',
        gender: '',
        dateOfBirth: '',
        maritalStatus: '',
        nationality: '',
        phoneNumber: '',
        email: '',
        position: '',
        department: '',
        branchId: '',
        hireDate: '',
        contractType: '',
        employmentType: '',
        userName: '',
        roleId: '',
        isActive: true,
        sendInvite: true,
    };
    const convertMaritalStatus = (status) => {
        switch (status) {
            case 'أعزب': return 0;
            case 'متزوج': return 1;
            case 'مطلق': return 2;
            case 'أرمل': return 3;
            default: return 0;
        }
    };


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        try {
            // 🧠 تحويل القيم النصية إلى أرقام (Enums)
            const employmentTypeMap = {
                'دوام كامل': 0,
                'دوام جزئي': 1,
                'عن بعد': 2,
            };

            const contractTypeMap = {
                'دائم': 0,
                'مؤقت': 1,
                'تدريب': 2,
            };

            const maritalStatusMap = {
                'أعزب': 0,
                'متزوج': 1,
                'مطلق': 2,
                'أرمل': 3,
            };

            if (values.sendInvite && emailExists) {
                alert("❌ لا يمكن استخدام بريد مستخدم مسبقًا. الرجاء إدخال بريد آخر.");
                setSubmitting(false);
                return;
            }

            if (userNameExists) {
                alert("❌ اسم المستخدم مستخدم مسبقًا. الرجاء اختيار اسم آخر.");
                setSubmitting(false);
                return;
            }


            const payload = {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                emailAddress: values.email,
                nationalId: values.nationalId,
                nationality: {
                    name: values.nationality,
                    language: 'ar',
                },
                birthDate: values.dateOfBirth,
                gender: values.gender === 'ذكر' ? 0 : 1,
                maritalStatus: maritalStatusMap[values.maritalStatus] ?? 0,
                address: values.address || '---', // مؤقتًا
                position: values.position,
                department: values.department,
                hireDate: values.hireDate,
                contractType: contractTypeMap[values.contractType] ?? 0,
                employmentType: employmentTypeMap[values.employmentType] ?? 0,
                jobDetails: {
                    jobTitle: values.position,
                    contractType: contractTypeMap[values.contractType] ?? 0,
                    contractDuration: 24,
                    basicSalary: 7000,
                    housingAllowance: 2000,
                    transportationAllowance: 1000,
                    foodAllowance: 800,
                    whenStartWork: values.hireDate,
                },
                iban: 'SA4420000001234567891234',
                bankAccount: '1234567890',
                branchId: 1,
                facilityId: 1, // مؤقتًا حتى تضيفه من الجلسة
                roleId: 1,
                userName: values.userName,
                sendInvite: values.sendInvite,
                companyId: companyId,    // ✅ مأخوذ من session
                createdBy: userId,       // ✅ مأخوذ من session
            };

            // 🧪 تتبع
            console.log('📦 سيتم إرسال البيانات إلى السيرفر:', payload);

            // 📤 إرسال الطلب
            const result = await createEmployee(payload);

            console.log('✅ تم إنشاء الموظف بنجاح:', result);
            alert('🎉 تم إنشاء الموظف بنجاح');

            resetForm();
            onSuccess?.();
            onHide();
        } catch (error) {
            console.error('❌ فشل في إرسال الطلب:', error?.response?.data || error.message);
            alert('⚠️ حدث خطأ أثناء حفظ الموظف. راجع الكونسول أو تحقق من صحة البيانات.');
        } finally {
            setSubmitting(false);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`/api/employees/check-email?email=${encodeURIComponent(email)}`);
            return response.data.exists;
        } catch (err) {
            console.error('❌ خطأ أثناء التحقق من البريد:', err);
            return false;
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: theme.colors.dark, color: theme.colors.white }}>
                <Modal.Title>إضافة موظف جديد</Modal.Title>
            </Modal.Header>


            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body style={{ padding: 0 }}>
                            <Tabs
                                defaultActiveKey="personal"
                                id="add-employee-tabs"
                                className="px-3 pt-3"
                                justify
                                variant="tabs"
                                style={{ borderBottom: `2px solid ${theme.colors.accent}` }}
                                tabClassName="custom-tab"
                            >
                                <Tab eventKey="personal" title="🧍‍♂️ البيانات الشخصية">
                                    <div style={{ maxHeight: '58vh', overflowY: 'auto', padding: '1rem' }}>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الاسم الأول</Form.Label>
                                                    <Form.Control name="firstName" value={values.firstName} onChange={handleChange} isInvalid={touched.firstName && !!errors.firstName} />
                                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الاسم الأوسط</Form.Label>
                                                    <Form.Control name="middleName" value={values.middleName} onChange={handleChange} isInvalid={touched.middleName && !!errors.middleName} />
                                                    <Form.Control.Feedback type="invalid">{errors.middleName}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الاسم الأخير</Form.Label>
                                                    <Form.Control name="lastName" value={values.lastName} onChange={handleChange} isInvalid={touched.lastName && !!errors.lastName} />
                                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>رقم الهوية / الإقامة</Form.Label>
                                                    <Form.Control name="nationalId" value={values.nationalId} onChange={handleChange} isInvalid={touched.nationalId && !!errors.nationalId} />
                                                    <Form.Control.Feedback type="invalid">{errors.nationalId}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>البريد الإلكتروني</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={async (e) => {
                                                            handleChange(e);
                                                            const email = e.target.value;
                                                            if (email && values.sendInvite) {
                                                                const exists = await checkEmailExists(email);
                                                                setEmailExists(exists);
                                                            } else {
                                                                setEmailExists(false);
                                                            }
                                                        }}
                                                        isInvalid={touched.email && (!!errors.email || emailExists)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email || (emailExists && '⚠️ هذا البريد مستخدم مسبقًا.')}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Col>

                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الجنس</Form.Label>
                                                    <Form.Select name="gender" value={values.gender} onChange={handleChange} isInvalid={touched.gender && !!errors.gender}>
                                                        <option value="">اختر</option>
                                                        <option value="ذكر">ذكر</option>
                                                        <option value="أنثى">أنثى</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>تاريخ الميلاد</Form.Label>
                                                    <Form.Control type="date" name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange} isInvalid={touched.dateOfBirth && !!errors.dateOfBirth} />
                                                    <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الحالة الاجتماعية</Form.Label>
                                                    <Form.Select name="maritalStatus" value={values.maritalStatus} onChange={handleChange} isInvalid={touched.maritalStatus && !!errors.maritalStatus}>
                                                        <option value="">اختر</option>
                                                        <option value="أعزب">أعزب</option>
                                                        <option value="متزوج">متزوج</option>
                                                        <option value="مطلق">مطلق</option>
                                                        <option value="أرمل">أرمل</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.maritalStatus}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الجنسية</Form.Label>
                                                    <Form.Control name="nationality" value={values.nationality} onChange={handleChange} isInvalid={touched.nationality && !!errors.nationality} />
                                                    <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>رقم الجوال</Form.Label>
                                                    <Form.Control name="phoneNumber" value={values.phoneNumber} onChange={handleChange} isInvalid={touched.phoneNumber && !!errors.phoneNumber} />
                                                    <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>


                                <Tab eventKey="job" title="💼 البيانات الوظيفية">
                                    <div style={{ maxHeight: '58vh', overflowY: 'auto', padding: '1rem' }}>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>المسمى الوظيفي</Form.Label>
                                                    <Form.Control name="position" value={values.position} onChange={handleChange} isInvalid={touched.position && !!errors.position} />
                                                    <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>القسم</Form.Label>
                                                    <Form.Control name="department" value={values.department} onChange={handleChange} isInvalid={touched.department && !!errors.department} />
                                                    <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الفرع</Form.Label>
                                                    <Form.Select name="branchId" value={values.branchId} onChange={handleChange} isInvalid={touched.branchId && !!errors.branchId}>
                                                        <option value="">اختر</option>
                                                        {branches.map((b) => (
                                                            <option key={b.id} value={b.id}>{b.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.branchId}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>تاريخ التوظيف</Form.Label>
                                                    <Form.Control type="date" name="hireDate" value={values.hireDate} onChange={handleChange} isInvalid={touched.hireDate && !!errors.hireDate} />
                                                    <Form.Control.Feedback type="invalid">{errors.hireDate}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>نوع التوظيف</Form.Label>
                                                    <Form.Select name="employmentType" value={values.employmentType} onChange={handleChange} isInvalid={touched.employmentType && !!errors.employmentType}>
                                                        <option value="">اختر</option>
                                                        <option value="دوام كامل">دوام كامل</option>
                                                        <option value="دوام جزئي">دوام جزئي</option>
                                                        <option value="عن بعد">عن بعد</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.employmentType}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>نوع العقد</Form.Label>
                                                    <Form.Select name="contractType" value={values.contractType} onChange={handleChange} isInvalid={touched.contractType && !!errors.contractType}>
                                                        <option value="">اختر</option>
                                                        <option value="دائم">دائم</option>
                                                        <option value="مؤقت">مؤقت</option>
                                                        <option value="تدريب">تدريب</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.contractType}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>


                                <Tab eventKey="system" title="🔐 بيانات النظام">
                                    <div style={{ maxHeight: '58vh', overflowY: 'auto', padding: '1rem' }}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>اسم المستخدم</Form.Label>
                                                    <Form.Control
                                                        name="userName"
                                                        value={values.userName}
                                                        onChange={async (e) => {
                                                            handleChange(e);
                                                            const input = e.target.value;
                                                            if (input?.length > 2) {
                                                                const exists = await checkUsernameExists(input);
                                                                setUserNameExists(exists);
                                                            } else {
                                                                setUserNameExists(false);
                                                            }
                                                        }}
                                                        isInvalid={touched.userName && (!!errors.userName || userNameExists)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.userName || (userNameExists && '⚠️ اسم المستخدم مستخدم مسبقًا، اختر اسمًا آخر.')}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>الدور (Role)</Form.Label>
                                                    <Form.Select name="roleId" value={values.roleId} onChange={handleChange} isInvalid={touched.roleId && !!errors.roleId}>
                                                        <option value="">اختر</option>
                                                        {roles.map((r) => (
                                                            <option key={r.id} value={r.id}>{r.roleName}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">{errors.roleId}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                           

                                            <Col md={3}>
                                                <Form.Check type="switch" name="isActive" checked={values.isActive} onChange={handleChange} label="الحساب نشط" />
                                            </Col>
                                            <Col md={3}>
                                                <Form.Check type="switch" name="sendInvite" checked={values.sendInvite} onChange={handleChange} label="إرسال دعوة بالبريد" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>


                            </Tabs>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>إلغاء</Button>
                            <Button
                                type="submit"
                                variant="light"
                                style={{ backgroundColor: theme.colors.accent, color: '#fff' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Spinner animation="border" size="sm" /> : 'حفظ الموظف'}
                            </Button>

                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddEmployeeModal;
