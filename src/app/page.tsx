import React from 'react';
import { ToolCard } from '@/components/ToolCard';
import { siteConfig } from '@/config/site';
import styles from './Home.module.scss';

export default function Home() {
    return (
        <div className={styles.home}>
            {/* Ad: Leaderboard (728x90) directly below header */}
            <div className={styles.adLeaderboard}>
                <span>Leaderboard Ad (728x90)</span>
            </div>

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

            {/* Ad: Multiplex Ad unit below the tool grid */}
            <div className={styles.adMultiplex}>
                <span>Multiplex Ad Unit (Content Recommendations)</span>
            </div>

            {/* Ad: Bottom Leaderboard (728x90) before footer */}
            <div style={{ marginTop: '60px' }} className={styles.adLeaderboard}>
                <span>Bottom Leaderboard Ad (728x90)</span>
            </div>
        </div>
    );
}
