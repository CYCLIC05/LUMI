"use client";
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useFare } from '@/context/FareContext';
import { Bus, Car, Train, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditFare({ params }) {
    const router = useRouter();
    const { transactions, updateTransaction, deleteTransaction } = useFare();
    const { id } = use(params);

    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Bus');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && transactions.length > 0) {
            const transaction = transactions.find(t => t.id === id);
            if (transaction) {
                setAmount(transaction.amount);
                setType(transaction.type);
                setNote(transaction.title === `${transaction.type} Trip` ? '' : transaction.title);
                setLoading(false);
            } else {
                router.push('/dashboard');
            }
        }
    }, [id, transactions, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        const transaction = transactions.find(t => t.id === id);
        if (!transaction) return;

        updateTransaction({
            ...transaction,
            amount: Number(amount),
            type,
            title: note || `${type} Trip`,
        });

        router.push('/dashboard');
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this trip?')) {
            deleteTransaction(id);
            router.push('/dashboard');
        }
    };

    const types = [
        { id: 'Bus', icon: <Bus /> },
        { id: 'Car', icon: <Car /> },
        { id: 'Train', icon: <Train /> },
    ];

    if (loading) return <div style={{ padding: 20, color: 'white' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Link href="/dashboard" style={{ color: 'white' }}><ArrowLeft /></Link>
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Edit Entry</h1>
                </div>
                <button onClick={handleDelete} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={20} />
                </button>
            </header>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 10, letterSpacing: 1 }}>AMOUNT</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <span style={{ fontSize: '2rem', color: '#64748b' }}>₦</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            autoFocus
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                width: '200px',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 30 }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 15 }}>TRANSPORT MODE</label>
                    <div style={{ display: 'flex', gap: 15 }}>
                        {types.map(t => (
                            <div
                                key={t.id}
                                onClick={() => setType(t.id)}
                                style={{
                                    flex: 1,
                                    background: type === t.id ? '#3b82f6' : '#1e1e2d',
                                    padding: '20px 0',
                                    borderRadius: 15,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 10,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: type === t.id ? '2px solid #60a5fa' : '2px solid transparent'
                                }}
                            >
                                {t.icon}
                                <span style={{ fontSize: '0.9rem' }}>{t.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: 40 }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 15 }}>NOTE (OPTIONAL)</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. To Victoria Island"
                        style={{
                            width: '100%',
                            background: '#1e1e2d',
                            border: 'none',
                            padding: '15px',
                            borderRadius: 15,
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Update Transaction
                </button>
            </form>
        </div>
    );
}
