import React from 'react';

const SystemModulesTab = ({ roleId }) => {
    return (
        <div>
            <h5>🧩 صلاحيات وحدات النظام</h5>
            <p>الدور الحالي: {roleId}</p>
        </div>
    );
};

export default SystemModulesTab;
