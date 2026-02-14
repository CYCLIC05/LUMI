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

    // Prepare chart data
    const chartData = {
        labels: sortedTransactions.map(t => t.time || new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [{
            data: sortedTransactions.map(t => t.amount),
            backgroundColor: sortedTransactions.map(t =>
                t.type === 'Bus' ? '#3b82f6' :
                    t.type === 'Car' ? '#10b981' :
                        t.type === 'Train' ? '#f59e0b' : '#64748b'
            ),
            borderRadius: 6,
            barThickness: 20,
        }]
    };

    // If no data, show placeholder or empty stats
    const hasSpending = sortedTransactions.length > 0;

    return (
        <div style={{ padding: '20px 20px 100px 20px' }}>
            <header style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>LUMI Dashboard</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Good Morning, Traveler</p>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e2d', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    🔔
                </div>
            </header>

            <SummaryCard total={totalToday} percentage={percentage} />

            <section style={{ marginBottom: 25 }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: 15 }}>Spending Breakdown</h2>
                {hasSpending ? (
                    <SpendingChart data={chartData} />
                ) : (
                    <div style={{ padding: 20, background: 'var(--surface-highlight)', borderRadius: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
                        No spending today
                    </div>
                )}
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Recent Trips</h2>
                    <Link href="/history" style={{ color: '#3b82f6', fontSize: '0.85rem', textDecoration: 'none' }}>View all</Link>
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
