import loveResponsesData from '../../data/loveResponses.json';

export interface LoveFormData {
    name1: string;
    name2: string;
    age1?: string;
    age2?: string;
    zodiac1?: string;
    zodiac2?: string;
}

export interface DetailedLoveResponse {
    score: number;
    title: string;
    message: string;
    advice: string;
    zodiacTip: string;
}

/**
 * Advanced Love Compatibility Algorithm
 * Deterministic: Same names/inputs will always generate the same result.
 */
export function calculateDetailedLoveScore(data: LoveFormData): DetailedLoveResponse {
    const { name1, name2, age1, age2, zodiac1, zodiac2 } = data;

    const cleanName1 = name1.toLowerCase().replace(/\s/g, '');
    const cleanName2 = name2.toLowerCase().replace(/\s/g, '');

    // Create a consistently deterministic but variable seed based on ALL inputs
    const combinedSeed = cleanName1 + cleanName2 + (age1 || "") + (age2 || "") + (zodiac1 || "") + (zodiac2 || "");

    /**
     * 1. Character Energy Score
     */
    let asciiSum = 0;
    for (let i = 0; i < combinedSeed.length; i++) {
        asciiSum += combinedSeed.charCodeAt(i);
    }
    const asciiScore = asciiSum % 30; // 0–30

    /**
     * 2. Vowel Harmony Score
     */
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelCount = [...combinedSeed].filter((char) => vowels.includes(char)).length;
    const vowelScore = (vowelCount * 7) % 20; // 0–20

    /**
     * 3. Similarity & Hash Randomness
     */
    let hash = 0;
    for (let i = 0; i < combinedSeed.length; i++) {
        hash = (hash << 5) - hash + combinedSeed.charCodeAt(i);
        hash |= 0;
    }
    const randomnessScore = Math.abs(hash) % 50; // 0–50

    /**
     * Final Score Calculation
     */
    let finalScore = asciiScore + vowelScore + randomnessScore;
    if (finalScore > 100) finalScore = finalScore % 100;

    return getDetailedInterpretation(finalScore);
}

function getDetailedInterpretation(score: number): DetailedLoveResponse {
    // loveResponsesData is already sorted by maxScore logically from the JSON
    const responseMatch = loveResponsesData.find(res => score <= res.maxScore) || loveResponsesData[loveResponsesData.length - 1];

    return {
        score,
        title: responseMatch.title,
        message: responseMatch.message,
        advice: responseMatch.advice,
        zodiacTip: responseMatch.zodiacTip
    };
}
