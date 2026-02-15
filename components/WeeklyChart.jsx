"use client";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function WeeklyChart({ chartData }) {
    // Safely handle missing data
    const labels = chartData?.labels || [];
    const points = chartData?.data || [];
    // If we have points but labels is empty or vice versa, proceed safely

    // Check if we have valid data to render
    const hasData = points.length > 0;

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Spending',
                data: points,
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(79, 117, 255, 0.4)');
                    gradient.addColorStop(1, 'rgba(79, 117, 255, 0)');
                    return gradient;
                },
                borderColor: '#4F75FF',
                borderWidth: 2,
                tension: 0.3, // Smoother curve
                pointBackgroundColor: '#1e1e2d',
                pointBorderColor: '#4F75FF',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e1e2d',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return '₦ ' + context.parsed.y.toLocaleString();
                    }
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
                    font: { size: 10 },
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    borderDash: [5, 5],
                    drawBorder: false,
                },
                ticks: {
                    display: false
                },
                beginAtZero: true
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    const total = points.reduce((a, b) => a + b, 0);

    return (
        <div style={{ background: '#12121f', borderRadius: 24, padding: 20, marginBottom: 25, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                    <h3 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 5px 0' }}>Weekly Spending</h3>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', margin: 0 }}>₦{total.toLocaleString()}</p>
                </div>
            </div>

            <div style={{ height: 250 }}>
                {hasData ? (
                    <Line data={data} options={options} />
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        No transactions this week
                    </div>
                )}
            </div>
        </div>
    );
}
