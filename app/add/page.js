"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFare } from '@/context/FareContext';
import { Bus, Car, Train, ArrowLeft, Plane } from 'lucide-react';
import Link from 'next/link';

export default function AddFare() {
    const router = useRouter();
    const { addTransaction } = useFare();

    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Bus');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        addTransaction({
            amount: Number(amount),
            type,
            title: note || `${type} Trip`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });

        router.push('/dashboard');
    };

    const types = [
        { id: 'Bus', icon: <Bus /> },
        { id: 'Car', icon: <Car /> },
        { id: 'Train', icon: <Train /> },
        { id: 'Airplane', icon: <Plane /> },
        { id: 'Danfo', icon: <Bus /> },
    ];

    return (
        <div style={{ padding: '24px 20px 100px 20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <Link href="/dashboard" style={{ color: 'white', display: 'flex', alignItems: 'center' }}><ArrowLeft size={22} /></Link>
                <h1 style={{ fontSize: '1.35rem', margin: 0, fontWeight: '600', color: 'white' }}>New Entry</h1>
            </header>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 50, textAlign: 'center' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: 12, letterSpacing: '1.5px', fontWeight: '500' }}>ENTER AMOUNT</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <span style={{ fontSize: '2.2rem', color: '#64748b', fontWeight: '600' }}>₦</span>
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
                                fontSize: '3.5rem',
                                fontWeight: '700',
                                width: '220px',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 35 }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: 16, letterSpacing: '1.5px', fontWeight: '500' }}>TRANSPORT MODE</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {types.map(t => (
                            <div
                                key={t.id}
                                onClick={() => setType(t.id)}
                                style={{
                                    background: type === t.id ? 'linear-gradient(135deg, #4F75FF, #2E5BFF)' : 'linear-gradient(135deg, #1a1a2e, #1e1e2d)',
                                    padding: '22px 0',
                                    borderRadius: 18,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 10,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: type === t.id ? '1px solid rgba(79, 117, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                                    boxShadow: type === t.id ? '0 8px 24px rgba(79, 117, 255, 0.3)' : 'none'
                                }}
                            >
                                {t.icon}
                                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: 45 }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', marginBottom: 16, letterSpacing: '1.5px', fontWeight: '500' }}>NOTE (OPTIONAL)</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. To Victoria Island"
                        style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '16px 18px',
                            borderRadius: 16,
                            color: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Save Transaction
                </button>
            </form>
        </div>
    );
}
