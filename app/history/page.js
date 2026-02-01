"use client";
import { useState } from 'react';
import { useFare } from '@/context/FareContext';
import FareCard from '@/components/FareCard';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function History() {
    const { transactions } = useFare();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter
    const filtered = transactions.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm)
    );

    // Grouping
    const grouped = filtered.reduce((groups, t) => {
        const date = new Date(t.date).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(t);
        return groups;
    }, {});

    const getGroupLabel = (dateStr) => {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (dateStr === today) return "Today";
        if (dateStr === yesterday) return "Yesterday";
        return dateStr;
    };

    return (
        <div style={{ padding: '20px 20px 100px 20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Link href="/dashboard" style={{ color: 'white' }}><ArrowLeft /></Link>
                <h1 style={{ fontSize: '1.2rem', margin: 0, flex: 1 }}>History</h1>
                {/* <Search size={20} color="#94a3b8" /> */}
            </header>

            <div style={{ position: 'relative', marginBottom: 25 }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        background: '#1e1e2d',
                        border: 'none',
                        padding: '12px 12px 12px 45px',
                        borderRadius: 12,
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            {Object.keys(grouped).length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: 50 }}>
                    <p>No transactions found.</p>
                </div>
            ) : (
                Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a)).map(date => (
                    <div key={date} style={{ marginBottom: 25 }}>
                        <h3 style={{
                            fontSize: '0.9rem',
                            color: '#94a3b8',
                            marginBottom: 10,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            fontWeight: 600
                        }}>
                            {getGroupLabel(date)}
                        </h3>
                        {grouped[date].map(t => (
                            <FareCard key={t.id} trip={t} />
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
