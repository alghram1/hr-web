import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme'; // ← المسار حسب مشروعك

const employees = [
    { name: 'أحمد', img: 'https://i.pravatar.cc/100?img=1' },
    { name: 'سارة', img: 'https://i.pravatar.cc/100?img=2' },
    { name: 'علي', img: 'https://i.pravatar.cc/100?img=3' },
    { name: 'فاطمة', img: 'https://i.pravatar.cc/100?img=4' },
    { name: 'ياسر', img: 'https://i.pravatar.cc/100?img=5' },
    { name: 'هند', img: 'https://i.pravatar.cc/100?img=6' },
    { name: 'عبدالرحمن', img: 'https://i.pravatar.cc/100?img=7' },
    { name: 'نورة', img: 'https://i.pravatar.cc/100?img=8' },
    { name: 'إبراهيم', img: 'https://i.pravatar.cc/100?img=9' },
    { name: 'جواهر', img: 'https://i.pravatar.cc/100?img=10' },
];

const primary = theme.colors.primary;
const accent = theme.colors.accent;
const softCards = [
    theme.colors.accentLight,
    theme.colors.soft.success,
    theme.colors.soft.info,
    theme.colors.soft.warning,
    theme.colors.grayBg,
    '#f8f9fa'
];

const EmployeesPreview = () => {
    const navigate = useNavigate();

    return (
        <div className="p-2">
            {/* 🔷 عنوان الدليل */}
            <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                <h6 className="fw-bold mb-0 d-flex align-items-center" style={{ color: primary }}>
                    <span className="me-2" style={{
                        width: 10,
                        height: 10,
                        backgroundColor: accent,
                        borderRadius: '2px'
                    }}></span>
                    دليل الموظفين
                </h6>
                <button
                    className="btn btn-link btn-sm text-decoration-none"
                    onClick={() => navigate('/dashboard/employees/')}
                    style={{ color: accent, fontWeight: 500 }}
                >
                    عرض الجميع
                </button>
            </div>

            {/* 🟦 شبكة الموظفين */}
            <div
                className="mx-auto"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '1rem',
                    padding: '0 0.25rem',
                }}
            >
                {employees.slice(0, 6).map((emp, idx) => (
                    <div
                        key={idx}
                        className="text-center rounded shadow-sm p-2"
                        style={{
                            backgroundColor: softCards[idx % softCards.length],
                            border: '1px solid #DEE2E6',
                            transition: '0.3s',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                margin: '0 auto 8px',
                                border: '2px solid #fff',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <img
                                src={emp.img}
                                alt={emp.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ color: primary, fontWeight: 600, fontSize: '0.85rem' }}>{emp.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeesPreview;
