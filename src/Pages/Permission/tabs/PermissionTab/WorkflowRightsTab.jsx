import React from 'react';

const WorkflowRightsTab = ({ roleId }) => {
    return (
        <div>
            <h5>📤 صلاحيات سير العمل</h5>
            <p>الدور الحالي: {roleId}</p>
        </div>
    );
};

export default WorkflowRightsTab;
