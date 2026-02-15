"use client";
import { useFare } from '@/context/FareContext';
import SummaryCard from '@/components/SummaryCard';
import FareCard from '@/components/FareCard';
import SpendingChart from '@/components/SpendingChart';
import Link from 'next/link';

export default function Dashboard() {
    const { transactions, getTotalToday } = useFare();
    const totalToday = getTotalToday();

    // Mock percentage for now - in real app, compare with yesterday
    const percentage = 12;

    // Calculate Breakdown
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter(t => new Date(t.date).toDateString() === today);

    // Sort by time
    const sortedTransactions = [...todayTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare pie chart data grouped by transport type
    const transportTotals = {};
    todayTransactions.forEach(t => {
        const type = t.type || 'Other';
        if (!transportTotals[type]) {
            transportTotals[type] = 0;
        }
        transportTotals[type] += t.amount;
    });

    // Get colors for each transport type
    const getTypeColor = (type) => {
        switch (type) {
            case 'Bus': return '#4F75FF';
            case 'Danfo': return '#3B7FFF';
            case 'Car': return '#10b981';
            case 'Train': return '#f59e0b';
            case 'Airplane': return '#8b5cf6';
            default: return '#64748b';
        }
    };

    const chartData = {
        labels: Object.keys(transportTotals),
        datasets: [{
            data: Object.values(transportTotals),
            backgroundColor: Object.keys(transportTotals).map(type => getTypeColor(type)),
            borderColor: '#12121f',
            borderWidth: 3,
        }]
    };

    // If no data, show placeholder or empty stats
    const hasSpending = sortedTransactions.length > 0;

    return (
        <div style={{ padding: '24px 20px 100px 20px' }}>
            <header style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.65rem', fontWeight: '700', margin: 0, color: 'white' }}>LUMI Dashboard</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '4px 0 0 0', fontWeight: '500' }}>Good Morning, Traveler</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'linear-gradient(135deg, #1e1e2d, #252538)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    🔔
                </div>
            </header>

            <SummaryCard total={totalToday} percentage={percentage} />

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: 16, fontWeight: '600', color: 'white' }}>Spending Breakdown</h2>
                {hasSpending ? (
                    <SpendingChart data={chartData} />
                ) : (
                    <div style={{ padding: 28, background: 'linear-gradient(135deg, #1a1a2e, #1e1e2d)', borderRadius: 20, textAlign: 'center', color: '#64748b', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        No spending today
                    </div>
                )}
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ fontSize: '1.15rem', margin: 0, fontWeight: '600', color: 'white' }}>Recent Trips</h2>
                    <Link href="/history" style={{ color: '#4F75FF', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '500' }}>View all</Link>
                </div>

                {transactions.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: 40 }}>
                        <p>No trips yet.</p>
                        <p>Tap + to add one.</p>
                    </div>
                ) : (
                    transactions.slice(0, 5).map(t => (
                        <FareCard key={t.id} trip={t} />
                    ))
                )}
            </section>
        </div>
    );
}
