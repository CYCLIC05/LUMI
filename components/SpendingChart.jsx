"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SpendingChart({ data }) {
    // data format: { labels: ['9:00 AM', '10:00 AM'], datasets: [{ data: [500, 200], ... }] }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend for cleaner look
            },
            tooltip: {
                backgroundColor: '#1e1e2d',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `₦${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        family: 'Inter',
                        size: 10
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        family: 'Inter',
                        size: 10
                    },
                    callback: (value) => '₦' + value
                },
                beginAtZero: true
            }
        },
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    return (
        <div style={{ height: 180, width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
}
