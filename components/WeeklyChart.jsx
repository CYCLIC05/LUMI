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

export default function WeeklyChart({ data }) {
    // data: array of numbers for last 7 days [Mon, Tue, ..., Sun]

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Spending',
                data: data,
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // primary with opacity
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    return gradient;
                },
                borderColor: '#3b82f6',
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                pointBackgroundColor: '#1e1e2d',
                pointBorderColor: '#3b82f6',
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
                padding: 10,
                cornerRadius: 8,
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
                    display: false, // Hide x grid
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { size: 10 }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    borderDash: [5, 5],
                    drawBorder: false,
                },
                ticks: {
                    display: false // Hide y labels for cleaner look
                },
                beginAtZero: true
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    const total = data.reduce((a, b) => a + b, 0);

    return (
        <div style={{ background: '#12121f', borderRadius: 24, padding: 20, marginBottom: 25, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                    <h3 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 5px 0' }}>Itinerary</h3>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', margin: 0 }}>₦{total.toLocaleString()}</p>
                </div>
                {/* Could add percentage change here if we had last week's data */}
            </div>

            <div style={{ height: 200 }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
