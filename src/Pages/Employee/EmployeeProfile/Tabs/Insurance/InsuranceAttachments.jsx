// Components/InsuranceAttachments.jsx
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import theme from '../../../../../theme'; // ← تأكد من صحة المسار حسب مشروعك

const InsuranceAttachments = ({ attachments }) => {
    return (
        <Row className="g-3 mt-3">
            {attachments.map((file, i) => (
                <Col md={6} key={i}>
                    <Card className="shadow-sm">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <span>📄 {file.name}</span>
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm fw-semibold"
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    borderColor: theme.colors.accent,
                                    color: '#fff'
                                }}
                            >
                                عرض / تحميل
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default InsuranceAttachments;
