import React from 'react';

const FieldLevelAccessTab = ({ roleId }) => {
    return (
        <div>
            <h5>🔍 صلاحيات الحقول</h5>
            <p>الدور الحالي: {roleId}</p>
        </div>
    );
};

export default FieldLevelAccessTab;
