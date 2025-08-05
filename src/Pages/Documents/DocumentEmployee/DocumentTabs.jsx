import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { DOCUMENT_TYPES } from '../../../constants/documentTypes';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const DocumentTabs = ({ active, onChange, documentsByType = {} }) => {
    return (
        <Nav
            variant="tabs"
            className="mb-4 mt-3 border-bottom flex-nowrap overflow-auto"
            dir="rtl"
            style={{ whiteSpace: 'nowrap' }}
        >
            {DOCUMENT_TYPES.map((type) => {
                const count = documentsByType[type.key]?.length || 0;
                const isActive = active === type.key;

                return (
                    <Nav.Item key={type.key}>
                        <Nav.Link
                            onClick={() => onChange(type.key)}
                            active={isActive}
                            style={{
                                fontWeight: '500',
                                color: isActive ? theme.colors.accent : '#212529',
                                borderBottom: isActive ? `3px solid ${theme.colors.accent}` : 'none',
                            }}
                        >
                            {type.label}{' '}
                            <Badge
                                pill
                                style={{
                                    backgroundColor: isActive ? theme.colors.accent : '#adb5bd',
                                    color: '#fff',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {count}
                            </Badge>
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default DocumentTabs;
