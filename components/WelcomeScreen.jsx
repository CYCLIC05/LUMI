"use client";
import React, { useState, useEffect } from 'react';
import styles from './WelcomeScreen.module.css';

const slides = [
    {
        id: 0,
        title: "Welcome to LUMI",
        desc: "Track your daily transport fares with ease and precision. Never lose track of your commute expenses again.",
        img: "/favicon.svg" // Using svg as placeholder, ideally use specific illustrations
    },
    {
        id: 1,
        title: "Visual Analytics",
        desc: "See exactly where your money goes with beautiful weekly charts and detailed statistics.",
        img: "/favicon.svg" // Replace with chart illustration if available, else logo
    },
    {
        id: 2,
        title: "Stay in Control",
        desc: "Set daily limits, get notifications, and manage your transport budget effectively.",
        img: "/favicon.svg" // Replace with budget/shield icon
    }
];

export default function WelcomeScreen() {
    const [show, setShow] = useState(false); // Default to false until we check localStorage
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Check if user has seen onboarding
        const hasSeenOnboarding = localStorage.getItem('lumi_onboarding_completed');
        if (!hasSeenOnboarding) {
            setShow(true);
        }
    }, []);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            handleComplete();
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        setIsExiting(true);
        localStorage.setItem('lumi_onboarding_completed', 'true');
        setTimeout(() => {
            setShow(false);
        }, 500); // Wait for transition
    };

    if (!show) return null;

    return (
        <div className={`${styles.container} ${isExiting ? styles.hidden : ''}`}>

            <div className={styles.slideContainer} key={currentSlide}>
                <div className={styles.imageContainer}>
                    {/* Using the logo as placeholder illustration for now */}
                    <img src={slides[currentSlide].img} alt="Illustration" className={styles.image} />
                </div>
                <h1 className={styles.title}>{slides[currentSlide].title}</h1>
                <p className={styles.description}>{slides[currentSlide].desc}</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.dots}>
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                        />
                    ))}
                </div>

                <div className={styles.buttons}>
                    {currentSlide < slides.length - 1 ? (
                        <>
                            <button className={styles.skipBtn} onClick={handleSkip}>Skip</button>
                            <button className={styles.nextBtn} onClick={handleNext}>Next</button>
                        </>
                    ) : (
                        <button className={styles.getStartedBtn} onClick={handleComplete}>Get Started</button>
                    )}
                </div>
            </div>
        </div>
    );
}
