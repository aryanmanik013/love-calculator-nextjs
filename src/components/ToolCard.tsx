import React from 'react';
import Link from 'next/link';
import styles from './ToolCard.module.scss';

interface ToolCardProps {
    href: string;
    icon: string;
    title: string;
    description: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ href, icon, title, description }) => {
    return (
        <Link href={href} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.icon}>{icon}</div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};
