import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { DOCUMENT_TYPES } from '../../../constants/documentTypes';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const SearchEmployeeDocuments = ({
    searchQuery,
    onSearchChange,
    documentTypeFilter,
    onTypeFilterChange,
    showTypeFilter = false
}) => {
    return (
        <Row className="align-items-center mb-3" dir="rtl">
            <Col md={6}>
                <Form.Control
                    type="text"
                    placeholder="🔍 ابحث باسم الموظف أو الرقم الوظيفي..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        borderColor: theme.colors.accent,
                        boxShadow: 'none'
                    }}
                />
            </Col>

            {showTypeFilter && (
                <Col md={4}>
                    <Form.Select
                        value={documentTypeFilter}
                        onChange={(e) => onTypeFilterChange(e.target.value)}
                        style={{
                            borderColor: theme.colors.accent,
                            boxShadow: 'none'
                        }}
                    >
                        <option value="">كل أنواع المستندات</option>
                        {DOCUMENT_TYPES.map((type) => (
                            <option key={type.key} value={type.key}>
                                {type.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            )}
        </Row>
    );
};

export default SearchEmployeeDocuments;
