import React from 'react';
import { Card, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { format } from 'date-fns';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const DocumentCard = ({ document, onEdit, onDelete }) => {
    const {
        id,
        title,
        type,
        expiryDate,
        fileUrl,
        employeeId
    } = document;

    const navigate = useNavigate();
    const isExpired = new Date(expiryDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    const formattedDate = format(new Date(expiryDate), 'yyyy-MM-dd');

    const getStatusBadge = () => {
        return (
            <Badge
                pill
                style={{
                    backgroundColor: isExpired ? theme.colors.danger : theme.colors.success,
                    color: '#fff',
                    fontSize: '0.75rem'
                }}
            >
                {isExpired ? 'منتهي' : 'ساري'}
            </Badge>
        );
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(document);
        } else {
            navigate(`/dashboard/employee/${employeeId}/documents/edit/${id}`);
        }
    };

    const handleDelete = () => {
        if (window.confirm(`هل تريد حذف المستند: ${title}؟`)) {
            onDelete?.(id);
        }
    };

    return (
        <Card className="shadow-sm border-0 h-100 d-flex flex-column justify-content-between">
            <Card.Body dir="rtl" className="d-flex flex-column">
                {/* عنوان المستند + الحالة */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0" style={{ color: theme.colors.primary }}>{title}</h5>
                    {getStatusBadge()}
                </div>

                {/* معلومات المستند */}
                <div className="mb-3">
                    <p className="text-muted mb-1">نوع المستند: <strong>{type}</strong></p>
                    <p className="text-muted mb-0">تاريخ الانتهاء: <strong>{formattedDate}</strong></p>
                </div>

                {/* الأزرار */}
                <div className="mt-auto pt-3 border-top d-flex justify-content-between gap-2">
                    <OverlayTrigger overlay={<Tooltip>معاينة المستند</Tooltip>}>
                        <Button
                            size="sm"
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-grow-1"
                            style={{
                                borderColor: theme.colors.accent,
                                color: theme.colors.accent
                            }}
                            variant="outline"
                        >
                            <FaEye className="me-1" /> معاينة
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip>تعديل</Tooltip>}>
                        <Button
                            size="sm"
                            onClick={handleEdit}
                            className="flex-grow-1"
                            style={{
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary
                            }}
                            variant="outline"
                        >
                            <FaEdit className="me-1" /> تعديل
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip>حذف</Tooltip>}>
                        <Button
                            size="sm"
                            onClick={handleDelete}
                            className="flex-grow-1"
                            style={{
                                borderColor: theme.colors.danger,
                                color: theme.colors.danger
                            }}
                            variant="outline"
                        >
                            <FaTrash className="me-1" /> حذف
                        </Button>
                    </OverlayTrigger>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DocumentCard;
