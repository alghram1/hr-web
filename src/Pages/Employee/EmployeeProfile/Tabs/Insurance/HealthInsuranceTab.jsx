// Pages/Employee/EmployeeProfile/Tabs/HealthInsuranceTab.jsx

import React from 'react';
import InsuranceSummaryCard from '../../Cards/InsuranceSummaryCard';
import CoverageTable from '../Insurance/CoverageTable';
import FamilyCoveredList from '../Insurance/FamilyCoveredList';
import InsuranceAttachments from '../Insurance/InsuranceAttachments';
import { Card } from 'react-bootstrap';
import theme from '../../../../../theme'; // ← تأكد من المسار حسب مشروعك

const insuranceData = {
    company: 'بوبا العربية',
    policyNumber: 'BUP-123456',
    planType: 'ذهبية عائلية',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'نشطة',
    attachmentUrl: '/files/policy.pdf',
    coverage: {
        general: { included: true, limit: 'غير محدود' },
        specialized: { included: true, limit: 'حتى 5,000 ريال' },
        surgery: { included: true, limit: 'حتى 10,000 ريال' },
        maternity: { included: false },
        dental: { included: true, limit: 'حتى 2,000 ريال' },
        optical: { included: false },
        chronic: { included: true, note: 'يجب تقديم تقارير طبية' }
    },
    family: [
        { name: 'هنا', relation: 'زوجة', covered: true },
        { name: 'سما', relation: 'ابنة', covered: true },
        { name: 'علاء', relation: 'ابن', covered: false }
    ],
    attachments: [
        { name: 'بطاقة التأمين', url: '/files/insurance-card.pdf' },
        { name: 'الوثيقة', url: '/files/insurance-policy.pdf' }
    ]
};

const HealthInsuranceTab = () => {
    const {
        company,
        policyNumber,
        planType,
        startDate,
        endDate,
        status,
        attachmentUrl,
        coverage,
        family,
        attachments
    } = insuranceData;

    return (
        <div className="pt-3" dir="rtl">

            {/* 1. ملخص التأمين */}
            <InsuranceSummaryCard
                insurance={{ company, policyNumber, planType, startDate, endDate, status, attachmentUrl }}
            />

            {/* 2. جدول التغطيات */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header
                    style={{
                        backgroundColor: theme.colors.grayBg,
                        color: theme.colors.accent,
                        fontWeight: 'bold'
                    }}
                >
                    تفاصيل التغطيات التأمينية
                </Card.Header>
                <Card.Body>
                    <CoverageTable coverage={coverage} />
                </Card.Body>
            </Card>

            {/* 3. التابعين المشمولين */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header
                    style={{
                        backgroundColor: theme.colors.grayBg,
                        color: theme.colors.accent,
                        fontWeight: 'bold'
                    }}
                >
                    التابعون المشمولون بالتأمين
                </Card.Header>
                <Card.Body>
                    <FamilyCoveredList family={family} />
                </Card.Body>
            </Card>

            {/* 4. المرفقات */}
            <Card className="border-0 shadow-sm">
                <Card.Header
                    style={{
                        backgroundColor: theme.colors.grayBg,
                        color: theme.colors.accent,
                        fontWeight: 'bold'
                    }}
                >
                    الملفات المرفقة
                </Card.Header>
                <Card.Body>
                    <InsuranceAttachments attachments={attachments} />
                </Card.Body>
            </Card>

        </div>
    );
};

export default HealthInsuranceTab;
