import React from 'react';

const DataScopeTab = ({ roleId }) => {
    return (
        <div>
            <h5>🧭 صلاحيات نطاق البيانات</h5>
            <p>الدور الحالي: {roleId}</p>
        </div>
    );
};

export default DataScopeTab;
