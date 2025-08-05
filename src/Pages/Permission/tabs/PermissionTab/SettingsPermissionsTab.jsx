import React from 'react';

const SettingsPermissionsTab = ({ roleId }) => {
    return (
        <div>
            <h5>⚙️ صلاحيات الإعدادات</h5>
            <p>الدور الحالي: {roleId}</p>
        </div>
    );
};

export default SettingsPermissionsTab;
