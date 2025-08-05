import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { HiBell } from 'react-icons/hi';
import NotificationPanel from './NotificationPanel';
import theme from '../theme';
import useWebSocketNotifications from '../hooks/useWebSocketNotifications';
import { useSession } from '../contexts/SessionContext';
import ChangeStatusDropdown from './Chat/ChangeStatusDropdown';
import SearchEmployeeModal from './Chat/SearchEmployeeModal';

const Topbar = () => {
    const notifications = useWebSocketNotifications();
    const [showPanel, setShowPanel] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { session } = useSession();

    return (
        <>
            <header
                className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: theme.style.sidebarWidth,
                    left: 0,
                    height: theme.style.topbarHeight,
                    zIndex: 1030,
                    backgroundColor: '#02365B', // 🎨 الكحلي
                    boxShadow: theme.style.boxShadow,
                }}
            >
                {/* 🔰 Logo */}
                <div className="oroomunit-logo text-uppercase fw-bold">
                    <span style={{ fontWeight: 900, fontSize: "1.2rem", color: "#FFFFFF" }}>OROOM</span>
                    <span style={{ fontWeight: 500, fontSize: "1.2rem", color: "#00BAC6" }}>UNIT</span>
                </div>

                {/* 🔍 Search + AI */}
                <div className="d-flex align-items-center gap-3 flex-grow-1 justify-content-center" style={{ maxWidth: 500 }}>
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="form-control form-control-sm"
                        style={{ minWidth: 250 }}
                    />
                    <button className="btn btn-light btn-sm d-flex align-items-center gap-2 text-dark">
                        <i className="bi bi-robot" />
                        <span className="d-flex flex-column lh-1">
                            <small style={{ fontSize: '0.7rem' }}>OroomUnit</small>
                            <strong style={{ fontSize: '0.9rem' }}>AI</strong>
                        </span>
                    </button>
                </div>

                {/* 👤 User Block + Notification */}
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant="light"
                        className="rounded-circle p-2"
                        onClick={() => setShowSearchModal(true)}
                        title="محادثة جديدة"
                        style={{ border: '1px solid #ccc' }}
                    >
                        <i className="bi bi-person-plus-fill" style={{ color: '#00BAC6' }} />
                    </Button>


                    <div
                        className="position-relative d-flex align-items-center justify-content-center rounded-circle"
                        onClick={() => setShowPanel(!showPanel)}
                        style={{
                            width: 36,
                            height: 36,
                            cursor: 'pointer',
                            backgroundColor: showPanel ? '#00BAC622' : '#ffffff33',
                            transition: 'all 0.3s ease-in-out',
                        }}
                    >
                        <HiBell
                            size={20}
                            color="#ffffff"
                        />
                        {notifications.length > 0 && (
                            <Badge
                                bg="danger"
                                pill
                                style={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    fontSize: '0.6rem',
                                }}
                            >
                                {notifications.length}
                            </Badge>
                        )}
                    </div>

                    <span className="text-light fw-medium">AR</span>

                    <div className="d-flex align-items-center gap-2">
                        <img
                            src="https://via.placeholder.com/32"
                            alt="User Avatar"
                            className="rounded-circle"
                            style={{ width: 32, height: 32, objectFit: 'cover', border: '2px solid #00BAC6' }}
                        />
                        <div className="d-flex flex-column align-items-end">
                            <span className="fw-bold text-white">{session?.userName || 'مستخدم'}</span>
                            <ChangeStatusDropdown />
                        </div>
                    </div>
                </div>
            </header>


            {/* 📨 Notification Panel */}
            {showPanel && (
                <NotificationPanel
                    notifications={notifications.map(n => ({
                        id: n.id,
                        title: n.title || n.message,
                        time: "الآن",
                        read: false
                    }))}
                    onClose={() => setShowPanel(false)}
                />
            )}

            {/* 🔍 Search Employee Modal */}
            <SearchEmployeeModal
                show={showSearchModal}
                onHide={() => setShowSearchModal(false)}
            />
        </>
    );
};

export default Topbar;
