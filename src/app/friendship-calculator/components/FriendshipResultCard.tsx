import React, { useEffect, useRef, useState } from 'react';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import { ShareButtons } from '@/components/ShareButtons';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../../love-calculator/components/ResultCard.module.scss'; // Reusing result card styles

interface FriendshipResultCardProps {
    name1: string;
    name2: string;
    result: DetailedLoveResponse;
}

export const FriendshipResultCard: React.FC<FriendshipResultCardProps> = ({ name1, name2, result }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

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
                    colors: ['#FF4D6D', '#FFB3C1', '#ffffff'] // BFF themed colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF4D6D', '#FFB3C1', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [result.score]);

    const handleDownloadPdf = async () => {
        if (!cardRef.current) return;
        setIsDownloading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Friendship_Score_${name1}_${name2}.pdf`);
        } catch (error) {
            console.error('Failed to generate PDF', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className={styles.card} ref={cardRef}>
            <h3 className={styles.names}>
                {name1} 👯‍♀️ {name2}
            </h3>
            <div className={styles.score} style={{ color: '#FF4D6D' }}>
                {result.score}%
            </div>

            <h4 style={{ color: '#FF4D6D', marginBottom: '10px', fontSize: '1.2rem' }}>
                {result.title}
            </h4>

            <p className={styles.interpretation}>
                {result.message}
            </p>

            <div className={styles.advice} style={{ marginTop: '20px', textAlign: 'left', background: 'rgba(255, 77, 109, 0.05)', padding: '15px', borderRadius: '10px' }}>
                <p><strong>💡 Advice:</strong> {result.advice}</p>
                <p style={{ marginTop: '10px' }}><strong>✨ Cosmic Tip:</strong> {result.zodiacTip}</p>
            </div>

            <ShareButtons onDownloadPdf={handleDownloadPdf} />
        </div>
    );
};
