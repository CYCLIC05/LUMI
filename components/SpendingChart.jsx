"use client";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingChart({ data }) {
    // data format: { labels: ['Bus', 'Car', 'Train'], datasets: [{ data: [500, 200, 300], backgroundColor: [...] }] }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font: {
                        size: 11,
                        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif'
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: '#1e1e2d',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 10,
                displayColors: true,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ₦${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '65%', // Makes it a doughnut chart
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    return (
        <div style={{
            height: 240,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0'
        }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}
