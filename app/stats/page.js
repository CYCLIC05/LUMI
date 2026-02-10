"use client";
import WeeklyChart from '@/components/WeeklyChart';
import FareCard from '@/components/FareCard';
import { useFare } from '@/context/FareContext';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function Stats() {
    const { transactions } = useFare();

    // Calculate Weekly Data (Last 7 Days)
    /**
     * Calculates total spending for the current week (Monday to Sunday).
     * @returns {number[]} Array of 7 numbers representing daily totals (Mon-Sun).
     */
    const getWeeklyData = () => {
        const result = [0, 0, 0, 0, 0, 0, 0]; // Index 0 = Mon, 6 = Sun
        const now = new Date();

        // Calculate the start of the week (Monday) with "Current Week" logic
        const currentDay = now.getDay(); // 0 (Sun) - 6 (Sat)
        // Calculate days to subtract to get to Monday.
        // If Sunday (0), subtract 6. If Mon (1), subtract 0. If Tue (2), subtract 1.
        // diff calculation: currentDay - 1 (except sun).
        // Correct logic: if 0 (Sun), go back 6 days. Else go back currentDay - 1 days.
        const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            // Only include transactions from this week's Monday onwards
            if (date >= monday) {
                // Determine array index: 0 (Mon) - 6 (Sun)
                let dayIndex = date.getDay(); // Returns 0 for Sunday

                // Map Sunday (0) to 6, and others (1-6) to (0-5)
                dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

                if (dayIndex >= 0 && dayIndex < 7) {
                    result[dayIndex] += Number(transaction.amount);
                }
            }
        });

        return result;
    };

    const weeklyData = getWeeklyData();

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
        <div style={{ padding: '20px 20px 100px 20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <Link href="/dashboard" style={{ color: 'white' }}><ArrowLeft /></Link>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Statistics</h1>
                <Share2 size={20} color="#94a3b8" />
            </header>

            <WeeklyChart data={weeklyData} />

            <section style={{ marginBottom: 25 }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1e1e2d, #2d2d42)',
                    borderRadius: 20,
                    padding: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}>
                    <div>
                        <h2 style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 5px 0' }}>This Month</h2>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>₦{monthlyTotal.toLocaleString()}</p>
                    </div>
                    <div style={{
                        width: 45, height: 45,
                        borderRadius: 12,
                        background: 'rgba(59, 130, 246, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#3b82f6'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>📅</span>
                    </div>
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <h2 style={{ fontSize: '1.1rem', margin: 0 }}>High-Cost Trips</h2>
                    <Link href="/history" style={{ color: '#3b82f6', fontSize: '0.85rem', textDecoration: 'none' }}>View all</Link>
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
