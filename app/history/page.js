"use client";
import { useState } from 'react';
import { useFare } from '@/context/FareContext';
import FareCard from '@/components/FareCard';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function History() {
    const { transactions } = useFare();
    const [searchTerm, setSearchTerm] = useState('');

    // ONE: Search Filter
    // Filters transactions based on title or amount matching the search term
    const filteredTransactions = transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)
    );

    // TWO: Date Grouping
    // Groups transactions by date for display
    const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(transaction);
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
        <div style={{ padding: '24px 20px 100px 20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Link href="/dashboard" style={{ color: 'white', display: 'flex', alignItems: 'center' }}><ArrowLeft size={22} /></Link>
                <h1 style={{ fontSize: '1.35rem', margin: 0, flex: 1, fontWeight: '600', color: 'white' }}>History</h1>
            </header>

            <div style={{ position: 'relative', marginBottom: 28 }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '14px 14px 14px 48px',
                        borderRadius: 14,
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.92rem',
                        transition: 'all 0.3s ease'
                    }}
                />
            </div>

            {Object.keys(groupedTransactions).length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: 50 }}>
                    <p>No transactions found.</p>
                </div>
            ) : (
                Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a)).map(date => (
                    <div key={date} style={{ marginBottom: 28 }}>
                        <h3 style={{
                            fontSize: '0.8rem',
                            color: '#94a3b8',
                            marginBottom: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            fontWeight: '600'
                        }}>
                            {getGroupLabel(date)}
                        </h3>
                        {groupedTransactions[date].map(transaction => (
                            <FareCard key={transaction.id} trip={transaction} />
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
