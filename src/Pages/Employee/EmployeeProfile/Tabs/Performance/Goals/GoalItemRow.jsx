// Components/Performance/Goals/GoalItemRow.jsx

import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsThreeDotsVertical, BsChatDots } from 'react-icons/bs';

const GoalItemRow = ({ goal }) => {
    const {
        name,
        type,
        startDate,
        endDate,
        weight,
        createdBy
    } = goal;

    return (
        <tr>
           

            {/* اسم الهدف */}
            <td className="align-middle">
                <a href="#" className="fw-bold text-primary-brand">{name}</a>
            </td>

            {/* نوع الهدف */}
            <td className="text-muted align-middle">{type}</td>

            {/* تاريخ البداية */}
            <td className="text-muted align-middle">{startDate}</td>

            {/* تاريخ النهاية */}
            <td className="text-muted align-middle">{endDate}</td>

            {/* أنشئ بواسطة */}
            <td className="text-muted align-middle">{createdBy}</td>

            {/* الوزن */}
            <td className="fw-bold align-middle text-end text-success">
                {weight}%
            </td>
            {/* زر المحادثة */}
            <td className="text-center align-middle" style={{ width: 50 }}>
                <OverlayTrigger overlay={<Tooltip>ملاحظات أو مناقشة</Tooltip>}>
                    <Button variant="link" className="text-purple p-0">
                        <BsChatDots size={16} />
                    </Button>
                </OverlayTrigger>
            </td>
            {/* زر الخيارات */}
            <td className="text-center align-middle" style={{ width: 50 }}>
                <OverlayTrigger overlay={<Tooltip>خيارات إضافية</Tooltip>}>
                    <Button variant="link" className="text-purple p-0">
                        <BsThreeDotsVertical size={16} />
                    </Button>
                </OverlayTrigger>
            </td>

            
        </tr>
    );
};

export default GoalItemRow;
