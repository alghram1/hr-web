// src/theme.js

const theme = {
    // 🎨 ألوان المشروع
    colors: {
        // ✅ الألوان الأساسية (هوية OroomUnit)
        primary: '#02365B',              // كحلي
        primaryHover: '#012B49',         // كحلي أغمق للتفاعل
        primaryLight: '#e3eaf3',         // كحلي ناعم جداً للخلفيات

        // ✅ اللون التمييزي (تركوازي)
        accent: '#00BAC6',               // تركوازي
        accentHover: '#00a3ae',          // تركوازي أغمق
        accentLight: '#e6f7f8',          // تركوازي ناعم

        // ✅ رمادي / خلفيات
        grayBg: '#f1f3f5',
        grayBorder: '#dee2e6',
        grayDark: '#adb5bd',

        // ✅ نصوص
        textDark: '#212529',
        textLight: '#ffffff',

        // ✅ ألوان تنبيهية
        success: '#198754',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#0dcaf0',

        // ✅ خلفيات ناعمة تنبيهية
        soft: {
            success: '#e6f4ec',
            warning: '#fff3cd',
            danger: '#f8d7da',
            info: '#cff4fc',
        },
    },

    // 📐 قياسات وتصميم
    style: {
        sidebarWidth: '80px',
        subSidebarWidth: '220px',
        topbarHeight: '60px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
        boxShadowLg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
};

export default theme;
