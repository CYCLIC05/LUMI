"use client";
import Link from 'next/link';

export default function Splash() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(180deg, #050511 0%, #1a1a2e 100%)',
      paddingBottom: '80px' // offset nav if visible, though splash usually hides nav
    }}>
      <div style={{
        width: 100, height: 100,
        background: '#3b82f6',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
      }}>
        <h1 style={{ fontSize: 60, color: 'white', margin: 0 }}>L</h1>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 10 }}>LUMI</h2>
      <p style={{ color: '#94a3b8', marginBottom: 60, letterSpacing: 2 }}>YOUR DAILY FARE COMPANION</p>

      <Link href="/dashboard" className="btn-primary" style={{ width: '80%', textAlign: 'center', textDecoration: 'none' }}>
        Get Started
      </Link>
    </div>
  );
}
