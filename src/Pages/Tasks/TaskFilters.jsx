import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { BsArrowRepeat, BsSearch } from 'react-icons/bs';
import theme from '../../theme'; // ✅ استيراد الثيم

const TaskFilters = ({
    filters,
    onChange,
    onReset,
    onSearchChange,
    searchQuery,
}) => {
    const { status, assignee } = filters;

    return (
        <Form className="mb-4">
            <Row className="gy-3 gx-2 align-items-end" dir="rtl">

                {/* 🔍 البحث باسم المهمة أو رقمها */}
                <Col md={8}>
                    <Form.Label className="small text-muted">بحث باسم المهمة أو رقم المعرف</Form.Label>
                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="text"
                            placeholder="أدخل اسم المهمة أو رقم المعرف..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="flex-grow-1"
                        />
                        <Button
                            style={{
                                borderColor: theme.accent,
                                color: theme.accent,
                            }}
                            className="px-3 d-flex align-items-center"
                            variant="outline"
                            title="بحث"
                        >
                            <BsSearch />
                        </Button>
                    </div>
                </Col>

                {/* ✅ فلترة الحالة */}
                <Col md={4}>
                    <Form.Label className="small text-muted">الحالة</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => onChange({ ...filters, status: e.target.value })}
                        style={{ borderColor: theme.primary }}
                    >
                        <option value="">الكل</option>
                        <option value="متأخرة">متأخرة</option>
                        <option value="مستحقة اليوم">مستحقة اليوم</option>
                        <option value="خلال ٧ أيام">خلال ٧ أيام</option>
                    </Form.Select>
                </Col>

                {/* ✅ زر إعادة التصفية (لو فعلته مستقبلاً) */}
                {/* 
                <Col md={12}>
                    <div className="d-flex justify-content-end">
                        <Button
                            style={{
                                borderColor: theme.primary,
                                color: theme.primary
                            }}
                            variant="outline"
                            className="d-flex align-items-center gap-1"
                            onClick={onReset}
                        >
                            <BsArrowRepeat />
                            إعادة التصفية
                        </Button>
                    </div>
                </Col>
                */}
            </Row>
        </Form>
    );
};

export default TaskFilters;
