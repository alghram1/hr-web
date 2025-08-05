import React, { useCallback } from 'react';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import {
    FaDownload,
    FaFilter,
    FaCalendarAlt,
    FaColumns,
    FaMapMarkerAlt
} from 'react-icons/fa';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

// ✅ تحويل الأرقام العربية إلى إنجليزية وتنسيق التاريخ إلى yyyy-mm-dd
const normalizeDateInput = (value) => {
    if (!value) return '';
    const arabicNums = '٠١٢٣٤٥٦٧٨٩';
    const engNums = '0123456789';
    const converted = value.replace(/[٠-٩]/g, (d) => engNums[arabicNums.indexOf(d)]);
    const date = new Date(converted);
    return isNaN(date) ? '' : date.toISOString().split('T')[0];
};

const AttendanceFilters = ({ filters, onChange, activeSubTab, onDownload }) => {
    const handleFieldChange = useCallback((field, value) => {
        onChange({ ...filters, [field]: value });
    }, [filters, onChange]);

    return (
        <Row className="align-items-end" dir="rtl">
            {/* زر التنزيل */}
            <Col xs="auto" className="mb-2">
                <Button
                    className="d-flex align-items-center gap-2 fw-bold"
                    style={{
                        borderColor: theme.colors.accent,
                        color: theme.colors.accent,
                    }}
                    variant="outline"
                    onClick={onDownload}
                >
                    <FaDownload />
                    تنزيل XLS
                </Button>
            </Col>

            {/* البحث */}
            <Col md={4} className="mb-2">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="البحث عن طريق اسم الموظف أو المعرّف..."
                        value={filters.search || ''}
                        onChange={(e) => handleFieldChange('search', e.target.value)}
                    />
                    <InputGroup.Text style={{ backgroundColor: theme.colors.grayBg }}>
                        <FaFilter />
                    </InputGroup.Text>
                </InputGroup>
            </Col>

            {/* التقرير اليومي */}
            {activeSubTab === 'التقرير اليومي' && (
                <Col xs="auto" className="mb-2">
                    <InputGroup>
                        <Form.Control
                            type="date"
                            value={filters.date || ''}
                            onChange={(e) => handleFieldChange('date', normalizeDateInput(e.target.value))}
                        />
                        <InputGroup.Text style={{ backgroundColor: theme.colors.grayBg }}>
                            <FaCalendarAlt />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            )}

            {/* تقرير مخصص */}
            {activeSubTab === 'تقرير مخصص' && (
                <>
                    <Col xs="auto" className="mb-2">
                        <InputGroup>
                            <Form.Control
                                type="date"
                                value={filters.startDate || ''}
                                onChange={(e) => handleFieldChange('startDate', normalizeDateInput(e.target.value))}
                            />
                            <InputGroup.Text style={{ backgroundColor: theme.colors.grayBg }}>
                                من
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col xs="auto" className="mb-2">
                        <InputGroup>
                            <Form.Control
                                type="date"
                                value={filters.endDate || ''}
                                onChange={(e) => handleFieldChange('endDate', normalizeDateInput(e.target.value))}
                            />
                            <InputGroup.Text style={{ backgroundColor: theme.colors.grayBg }}>
                                إلى
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                </>
            )}

            {/* تقرير الموقع */}
            {activeSubTab === 'تقرير الموقع' && (
                <Col xs="auto" className="mb-2">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="الموقع"
                            value={filters.location || ''}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                        />
                        <InputGroup.Text style={{ backgroundColor: theme.colors.grayBg }}>
                            <FaMapMarkerAlt />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            )}

            {/* الأعمدة */}
            <Col xs="auto" className="mb-2">
                <Button
                    variant="outline-secondary"
                    className="d-flex align-items-center gap-2 fw-bold"
                    style={{ borderColor: theme.colors.grayBorder }}
                >
                    <FaColumns />
                    الأعمدة
                </Button>
            </Col>
        </Row>
    );
};

export default AttendanceFilters;
