import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../Layout/MainLayout';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TasksTable from './TasksTable';

import theme from '../../theme'; // ✅ استيراد الألوان من الهوية البصرية

const TaskManagerPage = () => {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        status: '',
        assignee: '',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddTask = () => {
        navigate('/Tasks/CreateTaskPage');
    };

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const handleResetFilters = () => {
        setFilters({ status: '', assignee: '' });
        setSearchQuery('');
    };

    return (
        <MainLayout>
            <Container fluid className="pt-4 px-4" dir="rtl">

                {/* 🔹 العنوان وزر الإنشاء */}
                <Row className="align-items-center justify-content-between mb-4">
                    <Col md={6}>
                        <h4 className="fw-bold text-dark mb-0">إدارة المهام</h4>
                        <div className="text-muted small">تابع حالة المهام الخاصة بك واتخذ الإجراءات المناسبة</div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end mt-3 mt-md-0">
                        <Button
                            variant="success"
                            className="d-flex align-items-center gap-2 px-3 py-1 transition-all"
                            style={{
                                transition: 'all 0.3s ease-in-out',
                                backgroundColor: theme.colors.accent,  // ✅ تركوازي
                                borderColor: theme.colors.accent
                            }}
                            onClick={handleAddTask}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <BsPlusCircle />
                            إنشاء مهمة
                        </Button>
                    </Col>
                </Row>

                {/* 🔹 البطاقات الأربع */}
                <Row className="gy-3 mb-4">
                    <Col xs={12} sm={6} md={3}>
                        <TaskCard type="unassigned" count={0} />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <TaskCard type="overdue" count={6} />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <TaskCard type="today" count={0} />
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <TaskCard type="assigned" count={11} />
                    </Col>
                </Row>

                {/* 🔹 الفلاتر والبحث */}
                <Row className="mb-4">
                    <Col lg={4}>
                        <TaskFilters
                            filters={filters}
                            onChange={handleFilterChange}
                            onReset={handleResetFilters}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                    </Col>
                </Row>

                {/* 🔹 جدول المهام */}
                <Row>
                    <Col>
                        <TasksTable
                            filter={filters.status || 'all'}
                            query={searchQuery}
                        />
                    </Col>
                </Row>

                {/* 🔹 زر عائم */}
                <Button
                    title="إضافة مهمة جديدة"
                    onClick={handleAddTask}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '30px',
                        backgroundColor: theme.primary, // ✅ كحلي
                        border: 'none',
                        borderRadius: '50%',
                        width: '52px',
                        height: '52px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        zIndex: 99,
                    }}
                >
                    <BsPlusCircle size={24} color="#fff" />
                </Button>
            </Container>
        </MainLayout>
    );
};

export default TaskManagerPage;
