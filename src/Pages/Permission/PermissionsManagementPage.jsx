// PermissionsManagementPage.jsx

import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import MainLayout from '../../Layout/MainLayout';
import '../../Styles/EmployeeProfilePage.scss';
// Tabs Components
import RolesTab from './tabs/RolesTab';
import PermissionsTab from './tabs/PermissionsTab';
import UsersTab from './tabs/UsersTab';
import MenusTab from './tabs/MenusTab';

const PermissionsManagementPage = () => {
    const [activeTab, setActiveTab] = useState('roles');
    const [selectedRoleId, setSelectedRoleId] = useState(null);

    const TABS = [
        { key: 'roles', label: '🧑‍💼 الأدوار' },
        { key: 'permissions', label: '🔐 الصلاحيات' },
        { key: 'users', label: '👥 المستخدمون' },
        { key: 'menus', label: '📋 القوائم' },
    ];

    return (
        <MainLayout>
            <div className="container-fluid py-4">
                <h2 className="mb-4">🛡️ إدارة الصلاحيات</h2>

                <Tab.Container activeKey={activeTab}>
                    <Row>
                        <Col>
                            <Nav variant="tabs" className="mb-3 flex-nowrap overflow-auto border-bottom">
                                {TABS.map((tab) => (
                                    <Nav.Item key={tab.key}>
                                        <Nav.Link
                                            eventKey={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`custom-tab ${activeTab === tab.key ? 'active' : ''}`}
                                        >
                                            {tab.label}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>

                    <Tab.Content className="px-3">
                        <Tab.Pane eventKey="roles">
                            <RolesTab onSelectRole={(id) => {
                                setSelectedRoleId(id);
                                setActiveTab('permissions');
                            }} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="permissions">
                            <PermissionsTab roleId={selectedRoleId} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="users">
                            <UsersTab />
                        </Tab.Pane>

                        <Tab.Pane eventKey="menus">
                            <MenusTab />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </MainLayout>
    );
};

export default PermissionsManagementPage;
