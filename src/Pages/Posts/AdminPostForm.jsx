import React from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { BiWorld, BiBuilding } from 'react-icons/bi';

const visibilityOptions = [
    { label: 'عام - الجميع', value: 'public', icon: <BiWorld /> },
    { label: 'قسم الموارد البشرية', value: 'hr', icon: <BiBuilding /> },
];

const AdminPostForm = ({
    content = '',
    setContent,
    visibility = visibilityOptions[0],
    setVisibility,
    onSubmit,
}) => {
    const handleKeyPress = (e) => {
        if (e.ctrlKey && e.key === 'Enter' && content.trim()) {
            onSubmit();
        }
    };

    // 🎨 ألوان الهوية
    const primary = '#02365B';
    const accent = '#00BAC6';
    const border = '#CED4DA';
    const grayBg = '#F8F9FA';

    return (
        <div className="p-3 rounded shadow-sm border mb-4" style={{ backgroundColor: '#fff' }}>
            <h6 className="fw-bold mb-3" style={{ color: primary }}>
                 المنشورات الإدارية
            </h6>

            {/* ✅ محتوى النشر */}
            <div className="d-flex align-items-start gap-3 mb-3">
                <img
                    src="https://i.pravatar.cc/48"
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: 48, height: 48, objectFit: 'cover' }}
                />
                <Form.Control
                    as="textarea"
                    placeholder="اكتب ما يدور بعقلك..."
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={{
                        resize: 'none',
                        backgroundColor: grayBg,
                        borderRadius: '8px',
                        border: `1px solid ${border}`,
                        fontSize: '0.95rem',
                        color: primary,
                        fontWeight: 500,
                    }}
                />
            </div>

            {/* ✅ الخيارات السفلية */}
            <div className="d-flex justify-content-between align-items-center">
                <Dropdown>
                    <Dropdown.Toggle
                        size="sm"
                        variant="outline-secondary"
                        className="fw-bold d-flex align-items-center gap-2"
                        style={{
                            color: primary,
                            borderColor: border,
                            backgroundColor: '#fff',
                        }}
                    >
                        {visibility.icon}
                        {visibility.label}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {visibilityOptions.map((option) => (
                            <Dropdown.Item
                                key={option.value}
                                onClick={() => setVisibility(option)}
                                className="d-flex align-items-center gap-2"
                                style={{ color: primary }}
                            >
                                {option.icon} {option.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Button
                    size="sm"
                    className="fw-bold px-4"
                    onClick={onSubmit}
                    disabled={!content.trim()}
                    style={{
                        backgroundColor: accent,
                        borderColor: accent,
                        color: '#fff',
                    }}
                >
                    نشر
                </Button>
            </div>
        </div>
    );
};

export default AdminPostForm;
