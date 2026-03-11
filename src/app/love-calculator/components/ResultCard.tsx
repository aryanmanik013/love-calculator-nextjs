import React, { useEffect, useRef, useState } from 'react';
import { DetailedLoveResponse } from '@/lib/algorithms/loveAlgorithm';
import { ShareButtons } from '@/components/ShareButtons';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './ResultCard.module.scss';

interface ResultCardProps {
    name1: string;
    name2: string;
    result: DetailedLoveResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ name1, name2, result }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (result.score >= 80) {
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff0000', '#ff6b6b', '#ffb3c1']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff0000', '#ff6b6b', '#ffb3c1']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [result.score]);

    const shareText = `I just got a ${result.score}% Love Compatibility score with ${name2}! (${result.title})`;

    const handleDownloadPdf = async () => {
        if (!cardRef.current) return;
        setIsDownloading(true);

        try {
            // Need a tiny delay for React state (if any) to apply before capture
            await new Promise(resolve => setTimeout(resolve, 100));
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/png');

            // Calculate PDF dimensions
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Love_Compatibility_${name1}_${name2}.pdf`);
        } catch (error) {
            console.error('Failed to generate PDF', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className={styles.card} ref={cardRef}>
            <h3 className={styles.names}>
                {name1} ❤️ {name2}
            </h3>
            <div className={styles.score}>
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

            <ShareButtons
                onDownloadPdf={handleDownloadPdf}
            />
        </div>
    );
};
