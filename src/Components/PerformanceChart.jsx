


// هذي صفحة للمخططات كبيرة راح استخدمها في تحليل الاداء الشامل على مستوى الموظفين والمدراء وكل شي بتكون مخصخصة حسب ما اريد واعتقد بستخدمها في الاعدات الاداء 
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PerformanceChart = () => {
    const data = {
        labels: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس'],
        datasets: [
            {
                label: 'نسبة الحضور (%)',
                data: [92, 88, 94, 89, 95, 90],
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
        },
        scales: {
            y: { beginAtZero: true, max: 100, ticks: { stepSize: 10 } },
        },
    };

    return (
        <div className="p-3 bg-white rounded shadow-sm border" style={{ height: '100%' }}>
            <h6 className="fw-bold mb-3 text-dark">📊 أداء الحضور الأسبوعي</h6>
            <Line data={data} options={options} />
        </div>
    );
};

export default PerformanceChart;
