import React, { useEffect } from 'react';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import { ShareButtons } from '@/components/ShareButtons';
import confetti from 'canvas-confetti';
import styles from '../../love-calculator/components/ResultCard.module.scss'; // Reusing result card styles

interface CrushResultCardProps {
    name1: string;
    name2: string;
    result: DetailedLoveResponse;
}

export const CrushResultCard: React.FC<CrushResultCardProps> = ({ name1, name2, result }) => {

    useEffect(() => {
        if (result.score >= 80) {
            const duration = 2 * 1000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF6B6B', '#FF8E53', '#ffffff'] // Crush themed colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF6B6B', '#FF8E53', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [result.score]);

    const shareText = `I just got a ${result.score}% Crush Match with ${name2}! (${result.title})`;

    return (
        <div className={styles.card}>
            <h3 className={styles.names}>
                {name1} 😍 {name2}
            </h3>
            <div className={styles.score} style={{ color: '#FF6B6B' }}>
                {result.score}%
            </div>

            <h4 style={{ color: '#FF6B6B', marginBottom: '10px', fontSize: '1.2rem' }}>
                {result.title}
            </h4>

            <p className={styles.interpretation}>
                {result.message}
            </p>

            <div className={styles.advice} style={{ marginTop: '20px', textAlign: 'left', background: 'rgba(255, 107, 107, 0.05)', padding: '15px', borderRadius: '10px' }}>
                <p><strong>💡 Advice:</strong> {result.advice}</p>
                <p style={{ marginTop: '10px' }}><strong>✨ Cosmic Tip:</strong> {result.zodiacTip}</p>
            </div>

            <ShareButtons title="Crush Match" text={shareText} />
        </div>
    );
};
