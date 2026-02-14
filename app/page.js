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
        marginBottom: 20,
      }}>
        <img src="/icon.png" alt="LUMI Logo" style={{ width: 180, height: 180, borderRadius: 20, objectFit: 'contain' }} />
      </div>
    </div>
  );
}
