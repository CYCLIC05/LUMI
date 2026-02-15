"use client";
import React, { useState, useEffect } from 'react';
import styles from './WelcomeScreen.module.css';

export default function WelcomeScreen() {
    const [show, setShow] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // Show for 3 seconds then fade out
        const timer = setTimeout(() => {
            setFading(true);
            setTimeout(() => {
                setShow(false);
            }, 500); // Wait for transition
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className={`${styles.container} ${fading ? styles.hidden : ''}`}>
            <div className={styles.splashContent}>
                <div className={styles.logoContainer}>
                    <img src="/icon.png" alt="Lumi Logo" className={styles.logo} />
                </div>
                <h1 className={styles.appName}>LUMI</h1>
                <p className={styles.tagline}>Your Daily Fare Companion</p>
                <div className={styles.loadingBar}>
                    <div className={styles.loadingProgress}></div>
                </div>
            </div>
        </div>
    );
}
