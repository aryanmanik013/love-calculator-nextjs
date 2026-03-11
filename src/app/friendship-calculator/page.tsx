"use client";

import React, { useState, useRef } from 'react';
import { FriendshipForm, FriendshipFormData } from './components/FriendshipForm';
import { FriendshipResultCard } from './components/FriendshipResultCard';
import { Loader } from '@/components/Loader';
import NativeAd from '@/components/NativeAd';
import LeaderboardAd from '@/components/LeaderboardAd';
import SkyscraperAd from '@/components/SkyscraperAd';
import MediumRectangleAd from '@/components/MediumRectangleAd';
import { calculateDetailedFriendshipScore } from '@/lib/algorithms/friendshipAlgorithm';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import styles from '../love-calculator/LoveCalculator.module.scss'; // Reusing main layout styles

export default function FriendshipCalculatorPage() {
    const [resultData, setResultData] = useState<{ name1: string; name2: string; detailedResult: DetailedLoveResponse } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleCalculate = (data: FriendshipFormData) => {
        setIsCalculating(true);
        setResultData(null);
        setShowSuccess(false);

        // Simulate "Calculating" for viral/premium feel
        setTimeout(() => {
            const detailedResult = calculateDetailedFriendshipScore(data);
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
                        <h1 className={styles.title} style={{ color: '#FF4D6D' }}>
                            Friendship Calculator
                        </h1>
                        <p className={styles.subtitle}>
                            How strong is your bond with your BFF? Test your friendship compatibility.
                        </p>
                    </section>

                    {/* Native Ad Unit between intro and form */}
                    <NativeAd />

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
                        <div className={styles.resultContainer} ref={resultsRef}>
                            {showSuccess && (
                                <div className={styles.successMessage} style={{ backgroundColor: 'rgba(255, 77, 109, 0.1)', color: '#FF4D6D', borderColor: '#FF4D6D' }}>
                                    👯‍♀️ Your Friendship Score is ready!
                                </div>
                            )}

                            {/* Ad: Medium Rectangle (300x250) Active Unit */}
                            <MediumRectangleAd />

                            <FriendshipResultCard
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
