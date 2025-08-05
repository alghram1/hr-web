import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import {
    FaEdit,
    FaTrash,
    FaEye,
    FaFileAlt,
    FaDownload,
    FaList,
} from 'react-icons/fa';
import '../Styles/smart-table.scss';

// زر موحد بلون الهوية البصرية
const ActionButton = ({ onClick, icon, title, children, variant = 'brand' }) => (
    <Button
        onClick={onClick}
        size="sm"
        className={`rounded-pill border-0 d-inline-flex align-items-center gap-1 btn-${variant}`}
        title={title}
    >
        {icon}
        {children}
    </Button>
);

export default function SmartTable({
    columns = [],
    data = [],
    onEdit,
    onDelete,
    showActions = true,
    customActions = null,
    responsive = true,
    bordered = false,
    hover = true,
    striped = false,
    size = 'md',
    className = '',
    showIndex = true,
}) {
    const getIconForAction = (text) => {
        const lower = text?.toLowerCase?.() || '';
        if (lower.includes('عرض') || lower.includes('استعراض')) return <FaEye className="me-1" />;
        if (lower.includes('تفاصيل')) return <FaFileAlt className="me-1" />;
        if (lower.includes('تحميل')) return <FaDownload className="me-1" />;
        if (lower.includes('قائمة') || lower.includes('الصلاحيات')) return <FaList className="me-1" />;
        return null;
    };

    const renderCell = (item, col) => {
        if (typeof col.render === 'function') {
            return col.render(item[col.key], item);
        }
        return item[col.key];
    };

    return (
        <div className={`${responsive ? 'table-responsive' : ''} w-100`}>
            <Table
                className={`smart-table align-middle text-center w-100 ${className}`}
                style={{ tableLayout: 'auto' }}
                bordered={bordered}
                hover={hover}
                striped={striped}
                size={size}
            >
                <thead>
                    <tr className="smart-table-header">
                        {showIndex && <th style={{ whiteSpace: 'nowrap' }}>#</th>}
                        {columns.map((col) => (
                            <th key={col.key} style={{ whiteSpace: 'nowrap' }}>{col.label}</th>
                        ))}
                        {showActions && <th style={{ whiteSpace: 'nowrap' }}>الإجراءات</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (showActions ? 1 : 0) + (showIndex ? 1 : 0)}
                                className="text-muted py-4"
                            >
                                لا توجد بيانات لعرضها حالياً.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.id || index} className="smart-table-row">
                                {showIndex && <td className="fw-bold text-secondary">{index + 1}</td>}
                                {columns.map((col) => (
                                    <td key={col.key} className="text-muted">
                                        {renderCell(item, col)}
                                    </td>
                                ))}
                                {showActions && (
                                    <td className="smart-table-actions">
                                        {customActions?.(item, getIconForAction)}

                                        {onEdit && (
                                            <ActionButton
                                                onClick={() => onEdit(item)}
                                                icon={<FaEdit />}
                                                title="تعديل"
                                            >
                                                تعديل
                                            </ActionButton>
                                        )}
                                        {onDelete && (
                                            <ActionButton
                                                onClick={() => onDelete(item)}
                                                icon={<FaTrash />}
                                                title="حذف"
                                                variant="danger"
                                            >
                                                حذف
                                            </ActionButton>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}

SmartTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    customActions: PropTypes.func,
    showActions: PropTypes.bool,
    responsive: PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    striped: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    showIndex: PropTypes.bool,
};
