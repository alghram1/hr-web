// api/performanceAPI.js

export const getCurrentPerformanceCycle = async () => {
    return {
        id: 1,
        label: "Q2 / 2025",
        from: "2025-04-01",
        to: "2025-06-30",
        status: "نشطة"
    };
};

// ⚙️ تعتمد على تمرير معرف الموظف + معرف الدورة + فلاتر اختيارية: الفرع + القسم
export const getEmployeePerformanceData = async (
    employeeId,
    cycleId,
    branch = null,
    department = null
) => {
    // ✅ يمكن هنا لاحقًا استخدام الفلاتر لإرسالها إلى API فعلي
    console.log("🔍 بيانات الاستعلام:", {
        employeeId,
        cycleId,
        branch,
        department
    });

    // 🎯 محاكاة نتيجة ثابتة (يُفترض أن تُعدل لاحقًا لجلب حقيقي)
    return {
        goals: { score: 85 },
        tasks: { score: 70 },
        attendance: { score: 90 },
        quality: { score: 75 }
    };
};


export const getEmployeeAttendanceSummary = async (
    employeeId,
    cycleId,
    branch = null,
    department = null
) => {
    console.log("📊 استعلام تقييم الحضور:", {
        employeeId,
        cycleId,
        branch,
        department
    });

    // بيانات محاكاة
    return {
        workingDays: 22,
        present: 20,
        late: 3,
        absent: 2,
        branch: branch || 'غير محدد',
        department: department || 'غير محدد'
    };
};






