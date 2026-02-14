"use client";
import { useState } from 'react';
import { useFare } from '@/context/FareContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { ArrowLeft, User, Share2, Trash2, Globe, Shield, ChevronRight, Moon, Sun } from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function Profile() {
    const { deleteAllTransactions, transactions, userName, setUserName } = useFare();
    const { theme, toggleTheme } = useTheme();
    const [currency, setCurrency] = useState('NGN');

    // Modal state
    const [showExportModal, setShowExportModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);

    const performClearData = () => {
        localStorage.removeItem('lumi-fares');
        // Optional: Call context method if available, but reload works for full reset
        window.location.reload();
    };

    const performExport = () => {
        if (!transactions || transactions.length === 0) {
            alert("No data to export"); // Could use a toast here ideally
            setShowExportModal(false);
            return;
        }

        const headers = ["Date", "Type", "Title", "Amount"];
        const csvContent = [
            headers.join(","),
            ...transactions.map(t =>
                `${new Date(t.date).toLocaleDateString()},${t.type},"${t.title}",${t.amount}`
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `lumi_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setShowExportModal(false);
    };

    const handlePrivacy = () => {
        alert("Privacy Policy:\n\nAll data is stored locally on your device using LocalStorage. No data is sent to any server.");
    };

    const toggleCurrency = () => {
        setCurrency(prev => prev === 'NGN' ? 'USD' : 'NGN');
    };

    const SettingItem = ({ icon, label, value, color = '#3b82f6', action }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            cursor: 'pointer'
        }} onClick={action}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color
                }}>
                    {icon}
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {value && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{value}</span>}
                <ChevronRight size={16} color="var(--text-secondary)" />
            </div>
        </div>
    );

    return (
        <div style={{ padding: '20px 20px 100px 20px' }}>
            <header style={{ marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Link href="/dashboard" style={{ color: 'var(--text-main)' }}><ArrowLeft /></Link>
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Profile</h1>
                </div>

                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                    <div style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        margin: '0 auto 15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                        color: 'white'
                    }}>
                        {userName ? userName.charAt(0).toUpperCase() : 'T'}
                    </div>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Name"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-main)', // uses theme variable
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                            marginBottom: 5,
                            outline: 'none',
                            fontFamily: 'inherit'
                        }}
                    />
                    <div style={{ height: 2, width: 30, background: '#3b82f6', margin: '0 auto 5px', opacity: 0.5, borderRadius: 2 }}></div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Premium Member</p>
                </div>
            </header>

            <section style={{ background: 'var(--surface)', borderRadius: 20, padding: '0 20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <SettingItem
                    icon={theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    label="Appearance"
                    value={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    color="#f59e0b"
                    action={toggleTheme}
                />
                <SettingItem
                    icon={<Globe size={20} />}
                    label="Currency"
                    value={`${currency} (${currency === 'NGN' ? '₦' : '$'})`}
                    action={toggleCurrency}
                />
                <SettingItem
                    icon={<Share2 size={20} />}
                    label="Export Data"
                    value="CSV"
                    color="#10b981"
                    action={() => setShowExportModal(true)}
                />
                <SettingItem
                    icon={<Shield size={20} />}
                    label="Privacy Policy"
                    color="#f59e0b"
                    action={handlePrivacy}
                />

                <div onClick={() => setShowClearModal(true)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    cursor: 'pointer'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            background: 'rgba(239, 68, 68, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ef4444'
                        }}>
                            <Trash2 size={20} />
                        </div>
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                            Clear All Data
                        </span>
                    </div>
                </div>
            </section>

            <p style={{ textAlign: 'center', color: '#334155', marginTop: 40, fontSize: '0.8rem' }}>
                LUMI Tracker v1.0.0
            </p>

            {/* Confirmation Modals */}
            <ConfirmationModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                onConfirm={performExport}
                title="Export Data"
                message="Do you want to export all your transaction history as a CSV file?"
                confirmText="Export CSV"
                confirmColor="#10b981"
            />

            <ConfirmationModal
                isOpen={showClearModal}
                onClose={() => setShowClearModal(false)}
                onConfirm={performClearData}
                title="Clear All Data?"
                message="This action cannot be undone. All your tracked fares and settings will be permanently deleted from this device."
                confirmText="Delete Everything"
                confirmColor="#ef4444"
            />
        </div>
    );
}
