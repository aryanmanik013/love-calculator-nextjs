"use client";

import React, { useState } from 'react';
import styles from './ShareButtons.module.scss';
import { siteConfig } from '@/config/site';

interface ShareButtonsProps {
    title: string;
    text: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text }) => {
    const [copied, setCopied] = useState(false);

    // In a real app, you'd use window.location.href, but fallback to siteConfig if SSR
    const url = typeof window !== 'undefined' ? window.location.href : siteConfig.url;

    const fullText = `${text} Check yours at LoveToolsHub!`;

    const handleWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText + " " + url)}`, '_blank');
    };

    const handleTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${fullText} ${url}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className={styles.shareContainer}>
            <p>Tell your friends! 📱</p>
            <div className={styles.buttonGroup}>
                <button onClick={handleWhatsApp} className={`${styles.shareButton} ${styles.whatsapp}`}>
                    WhatsApp
                </button>
                <button onClick={handleTwitter} className={`${styles.shareButton} ${styles.twitter}`}>
                    Tweet Result
                </button>
                <button onClick={handleCopy} className={`${styles.shareButton} ${styles.copy}`}>
                    {copied ? "Copied!" : "Copy Link"}
                </button>
            </div>
        </div>
    );
};
