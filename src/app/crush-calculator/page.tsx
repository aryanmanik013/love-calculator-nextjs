"use client";

import React, { useState } from 'react';
import { CrushForm, CrushFormData } from './components/CrushForm';
import { CrushResultCard } from './components/CrushResultCard';
import { Loader } from '@/components/Loader';
import { calculateDetailedCrushScore } from '@/lib/algorithms/crushAlgorithm';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import styles from '../love-calculator/LoveCalculator.module.scss'; // Reusing main layout styles

export default function CrushCalculatorPage() {
    const [resultData, setResultData] = useState<{ name1: string; name2: string; detailedResult: DetailedLoveResponse } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleCalculate = (data: CrushFormData) => {
        setIsCalculating(true);
        setResultData(null);

        // Simulate "Calculating" for viral/premium feel
        setTimeout(() => {
            const detailedResult = calculateDetailedCrushScore(data);
            setResultData({ name1: data.name1, name2: data.name2, detailedResult });
            setIsCalculating(false);
        }, 2200);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Ad: Leaderboard (728x90) directly below header */}
            <div className={styles.adLeaderboard}>
                <span>Leaderboard Ad (728x90)</span>
            </div>

            <section className={styles.hero}>
                <h1 className={styles.title} style={{ color: '#FF6B6B' }}>
                    Crush Calculator
                </h1>
                <p className={styles.subtitle}>
                    Does your crush like you back? Find out if there's a spark!
                </p>
            </section>

            {/* Ad: Responsive Display between intro and form */}
            <div className={styles.adResponsive}>
                <span>Responsive Display Ad</span>
            </div>

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
                <div className={styles.resultContainer}>
                    {/* Ad: Medium Rectangle (300x250) below form, above results */}
                    <div className={styles.adMediumRectangle}>
                        <span>Medium Rectangle (300x250)</span>
                    </div>

                    <CrushResultCard
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
