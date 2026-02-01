"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PieChart, History, Plus } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className={styles.nav}>
      <Link href="/dashboard" className={`${styles.link} ${isActive('/dashboard') ? styles.active : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      
      <Link href="/stats" className={`${styles.link} ${isActive('/stats') ? styles.active : ''}`}>
        <PieChart size={24} />
        <span>Stats</span>
      </Link>

      <div className={styles.fabContainer}>
        <Link href="/add" className={styles.fab}>
          <Plus size={32} color="white" />
        </Link>
      </div>

      <Link href="/history" className={`${styles.link} ${isActive('/history') ? styles.active : ''}`}>
        <History size={24} />
        <span>History</span>
      </Link>

      <Link href="/profile" className={`${styles.link} ${isActive('/profile') ? styles.active : ''}`}>
        {/* Placeholder for Profile/Settings if needed, or just another tab */}
        <div style={{width: 24, height: 24, borderRadius: '50%', background: '#3b82f6'}}></div>
        <span>Profile</span>
      </Link>
    </nav>
  );
}
