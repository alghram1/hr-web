// PermissionsTab.jsx
import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import '../../../Styles/EmployeeProfilePage.scss'; // للتناسق

// Tabs Components
import PageAccessTab from './PermissionTab/PageAccessTab';
import MenuAccessTab from './PermissionTab/MenuAccessTab';
import ActionRightsTab from './PermissionTab/ActionRightsTab';
import WorkflowRightsTab from './PermissionTab/WorkflowRightsTab';
import SettingsPermissionsTab from './PermissionTab/SettingsPermissionsTab';
import FieldLevelAccessTab from './PermissionTab/FieldLevelAccessTab';
import DataScopeTab from './PermissionTab/DataScopeTab';
import SystemModulesTab from './PermissionTab/SystemModulesTab';

const PermissionsTab = ({ roleId }) => {
    const [activeSubTab, setActiveSubTab] = useState('page');

    const SUB_TABS = [
        { key: 'page', label: '📄 الصفحات', component: PageAccessTab },
        { key: 'menu', label: '📋 القوائم', component: MenuAccessTab },
        { key: 'action', label: '⚙️ العمليات', component: ActionRightsTab },
        { key: 'workflow', label: '🔄 سير العمل', component: WorkflowRightsTab },
        { key: 'settings', label: '🛠️ الإعدادات', component: SettingsPermissionsTab },
        { key: 'fields', label: '🧩 الحقول', component: FieldLevelAccessTab },
        { key: 'scope', label: '🌍 نطاق البيانات', component: DataScopeTab },
        { key: 'modules', label: '🧱 الوحدات', component: SystemModulesTab },
    ];

    return (
        <div className="container-fluid py-3">
            <h5 className="mb-3">🔐 إدارة صلاحيات الدور المحدد</h5>

            <Tab.Container activeKey={activeSubTab}>
                <Row>
                    <Col>
                        <Nav variant="tabs" className="mb-3 flex-nowrap overflow-auto border-bottom">
                            {SUB_TABS.map((tab) => (
                                <Nav.Item key={tab.key}>
                                    <Nav.Link
                                        eventKey={tab.key}
                                        onClick={() => setActiveSubTab(tab.key)}
                                        className={`custom-tab ${activeSubTab === tab.key ? 'active' : ''}`}
                                    >
                                        {tab.label}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>

                <Tab.Content className="px-3">
                    {SUB_TABS.map(({ key, component: Component }) => (
                        <Tab.Pane eventKey={key} key={key}>
                            <Component roleId={roleId} />
                        </Tab.Pane>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default PermissionsTab;
