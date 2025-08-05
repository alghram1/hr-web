import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import theme from '../../../../../theme'; // ← تأكد من صحة المسار

const performanceCycles = [
    { id: 1, label: 'Q4 / 2024', from: '2024-11-21', to: '2025-02-20', status: 'ماضي' },
    { id: 2, label: 'Q1 / 2025', from: '2025-02-21', to: '2025-05-20', status: 'حالي' },
    { id: 3, label: 'Q2 / 2025', from: '2025-05-21', to: '2025-08-20', status: 'مستقبلي' }
];

const PerformanceHeaderSection = ({
    selectedCycleId,
    onChangeCycle,
    selectedTab,
    onChangeTab
}) => {
    const selectedCycle = performanceCycles.find(cycle => cycle.id === selectedCycleId);

    const handleCycleChange = (id) => {
        const newId = parseInt(id);
        onChangeCycle(newId);
    };

    return (
        <div className="pt-3 px-2" dir="rtl">

            {/* ✅ تبويبات التنقل */}
            <div className="d-flex justify-content-start border-bottom mb-4">
                <Nav variant="tabs" activeKey={selectedTab} onSelect={onChangeTab}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="goals"
                            className="fw-bold"
                            style={{
                                color: selectedTab === 'goals'
                                    ? theme.colors.accent
                                    : theme.colors.textDark
                            }}
                        >
                            الأهداف والمراجعات
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="meetings"
                            className="fw-bold"
                            style={{
                                color: selectedTab === 'meetings'
                                    ? theme.colors.accent
                                    : theme.colors.textDark
                            }}
                        >
                            اللقاءات
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>


            {/* ✅ سطر الدورة والتاريخ والمعايرة */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                {/* يسار: دورة الأداء و Dropdown */}
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="small" style={{ color: theme.colors.grayDark }}>دورة الأداء:</span>
                    <span className="fw-bold" style={{ color: theme.colors.textDark }}>{selectedCycle?.label}</span>
                    <span className="small" style={{ color: theme.colors.grayDark }}>
                        {selectedCycle?.from} - {selectedCycle?.to}
                    </span>

                    <Dropdown onSelect={handleCycleChange}>
                        <Dropdown.Toggle
                            variant="light"
                            className="border small"
                            size="sm"
                            style={{
                                backgroundColor: theme.colors.grayBg,
                                borderColor: theme.colors.grayBorder,
                                color: theme.colors.textDark
                            }}
                        >
                            {selectedCycle?.status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {performanceCycles.map(cycle => (
                                <Dropdown.Item
                                    key={cycle.id}
                                    eventKey={cycle.id}
                                    active={selectedCycleId === cycle.id}
                                >
                                    {cycle.label} - {cycle.status}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* يمين: عنوان المعايرة */}
                <div className="d-flex align-items-center gap-2">
                    <BsInfoCircle size={18} style={{ color: theme.colors.grayDark }} />
                    <div className="fw-bold" style={{ color: theme.colors.textDark }}>المعايرة والإبلاغ</div>
                    <div className="small" style={{ color: theme.colors.grayDark }}>
                        {selectedCycle?.from} - {selectedCycle?.to}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceHeaderSection;
