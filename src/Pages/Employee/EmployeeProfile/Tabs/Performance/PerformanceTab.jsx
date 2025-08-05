import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsGift } from 'react-icons/bs';
import PerformanceHeaderSection from '../Performance/PerformanceHeaderSection';
import GoalsTabContent from '../Performance/GoalsTabContent';
import MeetingsTab from '../Performance/MeetingsTab';
import GoalsPageHeader from '../Performance/Goals/GoalsPageHeader';
import theme from '../../../../../theme'; // ✅ استيراد الهوية الرسمية

const PerformanceTab = () => {
    const [selectedCycleId, setSelectedCycleId] = useState(1);
    const [selectedTab, setSelectedTab] = useState('goals');

    return (
        <div className="pt-4 px-3" dir="rtl">

            {/* ✅ رأس الصفحة مع Tabs والدورة */}
            <PerformanceHeaderSection
                selectedCycleId={selectedCycleId}
                onChangeCycle={setSelectedCycleId}
                selectedTab={selectedTab}
                onChangeTab={setSelectedTab}
            />

            {/* ✅ محتوى التاب */}
            {selectedTab === 'goals' && (
                <GoalsTabContent selectedCycleId={selectedCycleId} theme={theme} />
            )}
            {selectedTab === 'meetings' && (
                <MeetingsTab selectedCycleId={selectedCycleId} />
            )}

            {/* ✅ زر عائم رمزي */}
            <Button
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    left: '30px',
                    backgroundColor: theme.colors.accent,
                    border: 'none',
                    borderRadius: '50%',
                    width: '52px',
                    height: '52px',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                }}
                title="نقاط إضافية أو حوافز"
            >
                <BsGift size={24} />
            </Button>
        </div>
    );
};

export default PerformanceTab;
