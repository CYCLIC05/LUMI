"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AnimatedWelcome() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #050511 0%, #0f0f1e 50%, #1a1a2e 100%)',
            padding: '20px',
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                {/* Logo */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #4F75FF 0%, #2E5BFF 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 60px rgba(79, 117, 255, 0.4)',
                    }}
                >
                    <span style={{
                        fontSize: '64px',
                        fontWeight: '700',
                        color: 'white',
                    }}>L</span>
                </motion.div>

                {/* App Name */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: 0,
                        color: 'white',
                        letterSpacing: '2px'
                    }}
                >
                    LUMI
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        margin: 0,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontWeight: '500'
                    }}
                >
                    DAILY FARE TRACKER
                </motion.p>
            </motion.div>
        </div>
    );
}
