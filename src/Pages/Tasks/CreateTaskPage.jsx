import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap';
import Select from 'react-select';
import MainLayout from '../../Layout/MainLayout';
import { BsArrowRightCircle, BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

// 🔹 قائمة أهداف الموظفين (Mock، لاحقًا من API)
const employeeGoals = {
    'Abdullah Zaher': ['goal-001', 'goal-002'],
    'Accountant Test': ['goal-001'],
    'Ahmad Alabweh': ['goal-002', 'goal-003'],
    'Ahmad Amer abweh': ['goal-001', 'goal-003'],
    'Ahmed Kamel': ['goal-003'],
    'Ahraz Demo': ['goal-001', 'goal-003'],
    'Alanoud Alobaidallah': [],
    'Ali Hallaq': ['goal-002'],
};

// 🔹 قائمة الموظفين
const employeeOptions = [
    { value: 'Abdullah Zaher', label: 'Abdullah Zaher' },
    { value: 'Accountant Test', label: 'Accountant Test' },
    { value: 'Ahmad Alabweh', label: 'Ahmad Alabweh' },
    { value: 'Ahmad Amer abweh', label: 'Ahmad Amer abweh' },
    { value: 'Ahmed Kamel', label: 'Ahmed Kamel' },
    { value: 'Ahraz Demo', label: 'Ahraz Demo' },
    { value: 'Alanoud Alobaidallah', label: 'Alanoud Alobaidallah' },
    { value: 'Ali Hallaq', label: 'Ali Hallaq' },
];

// 🔹 قائمة الأهداف
const goalsOptions = [
    { value: 'goal-001', label: 'تحسين جودة الخدمة' },
    { value: 'goal-002', label: 'زيادة المبيعات بنسبة 20%' },
    { value: 'goal-003', label: 'تطوير مهارات القيادة' },
];

// 🔹 الدورة النشطة
const activeCycle = {
    id: 5,
    label: 'Q1 / 2025',
    from: '2025-01-01',
    to: '2025-03-31'
};

const CreateTaskPage = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        assignee: '',
        dueType: 'تاريخ مخصص',
        dueDate: '',
        viewers: [],
        observers: [],
        attachments: [],
        cycleId: activeCycle.id,
        linkedGoal: '',
        taskWeightWithinGoal: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
    };

    const handleSelectGoal = (selected) => {
        setForm(prev => ({ ...prev, linkedGoal: selected?.value || '' }));
    };

    const handleSubmit = () => {
        if (form.linkedGoal) {
            const invalidEmployees = form.viewers.filter(employeeName => {
                const goals = employeeGoals[employeeName] || [];
                return !goals.includes(form.linkedGoal);
            });

            if (invalidEmployees.length > 0) {
                alert(`❌ لا يمكن تعيين المهمة! الموظفين التاليين لا يمتلكون الهدف المختار:\n\n- ${invalidEmployees.join('\n- ')}`);
                return;
            }
        }

        console.log("✅ بيانات المهمة الجاهزة للإرسال:", form);
        // هنا تنفيذ API call لاحقًا
    };

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4 px-4">
                <Row className="justify-content-center mt-5">
                    <Col md={10} lg={8} xl={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>

                                {/* 🔵 رأس الصفحة */}
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                                    <div>
                                        <h5 className="fw-bold mb-1" style={{ color: theme.colors.accent }}>
                                            <BsPlusCircle className="ms-2" style={{ color: theme.colors.accent }} size={20} />
                                            إنشاء مهمة جديدة
                                        </h5>
                                        <div className="text-muted small">
                                            قم بتعبئة الحقول أدناه لإضافة مهمة جديدة
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        style={{
                                            borderColor: theme.colors.accent,
                                            color: theme.colors.accent
                                        }}
                                        size="sm"
                                        onClick={() => navigate(-1)}
                                    >
                                        <BsArrowRightCircle className="ms-3" />
                                        العودة
                                    </Button>
                                </div>

                                <Form>

                                    {/* 📝 اسم المهمة */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>اسم المهمة</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={handleInputChange}
                                            placeholder="اكتب اسم المهمة هنا"
                                            required
                                        />
                                    </Form.Group>

                                    {/* 📝 الوصف */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>الوصف</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="description"
                                            value={form.description}
                                            onChange={handleInputChange}
                                            placeholder="قدم تفاصيل حول المهمة"
                                        />
                                    </Form.Group>

                                    {/* 🧑‍💼 المعين */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>المعين</Form.Label>
                                        <Form.Select
                                            name="assignee"
                                            value={form.assignee}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">اختر موظفًا</option>
                                            {employeeOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {/* 📅 نوع التاريخ */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>تاريخ الاستحقاق</Form.Label>
                                        <Form.Select
                                            name="dueType"
                                            value={form.dueType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="تاريخ مخصص">تاريخ مخصص</option>
                                            <option value="المغادرة">تاريخ المغادرة</option>
                                            <option value="التوظيف">تاريخ التوظيف</option>
                                            <option value="التجربة">تاريخ التجربة</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {/* 📅 التاريخ المخصص */}
                                    {form.dueType === 'تاريخ مخصص' && (
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="date"
                                                name="dueDate"
                                                value={form.dueDate}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    )}

                                    {/* 🎯 الهدف المرتبط */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>الهدف المرتبط بالمهمة</Form.Label>
                                        <Select
                                            name="linkedGoal"
                                            options={goalsOptions}
                                            classNamePrefix="select"
                                            placeholder="اختر هدف مرتبط"
                                            value={goalsOptions.find(opt => opt.value === form.linkedGoal) || null}
                                            onChange={handleSelectGoal}
                                            isClearable
                                        />
                                    </Form.Group>

                                    {/* 🏋️ وزن المهمة ضمن الهدف */}
                                    {form.linkedGoal && (
                                        <Form.Group className="mb-3">
                                            <Form.Label>وزن المهمة ضمن الهدف (%)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="taskWeightWithinGoal"
                                                value={form.taskWeightWithinGoal}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="100"
                                                placeholder="مثلاً: 20%"
                                            />
                                        </Form.Group>
                                    )}

                                    {/* 📤 لمن */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>لمن</Form.Label>
                                        <Select
                                            isMulti
                                            name="viewers"
                                            options={employeeOptions}
                                            classNamePrefix="select"
                                            placeholder="اختر مستلمين"
                                            onChange={(selected) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    viewers: selected.map(opt => opt.value),
                                                }))
                                            }
                                        />
                                    </Form.Group>

                                    {/* 👀 المراقبين */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>المراقبين</Form.Label>
                                        <Select
                                            isMulti
                                            name="observers"
                                            options={employeeOptions}
                                            classNamePrefix="select"
                                            placeholder="اختر مراقبين"
                                            onChange={(selected) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    observers: selected.map(opt => opt.value),
                                                }))
                                            }
                                        />
                                    </Form.Group>

                                    {/* 📎 المرفقات */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>المرفقات</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <Form.Text className="text-muted">
                                            يمكنك رفع عدة ملفات أو سحبها إلى هذا الحقل
                                        </Form.Text>
                                    </Form.Group>

                                    {/* ✅ زر التأكيد */}
                                    <div className="text-start">
                                        <Button
                                            className="px-4 py-2"
                                            style={{
                                                backgroundColor: theme.colors.accent,
                                                borderColor: theme.colors.accent,
                                                color: '#fff',
                                            }}
                                            onClick={handleSubmit}
                                        >
                                            تأكيد
                                        </Button>
                                    </div>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
};

export default CreateTaskPage;
