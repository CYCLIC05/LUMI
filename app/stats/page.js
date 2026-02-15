"use client";
import WeeklyChart from '@/components/WeeklyChart';
import FareCard from '@/components/FareCard';
import { useFare } from '@/context/FareContext';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function Stats() {
    const { transactions } = useFare();

    // Calculate Weekly Data (Current Week)
    const getWeeklyData = () => {
        const now = new Date();
        const currentDay = now.getDay();
        const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        const weeklyTransactions = transactions
            .filter(t => new Date(t.date) >= monday)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const labels = weeklyTransactions.map(t => {
            const date = new Date(t.date);
            return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        });

        const data = weeklyTransactions.map(t => t.amount);

        return { labels, data };
    };

    const weeklyChartData = getWeeklyData();

    /**
     * Calculates total spending for the current month.
     * @returns {number} The total amount spent in the current month.
     */
    const getMonthlyData = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return transactions
            .filter(transaction => {
                const date = new Date(transaction.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    };

    const monthlyTotal = getMonthlyData();

    // Get high cost trips (e.g. > 1000)
    // Sorts by amount descending and takes top 5
    const highCostTrips = transactions
        .filter(transaction => transaction.amount >= 1000)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    return (
        <div style={{ padding: '24px 20px 100px 20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <Link href="/dashboard" style={{ color: 'white', display: 'flex', alignItems: 'center' }}><ArrowLeft size={22} /></Link>
                <h1 style={{ fontSize: '1.35rem', margin: 0, fontWeight: '600', color: 'white' }}>Statistics</h1>
                <Share2 size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </header>

            <WeeklyChart chartData={weeklyChartData} />

            <section style={{ marginBottom: 28 }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1e1e2d, #252538)',
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                }}>
                    <div>
                        <h2 style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 8px 0', fontWeight: '500', letterSpacing: '0.5px' }}>This Month</h2>
                        <p style={{ fontSize: '1.6rem', fontWeight: '700', margin: 0, color: 'white' }}>₦{monthlyTotal.toLocaleString()}</p>
                    </div>
                    <div style={{
                        width: 48, height: 48,
                        borderRadius: 14,
                        background: 'rgba(79, 117, 255, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#4F75FF'
                    }}>
                        <span style={{ fontSize: '1.3rem' }}>📅</span>
                    </div>
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ fontSize: '1.15rem', margin: 0, fontWeight: '600', color: 'white' }}>High-Cost Trips</h2>
                    <Link href="/history" style={{ color: '#4F75FF', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '500' }}>View all</Link>
                </div>

                {highCostTrips.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: 30 }}>
                        <p>No high-cost trips found.</p>
                    </div>
                ) : (
                    highCostTrips.map(transaction => (
                        <FareCard key={transaction.id} trip={transaction} />
                    ))
                )}
            </section>
        </div>
    );
}
