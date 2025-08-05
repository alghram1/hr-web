// src/components/MiniLineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MiniLineChart = ({ dataPoints, color = '#198754' }) => {
    const data = {
        labels: dataPoints.map((_, i) => i + 1),
        datasets: [
            {
                data: dataPoints,
                fill: false,
                borderColor: color,
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: false },
            y: { display: false },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div style={{ height: '40px', marginTop: '10px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default MiniLineChart;
