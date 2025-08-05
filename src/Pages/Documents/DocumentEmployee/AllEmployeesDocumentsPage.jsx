import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MainLayout from '../../../Layout/MainLayout';
import DocumentStatisticsBox from './DocumentStatisticsBox';
import DocumentListTable from './DocumentListTable';
import SearchEmployeeDocuments from './SearchEmployeeDocuments';
import theme from '../../../theme'; // ✅ استيراد الهوية البصرية

const MOCK_DOCUMENTS = [
    {
        id: '1',
        employeeName: 'أحمد عبد الله',
        employeeId: 'EMP001',
        type: 'الهوية',
        title: 'الهوية الوطنية',
        expiryDate: '2025-12-31',
        status: 'valid',
        fileUrl: '/docs/id_ahmed.pdf'
    },
    {
        id: '2',
        employeeName: 'سارة علي',
        employeeId: 'EMP002',
        type: 'جواز السفر',
        title: 'جواز السفر',
        expiryDate: '2024-06-01',
        status: 'expiring_soon',
        fileUrl: '/docs/passport_sara.pdf'
    },
    {
        id: '3',
        employeeName: 'فهد العتيبي',
        employeeId: 'EMP003',
        type: 'عقد العمل',
        title: 'عقد عمل دائم',
        expiryDate: '2023-10-10',
        status: 'expired',
        fileUrl: '/docs/contract_fahad.pdf'
    }
];

const AllEmployeesDocumentsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [documentTypeFilter, setDocumentTypeFilter] = useState('');
    const [documents, setDocuments] = useState([]);
    const [filteredDocs, setFilteredDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setDocuments(MOCK_DOCUMENTS);
            setFilteredDocs(MOCK_DOCUMENTS);
            setLoading(false);
        }, 700); // simulate API delay
    }, []);

    useEffect(() => {
        const filtered = documents.filter((doc) => {
            const matchesSearch =
                doc.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = documentTypeFilter
                ? doc.type === documentTypeFilter
                : true;

            return matchesSearch && matchesType;
        });

        setFilteredDocs(filtered);
    }, [searchQuery, documentTypeFilter, documents]);

    const handleEdit = (doc) => {
        alert(`تعديل المستند: ${doc.title} - ${doc.employeeName}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('هل أنت متأكد من حذف المستند؟')) {
            const updated = documents.filter(d => d.id !== id);
            setDocuments(updated);
            setFilteredDocs(updated);
        }
    };

    const calculateStats = (docs = []) => {
        let valid = 0;
        let expiringSoon = 0;
        let expired = 0;

        const now = new Date();

        docs.forEach(doc => {
            const expiry = new Date(doc.expiryDate);
            if (expiry < now) {
                expired++;
            } else if ((expiry - now) / (1000 * 60 * 60 * 24) <= 30) {
                expiringSoon++;
            } else {
                valid++;
            }
        });

        return {
            total: docs.length,
            valid,
            expiringSoon,
            expired
        };
    };

    return (
        <MainLayout>
            <Container fluid dir="rtl" className="pt-4 px-4">

                {/* ✅ إحصائيات المستندات */}
                <DocumentStatisticsBox stats={calculateStats(filteredDocs)} />

                {/* ✅ عنوان رئيسي بلون الهوية */}
                <h4 className="fw-bold mb-4" style={{ color: theme.colors.primary }}>
                    📚 مستندات جميع الموظفين
                </h4>

                {/* ✅ مكون البحث + نوع المستند */}
                <SearchEmployeeDocuments
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    documentTypeFilter={documentTypeFilter}
                    onTypeFilterChange={setDocumentTypeFilter}
                    showTypeFilter={true}
                />

                {/* ✅ جدول المستندات */}
                <DocumentListTable
                    documents={filteredDocs || []}
                    isLoading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </Container>
        </MainLayout>
    );
};

export default AllEmployeesDocumentsPage;
