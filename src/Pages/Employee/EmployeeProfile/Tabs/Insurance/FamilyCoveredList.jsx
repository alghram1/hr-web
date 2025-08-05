// Components/FamilyCoveredList.jsx
import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import theme from '../../../../../theme'; // تأكد من صحة المسار حسب المشروع

const FamilyCoveredList = ({ family }) => {
    return (
        <ListGroup variant="flush">
            {family.map((member, i) => (
                <ListGroup.Item
                    key={i}
                    className="d-flex justify-content-between align-items-center"
                >
                    <div>
                        👤 <strong>{member.name}</strong> ({member.relation})
                    </div>
                    <Badge
                        className="px-3 py-1"
                        style={{
                            backgroundColor: member.covered
                                ? theme.colors.accent
                                : theme.colors.grayDark,
                            color: '#fff'
                        }}
                    >
                        {member.covered ? 'مشمول' : 'غير مشمول'}
                    </Badge>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default FamilyCoveredList;
