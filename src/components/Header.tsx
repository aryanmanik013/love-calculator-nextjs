import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    {siteConfig.name}<span className={styles.dot}>.</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/love-calculator" className={styles.link}>Love</Link>
                    <Link href="/crush-calculator" className={styles.link}>Crush</Link>
                    <Link href="/friendship-calculator" className={styles.link}>BFF</Link>
                </div>
            </nav>
        </header>
    );
};
