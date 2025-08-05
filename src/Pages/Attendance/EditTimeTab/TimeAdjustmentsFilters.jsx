import React, { useCallback } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaFilter, FaSyncAlt } from 'react-icons/fa';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const TimeAdjustmentsFilters = ({ filters, onChange, onReset }) => {
    const handleFieldChange = useCallback((field, value) => {
        onChange({ ...filters, [field]: value });
    }, [filters, onChange]);

    return (
        <Row className="align-items-end" dir="rtl">
            {/* 🔍 البحث */}
            <Col md={4} className="mb-2">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="بحث بالاسم أو المعرف"
                        value={filters.search || ''}
                        onChange={(e) => handleFieldChange('search', e.target.value)}
                    />
                    <InputGroup.Text style={{ backgroundColor: theme.colors.accent, color: '#fff' }}>
                        <FaFilter />
                    </InputGroup.Text>
                </InputGroup>
            </Col>

            {/* 📆 من تاريخ */}
            <Col xs="auto" className="mb-2">
                <InputGroup>
                    <Form.Control
                        type="date"
                        value={filters.fromDate || ''}
                        onChange={(e) => handleFieldChange('fromDate', e.target.value)}
                    />
                    <InputGroup.Text style={{ backgroundColor: theme.colors.primaryLight }}>
                        من
                    </InputGroup.Text>
                </InputGroup>
            </Col>

            {/* 📆 إلى تاريخ */}
            <Col xs="auto" className="mb-2">
                <InputGroup>
                    <Form.Control
                        type="date"
                        value={filters.toDate || ''}
                        onChange={(e) => handleFieldChange('toDate', e.target.value)}
                    />
                    <InputGroup.Text style={{ backgroundColor: theme.colors.primaryLight }}>
                        إلى
                    </InputGroup.Text>
                </InputGroup>
            </Col>

            {/* 🔄 زر إعادة تعيين الفلاتر */}
            <Col xs="auto" className="mb-2">
                <Button
                    variant="outline-secondary"
                    style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
                    className="d-flex align-items-center gap-2"
                    onClick={onReset}
                >
                    <FaSyncAlt />
                    إعادة تعيين
                </Button>
            </Col>
        </Row>
    );
};

export default TimeAdjustmentsFilters;
