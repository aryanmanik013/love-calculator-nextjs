import React from 'react';
import { ToolCard } from '@/components/ToolCard';
import { siteConfig } from '@/config/site';
import NativeAd from '@/components/NativeAd';
import LeaderboardAd from '@/components/LeaderboardAd';
import styles from './Home.module.scss';

export default function Home() {
    return (
        <div className={styles.home}>
            {/* Top Leaderboard Ad */}
            <LeaderboardAd />

            <h1 className={styles.title}>
                Welcome to {siteConfig.name} 💖
            </h1>
            <p className={styles.subtitle}>
                Discover your compatibility, analyze your crush, and test your friendships.
            </p>

            <div className={styles.grid}>
                <ToolCard
                    href="/love-calculator"
                    icon="❤️"
                    title="Love Calculator"
                    description="Test your romantic compatibility."
                />
                <ToolCard
                    href="/crush-calculator"
                    icon="😍"
                    title="Crush Calculator"
                    description="Does your crush like you back?"
                />
                <ToolCard
                    href="/friendship-calculator"
                    icon="👯‍♀️"
                    title="BFF Test"
                    description="How strong is your friendship?"
                />
            </div>

            {/* Native Ad Unit below the tool grid */}
            <NativeAd />

            {/* Bottom Leaderboard Ad */}
            <LeaderboardAd />
        </div>
    );
}
