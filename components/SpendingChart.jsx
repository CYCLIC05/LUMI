"use client";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingChart({ data }) {
    // data format: [{ label: 'Bus', value: 100, color: '#...' }, ...]


    // Chart Data Configuration
    const chartData = {
        labels: data.map(dataPoint => dataPoint.label),
        datasets: [
            {
                data: data.map(dataPoint => dataPoint.value),
                backgroundColor: data.map(dataPoint => dataPoint.color),
                borderColor: '#12121f', // Match surface color for spacing
                borderWidth: 2,
                cutout: '75%', // Thinner donut style
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#94a3b8', // text-secondary
                    usePointStyle: true,
                    boxWidth: 8,
                    font: {
                        family: 'Inter',
                        size: 11
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1e1e2d',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 8,
                displayColors: true,
            }
        },
        maintainAspectRatio: false
    };

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div style={{ height: 180, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none', left: '0', right: '100px' }}>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>Total</span>
                <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>
                    ₦{total.toLocaleString()}
                </span>
            </div>
            <Doughnut data={chartData} options={options} />
        </div>
    );
}
