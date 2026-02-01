"use client";
import WeeklyChart from '@/components/WeeklyChart';
import FareCard from '@/components/FareCard';
import { useFare } from '@/context/FareContext';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function Stats() {
    const { transactions } = useFare();

    // Calculate Weekly Data (Last 7 Days)
    const getWeeklyData = () => {
        const result = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun
        const now = new Date();

        // This is a simplified "current week" logic (Mon-Sun)
        // Adjust as needed to be "last 7 days" or "current calendar week"
        // Let's do "Current Week" starting Monday

        const currentDay = now.getDay(); // 0 (Sun) - 6 (Sat)
        const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        transactions.forEach(t => {
            const date = new Date(t.date);
            if (date >= monday) {
                // Day index: 0 (Sun) - 6 (Sat)
                // Map to 0 (Mon) - 6 (Sun)
                let dayIndex = date.getDay();
                dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

                if (dayIndex >= 0 && dayIndex < 7) {
                    result[dayIndex] += Number(t.amount);
                }
            }
        });

        return result;
    };

    const weeklyData = getWeeklyData();

    // Get high cost trips (e.g. > 1000)
    const highCostTrips = transactions
        .filter(t => t.amount >= 1000)
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
                    highCostTrips.map(t => (
                        <FareCard key={t.id} trip={t} />
                    ))
                )}
            </section>
        </div>
    );
}
