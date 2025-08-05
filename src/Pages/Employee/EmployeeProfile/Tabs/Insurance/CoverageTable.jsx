// Components/CoverageTable.jsx
import React from 'react';
import { Table } from 'react-bootstrap';
import getCoverageLabel from '../Insurance/getCoverageLabel';
import theme from '../../../../../theme'; // ← تأكد من صحة المسار

const CoverageTable = ({ coverage }) => {
    return (
        <Table striped hover className="text-center" style={{ borderColor: theme.colors.grayBorder }}>
            <thead style={{
                backgroundColor: theme.colors.grayBg,
                borderBottom: `2px solid ${theme.colors.grayBorder}`
            }}>
                <tr className="text-dark">
                    <th>نوع التغطية</th>
                    <th>مشمولة؟</th>
                    <th>الحد / التفاصيل</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(coverage).map(([key, cov]) => (
                    <tr key={key}>
                        <td>{getCoverageLabel(key)}</td>
                        <td style={{ color: cov.included ? theme.colors.success : theme.colors.danger }}>
                            {cov.included ? '✅ نعم' : '❌ لا'}
                        </td>
                        <td>{cov.limit || cov.note || '-'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CoverageTable;
