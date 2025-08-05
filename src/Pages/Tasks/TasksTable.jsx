import React, { useMemo } from 'react';
import SmartTable from '../../Components/SmartTable';
import { Badge, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsChatDotsFill } from 'react-icons/bs';
import theme from '../../theme'; // ✅ الهوية البصرية

const mockTasks = [
    {
        id: 'T-001',
        title: 'تحضير عرض تقديمي',
        assignee: 'محمد العلي',
        avatar: '/images/avatar1.jpg',
        status: 'متأخرة',
        dueDate: '2024-04-25',
        creator: 'أحمد',
    },
    {
        id: 'T-002',
        title: 'مراجعة تقرير الأداء',
        assignee: 'فاطمة الزهراء',
        avatar: '/images/avatar2.jpg',
        status: 'مستحقة اليوم',
        dueDate: '2024-04-20',
        creator: 'منى',
    },
    {
        id: 'T-003',
        title: 'ترتيب لقاء إداري',
        assignee: 'سعود بن فيصل',
        avatar: '/images/avatar3.jpg',
        status: 'خلال ٧ أيام',
        dueDate: '2024-04-28',
        creator: 'عبدالرحمن',
    },
];

const statusMap = {
    'متأخرة': theme.colors.danger,
    'مستحقة اليوم': theme.colors.accent,
    'خلال ٧ أيام': theme.colors.info,
};

const TasksTable = ({ filter = 'all', query = '' }) => {
    const filteredTasks = useMemo(() => {
        return mockTasks.filter(task => {
            const matchStatus = filter === 'all' || task.status === filter;
            const matchSearch =
                task.title.toLowerCase().includes(query.toLowerCase()) ||
                task.id.toLowerCase().includes(query.toLowerCase());
            return matchStatus && matchSearch;
        });
    }, [filter, query]);

    const columns = [
        { key: 'id', label: 'المعرف' },
        {
            key: 'title',
            label: 'المهمة',
            render: (val) => (
                <span
                    className="fw-semibold text-decoration-underline"
                    style={{ color: theme.colors.accent, cursor: 'pointer' }}
                >
                    {val}
                </span>
            ),
        },
        {
            key: 'assignee',
            label: 'المعين',
            render: (_, row) => (
                <div className="d-flex align-items-center justify-content-center gap-2">
                   
                    <span className="small">{row.assignee}</span>
                </div>
            ),
        },
        { key: 'dueDate', label: 'الاستحقاق' },
        { key: 'creator', label: 'أنشئت بواسطة' },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <Badge
                    style={{
                        backgroundColor: statusMap[val] || theme.colors.grayDark,
                        color: '#fff'
                    }}
                    className="px-2 py-1 fw-normal"
                >
                    {val}
                </Badge>
            ),
        },
        {
            key: 'comments',
            label: 'تفاصيل',
            render: () => (
                <OverlayTrigger placement="top" overlay={<Tooltip>تعليق أو مناقشة</Tooltip>}>
                    <BsChatDotsFill className="text-muted" />
                </OverlayTrigger>
            ),
        },
    ];

    return (
        <SmartTable
            columns={columns}
            data={filteredTasks}
            responsive={true}
            showActions={false}
            striped={false}
        />
    );
};

export default TasksTable;
