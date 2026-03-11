"use client";

import React, { useState } from 'react';
import { FriendshipForm, FriendshipFormData } from './components/FriendshipForm';
import { FriendshipResultCard } from './components/FriendshipResultCard';
import { Loader } from '@/components/Loader';
import { calculateDetailedFriendshipScore } from '@/lib/algorithms/friendshipAlgorithm';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import styles from '../love-calculator/LoveCalculator.module.scss'; // Reusing main layout styles

export default function FriendshipCalculatorPage() {
    const [resultData, setResultData] = useState<{ name1: string; name2: string; detailedResult: DetailedLoveResponse } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleCalculate = (data: FriendshipFormData) => {
        setIsCalculating(true);
        setResultData(null);

        // Simulate "Calculating" for viral/premium feel
        setTimeout(() => {
            const detailedResult = calculateDetailedFriendshipScore(data);
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
                <h1 className={styles.title} style={{ color: '#FF4D6D' }}>
                    Friendship Calculator
                </h1>
                <p className={styles.subtitle}>
                    How strong is your bond with your BFF? Test your friendship compatibility.
                </p>
            </section>

            {/* Ad: Responsive Display between intro and form */}
            <div className={styles.adResponsive}>
                <span>Responsive Display Ad</span>
            </div>

            <div className={styles.formContainer}>
                <FriendshipForm onCalculate={handleCalculate} />
            </div>

            {isCalculating && (
                <Loader
                    messages={["Reviewing inside jokes...", "Calculating trust levels...", "Evaluating BFF status..."]}
                    durationMs={2200}
                    type="friendship"
                />
            )}

            {resultData && (
                <div className={styles.resultContainer}>
                    {/* Ad: Medium Rectangle (300x250) below form, above results */}
                    <div className={styles.adMediumRectangle}>
                        <span>Medium Rectangle (300x250)</span>
                    </div>

                    <FriendshipResultCard
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
