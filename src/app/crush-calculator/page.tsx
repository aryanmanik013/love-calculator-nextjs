"use client";

import React, { useState, useRef } from 'react';
import { CrushForm, CrushFormData } from './components/CrushForm';
import { CrushResultCard } from './components/CrushResultCard';
import { Loader } from '@/components/Loader';
import NativeAd from '@/components/NativeAd';
import LeaderboardAd from '@/components/LeaderboardAd';
import SkyscraperAd from '@/components/SkyscraperAd';
import MediumRectangleAd from '@/components/MediumRectangleAd';
import { calculateDetailedCrushScore } from '@/lib/algorithms/crushAlgorithm';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import styles from '../love-calculator/LoveCalculator.module.scss'; // Reusing main layout styles

export default function CrushCalculatorPage() {
    const [resultData, setResultData] = useState<{ name1: string; name2: string; detailedResult: DetailedLoveResponse } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleCalculate = (data: CrushFormData) => {
        setIsCalculating(true);
        setResultData(null);
        setShowSuccess(false);

        // Simulate "Calculating" for viral/premium feel
        setTimeout(() => {
            const detailedResult = calculateDetailedCrushScore(data);
            setResultData({ name1: data.name1, name2: data.name2, detailedResult });
            setIsCalculating(false);
            setShowSuccess(true);

            // Scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }, 2200);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Top Leaderboard Ad */}
            <LeaderboardAd />

            <div className={styles.contentWrapper}>
                <div className={styles.mainContent}>
                    <section className={styles.hero}>
                        <h1 className={styles.title} style={{ color: '#FF6B6B' }}>
                            Crush Calculator
                        </h1>
                        <p className={styles.subtitle}>
                            Does your crush like you back? Find out if there's a spark!
                        </p>
                    </section>

                    {/* Native Ad Unit between intro and form */}
                    <NativeAd />

                    <div className={styles.formContainer}>
                        <CrushForm onCalculate={handleCalculate} />
                    </div>

                    {isCalculating && (
                        <Loader
                            messages={["Scanning mutual interests...", "Analyzing subtle glances...", "Measuring the spark!"]}
                            durationMs={2200}
                            type="crush"
                        />
                    )}

                    {resultData && (
                        <div className={styles.resultContainer} ref={resultsRef}>
                            {showSuccess && (
                                <div className={styles.successMessage} style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)', color: '#FF6B6B', borderColor: '#FF6B6B' }}>
                                    🔥 Your Crush Match result is ready!
                                </div>
                            )}

                            {/* Ad: Medium Rectangle (300x250) Active Unit */}
                            <MediumRectangleAd />

                            <CrushResultCard
                                name1={resultData.name1}
                                name2={resultData.name2}
                                result={resultData.detailedResult}
                            />

                            {/* Ad: Large Rectangle (336x280) placeholder */}
                            <div className={styles.adLargeRectangle}>
                                <span style={{ fontSize: '12px', color: '#999' }}>ADVERTISEMENT</span>
                            </div>
                        </div>
                    )}
                </div>

                <aside className={styles.skyscraperContainer}>
                    <SkyscraperAd />
                </aside>
            </div>

            {/* Bottom Leaderboard Ad */}
            <LeaderboardAd />
        </div>
    );
}
