"use client";
import { useEffect, useState } from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", confirmColor = "#3b82f6" }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            // Delay unmounting for fade-out effect if needed, but for now simple conditional rendering
            setVisible(false);
        }
    }, [isOpen]);

    if (!isOpen && !visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--surface, #1e293b)', // Fallback if var not ready
                borderRadius: '20px',
                padding: '25px',
                width: '100%',
                maxWidth: '350px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                animation: 'modalSlideIn 0.3s ease-out'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--text-main, white)'
                }}>{title}</h3>

                <p style={{
                    marginBottom: '25px',
                    color: 'var(--text-muted, #94a3b8)',
                    lineHeight: '1.5',
                    fontSize: '0.95rem'
                }}>{message}</p>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'var(--background, #0f172a)',
                            color: 'var(--text-secondary, #cbd5e1)',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: confirmColor,
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            boxShadow: `0 4px 12px ${confirmColor}40`
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
