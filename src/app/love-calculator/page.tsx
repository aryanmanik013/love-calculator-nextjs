"use client";

import React, { useState } from 'react';
import { LoveForm, LoveFormData } from './components/LoveForm';
import { ResultCard } from './components/ResultCard';
import { Loader } from '@/components/Loader';
import { calculateDetailedLoveScore, DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import styles from './LoveCalculator.module.scss';

export default function LoveCalculatorPage() {
    const [resultData, setResultData] = useState<{ name1: string; name2: string; detailedResult: DetailedLoveResponse } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleCalculate = (data: LoveFormData) => {
        setIsCalculating(true);
        setResultData(null);

        // Simulate "Calculating" for viral/premium feel
        setTimeout(() => {
            const detailedResult = calculateDetailedLoveScore(data);
            setResultData({ name1: data.name1, name2: data.name2, detailedResult });
            setIsCalculating(false);
        }, 2500);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Ad: Leaderboard (728x90) directly below header */}
            <div className={styles.adLeaderboard}>
                <span>Leaderboard Ad (728x90)</span>
            </div>

            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Love Calculator
                </h1>
                <p className={styles.subtitle}>
                    Discover your true compatibility. Enter two names and let the universe decide.
                </p>
            </section>

            {/* Ad: Responsive Display between intro and form */}
            <div className={styles.adResponsive}>
                <span>Responsive Display Ad</span>
            </div>

            <div className={styles.formContainer}>
                <LoveForm onCalculate={handleCalculate} />
            </div>

            {isCalculating && (
                <Loader
                    messages={["Analyzing cosmic chemistry...", "Checking planetary alignment...", "Finalizing true compatibility..."]}
                    durationMs={2500}
                    type="love"
                />
            )}

            {resultData && (
                <div className={styles.resultContainer}>
                    {/* Ad: Medium Rectangle (300x250) below form, above results */}
                    <div className={styles.adMediumRectangle}>
                        <span>Medium Rectangle (300x250)</span>
                    </div>

                    <ResultCard
                        name1={resultData.name1}
                        name2={resultData.name2}
                        result={resultData.detailedResult}
                    />

                    {/* Ad: Large Rectangle (336x280) after results */}
                    <div className={styles.adLargeRectangle}>
                        <span>Large Rectangle (336x280)</span>
                    </div>
                </div>
            )}

            {/* Ad: Bottom Leaderboard (728x90) before footer */}
            <div style={{ marginTop: '60px' }} className={styles.adLeaderboard}>
                <span>Bottom Leaderboard Ad (728x90)</span>
            </div>
        </div>
    );
}
