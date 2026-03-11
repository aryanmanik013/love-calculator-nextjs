"use client";

import React, { useState } from 'react';
import styles from './LoveForm.module.scss';

export interface LoveFormData {
    name1: string;
    name2: string;
    age1?: string;
    age2?: string;
    zodiac1?: string;
    zodiac2?: string;
}

interface LoveFormProps {
    onCalculate: (data: LoveFormData) => void;
}

const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const LoveForm: React.FC<LoveFormProps> = ({ onCalculate }) => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');

    // Optional fields
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [age1, setAge1] = useState('');
    const [age2, setAge2] = useState('');
    const [zodiac1, setZodiac1] = useState('');
    const [zodiac2, setZodiac2] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name1 && name2) {
            onCalculate({
                name1, name2,
                ...(age1 && { age1 }),
                ...(age2 && { age2 }),
                ...(zodiac1 && { zodiac1 }),
                ...(zodiac2 && { zodiac2 }),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Your Name (e.g. Romeo)"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Their Name (e.g. Juliet)"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>

            <button
                type="button"
                className={styles.advancedToggle}
                onClick={() => setShowAdvanced(!showAdvanced)}
            >
                {showAdvanced ? "− Hide Details" : "+ Add Zodiac & Age (Optional)"}
            </button>

            {showAdvanced && (
                <div className={styles.advancedFields}>
                    <div className={styles.row}>
                        <div>
                            <label>Your Age</label>
                            <input type="number" min="13" max="100" placeholder="Optional" value={age1} onChange={(e) => setAge1(e.target.value)} />
                        </div>
                        <div>
                            <label>Their Age</label>
                            <input type="number" min="13" max="100" placeholder="Optional" value={age2} onChange={(e) => setAge2(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Your Zodiac</label>
                            <select value={zodiac1} onChange={(e) => setZodiac1(e.target.value)}>
                                <option value="">Select Sign...</option>
                                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Their Zodiac</label>
                            <select value={zodiac2} onChange={(e) => setZodiac2(e.target.value)}>
                                <option value="">Select Sign...</option>
                                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <button type="submit" className={styles.button}>
                Calculate Love! ✨
            </button>
        </form>
    );
};
