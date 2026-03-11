"use client";

import React, { useState } from 'react';
import styles from './ShareButtons.module.scss';
import { siteConfig } from '@/config/site';

interface ShareButtonsProps {
    onDownloadPdf?: () => void;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ onDownloadPdf }) => {

    return (
        <div className={styles.shareContainer} data-html2canvas-ignore="true">
            <p>Save your results! 📱</p>
            <div className={styles.buttonGroup}>
                {onDownloadPdf && (
                    <button onClick={onDownloadPdf} className={`${styles.shareButton} ${styles.copy}`}>
                        Download PDF
                    </button>
                )}
            </div>
        </div>
    );
};
