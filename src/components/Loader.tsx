import React, { useState, useEffect } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    messages: string[];
    durationMs: number;
    type: 'love' | 'crush' | 'friendship';
}

export const Loader: React.FC<LoaderProps> = ({ messages, durationMs, type }) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Handle message cycling
        const messageIntervalMs = durationMs / messages.length;
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
        }, messageIntervalMs);

        // Handle progress bar filling smoothly
        const progressSteps = 50; // Update 50 times during the duration
        const stepTime = durationMs / progressSteps;
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            currentStep++;
            setProgress((currentStep / progressSteps) * 100);
            if (currentStep >= progressSteps) {
                clearInterval(progressInterval);
            }
        }, stepTime);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, [messages, durationMs]);

    let spinnerClass = styles.spinnerLove;
    if (type === 'crush') spinnerClass = styles.spinnerCrush;
    if (type === 'friendship') spinnerClass = styles.spinnerFriendship;

    return (
        <div className={styles.loaderContainer}>
            <div className={`${styles.spinner} ${spinnerClass}`}></div>
            <p className={styles.message}>{messages[messageIndex]}</p>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};
