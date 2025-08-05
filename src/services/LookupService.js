export const getBranches = async (tenantId, companyId) => {
    return [
        { id: 'branch_1', name: 'الفرع الرئيسي' },
        { id: 'branch_2', name: 'فرع جدة' },
    ];
};

export const getRoles = async (tenantId) => {
    return [
        { id: 'role_admin', roleName: 'مدير' },
        { id: 'role_user', roleName: 'موظف' },
    ];
};
