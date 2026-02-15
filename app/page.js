"use client";

import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #050511 0%, #0f0f1e 50%, #1a1a2e 100%)',
      padding: '60px 20px 40px 20px',
    }}>
      {/* Logo and Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        {/* Logo */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #4F75FF 0%, #2E5BFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(79, 117, 255, 0.4)',
        }}>
          <span style={{
            fontSize: '64px',
            fontWeight: '700',
            color: 'white',
          }}>L</span>
        </div>

        {/* App Name */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          margin: 0,
          color: 'white',
          letterSpacing: '2px'
        }}>LUMI</h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '0.9rem',
          color: '#94a3b8',
          margin: 0,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: '500'
        }}>DAILY FARE TRACKER</p>
      </div>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(135deg, #4F75FF 0%, #2E5BFF 100%)',
          color: 'white',
          padding: '18px 32px',
          borderRadius: '20px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.05rem',
          boxShadow: '0 12px 32px rgba(79, 117, 255, 0.4)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 16px 40px rgba(79, 117, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 12px 32px rgba(79, 117, 255, 0.4)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'translateY(-2px)';
        }}
      >
        Get Started
      </button>
    </div>
  );
}
