import React, { useState, useEffect, useRef } from 'react';
import { X, ThreeDotsVertical, Check2, Gear, Display } from 'react-bootstrap-icons';
import theme from '../theme';

const NotificationPanel = ({ notifications, onClose }) => {
    const [tab, setTab] = useState('all');
    const [showOptions, setShowOptions] = useState(false);
    const panelRef = useRef(); // ✅ مرجع للعنصر

    const filtered = tab === 'unread' ? notifications.filter(n => !n.read) : notifications;

    // ✅ إغلاق عند الضغط خارج القائمة
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current  && !panelRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);
    return (
        <div
            ref={panelRef}
            className="position-absolute start-0 shadow"
            style={{
                width: 370,
                height: `calc(100vh - ${theme.style.topbarHeight})`,
                top: theme.style.topbarHeight,
                left: 0,
                transform: 'translateX(-10px)',
                zIndex: 1040,
                background: '#fff',
                borderLeft: '3px solid #02365B', // ✅ كحلي بدل الأخضر
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                overflowY: 'auto',
                transition: 'all 0.3s ease-in-out',
            }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom position-relative">
                <h5 className="mb-0 fw-bold" style={{ color: '#02365B' }}>الإشعارات</h5>

                <div className="position-relative">
                    <button
                        className="btn btn-sm btn-light"
                        onClick={() => setShowOptions(prev => !prev)}
                        style={{ borderRadius: '50%' }}
                    >
                        <ThreeDotsVertical color="#02365B" />
                    </button>

                    {showOptions && (
                        <div
                            className="position-absolute bg-white shadow rounded"
                            style={{
                                top: '110%',
                                left: 0,
                                width: 250,
                                zIndex: 2000,
                                border: '1px solid #dee2e6',
                                padding: '8px 0'
                            }}
                        >
                            <div className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" style={{ cursor: 'pointer', color: '#02365B' }}>
                                <Check2 />
                                <span>تمييز الكل كمقروء</span>
                            </div>
                            <div className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" style={{ cursor: 'pointer', color: '#02365B' }}>
                                <Gear />
                                <span>إعدادات الإشعارات</span>
                            </div>
                            <div className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" style={{ cursor: 'pointer', color: '#02365B' }}>
                                <Display />
                                <span>فتح الإشعارات</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="d-flex px-3 pt-2 gap-2">
                <button
                    onClick={() => setTab('all')}
                    className="btn btn-sm fw-bold px-3 py-1"
                    style={{
                        backgroundColor: tab === 'all' ? '#02365B' : '#f8f9fa',
                        color: tab === 'all' ? '#fff' : '#495057',
                        border: '1px solid #dee2e6',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    الكل
                </button>
                <button
                    onClick={() => setTab('unread')}
                    className="btn btn-sm fw-bold px-3 py-1"
                    style={{
                        backgroundColor: tab === 'unread' ? '#02365B' : '#f8f9fa',
                        color: tab === 'unread' ? '#fff' : '#495057',
                        border: '1px solid #dee2e6',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    غير مقروءة
                </button>
            </div>

            {/* Notifications List */}
            <div className="p-3 pt-2">
                {filtered.length === 0 ? (
                    <div className="text-center text-muted mt-5">لا توجد إشعارات</div>
                ) : (
                    filtered.map((n) => (
                        <div key={n.id} className="d-flex align-items-start gap-3 py-2 border-bottom" style={{ cursor: 'pointer' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee' }}></div>
                            <div className="flex-grow-1">
                                <div className="fw-semibold text-dark small">{n.title}</div>
                                <div className="text-muted small">{n.time}</div>
                            </div>
                            {!n.read && (
                                <span
                                    className="rounded-circle"
                                    style={{ width: 10, height: 10, backgroundColor: '#00BAC6', marginTop: 8 }}
                                ></span>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* View All */}
            {filtered.length > 0 && (
                <div className="text-center border-top p-2">
                    <button className="btn btn-link fw-bold small" style={{ color: '#02365B' }}>عرض الكل</button>
                </div>
            )}
        </div>

    );
};

export default NotificationPanel;
