// utils/getCoverageLabel.js

const labels = {
    general: 'الكشف العام',
    specialized: 'العيادات المتخصصة',
    surgery: 'العمليات الجراحية',
    maternity: 'الحمل والولادة',
    dental: 'الأسنان',
    optical: 'العيون',
    chronic: 'الأمراض المزمنة',
    emergency: 'الطوارئ',
    mental: 'الصحة النفسية'
};

const getCoverageLabel = (key) => labels[key] || key;

export default getCoverageLabel;
