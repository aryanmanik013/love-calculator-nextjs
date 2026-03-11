"use client";

import React, { useState, useEffect } from 'react';
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
    initialData?: Partial<LoveFormData>;
}

const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const LoveForm: React.FC<LoveFormProps> = ({ onCalculate, initialData }) => {
    const [name1, setName1] = useState(initialData?.name1 || '');
    const [name2, setName2] = useState(initialData?.name2 || '');

    // Optional fields
    const [showAdvanced, setShowAdvanced] = useState(!!(initialData?.age1 || initialData?.age2 || initialData?.zodiac1 || initialData?.zodiac2));
    const [age1, setAge1] = useState(initialData?.age1 || '');
    const [age2, setAge2] = useState(initialData?.age2 || '');
    const [zodiac1, setZodiac1] = useState(initialData?.zodiac1 || '');
    const [zodiac2, setZodiac2] = useState(initialData?.zodiac2 || '');

    // Sync state if initialData is provided later (e.g. from URL params on mount)
    useEffect(() => {
        if (initialData) {
            if (initialData.name1) setName1(initialData.name1);
            if (initialData.name2) setName2(initialData.name2);
            if (initialData.age1) setAge1(initialData.age1);
            if (initialData.age2) setAge2(initialData.age2);
            if (initialData.zodiac1) setZodiac1(initialData.zodiac1);
            if (initialData.zodiac2) setZodiac2(initialData.zodiac2);
            if (initialData.age1 || initialData.age2 || initialData.zodiac1 || initialData.zodiac2) {
                setShowAdvanced(true);
            }
        }
    }, [initialData]);

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
