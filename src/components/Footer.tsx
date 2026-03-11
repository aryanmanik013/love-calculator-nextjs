import React from 'react';
import styles from './Footer.module.scss';

import { siteConfig } from '@/config/site';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} {siteConfig.name} - Made for Fun & Sharing</p>
        </footer>
    );
};
