import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { useChat } from '../../contexts/ChatContext';
import '../../Styles/chat.scss';
import MainLayout from '../../Layout/MainLayout';

const ChatWorkspacePage = () => {
    const { chatInfo } = useChat();

    return (
        <MainLayout>
        <div className="chat-workspace d-flex flex-row h-100">
            {/* 🟣 القائمة الجانبية */}
            <div className="sidebar-container border-end">
                <ChatSidebar />
            </div>

            {/* 🟠 نافذة المحادثة */}
            <div className="window-container flex-grow-1">
                {chatInfo ? (
                    <ChatWindow />
                ) : (
                    <div className="no-chat-selected d-flex flex-column justify-content-center align-items-center h-100 text-muted">
                        <h5>اختر محادثة لبدء الدردشة 📩</h5>
                        <p className="small">ابدأ محادثة جديدة أو اختر من القائمة الجانبية.</p>
                    </div>
                )}
            </div>
            </div>
        </MainLayout>
    );
};

export default ChatWorkspacePage;
