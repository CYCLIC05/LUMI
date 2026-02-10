"use client";
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Splash() {
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fade out after 4 seconds (so it finishes by 5s)
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 4000);

    // Redirect after 5 seconds total
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  /**
   * Splash Screen Component
   * Displays the branding and automatically redirects to the dashboard.
   * Uses inline styles for self-contained simplicity.
   */
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(180deg, #050511 0%, #1a1a2e 100%)',
      paddingBottom: '80px',
      opacity: opacity,
      transition: 'opacity 1s ease-in-out' // 1 second fade duration
    }}>
      {/* Logo Container */}
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
    </div>
  );
}
