import crushResponsesData from '../../data/crushResponses.json';
import { CrushFormData } from '@/app/crush-calculator/components/CrushForm';
import { DetailedLoveResponse } from './loveAlgorithm';

/**
 * Advanced Crush Compatibility Algorithm
 * Emphasizes initial spark and mutual attraction markers.
 */
export function calculateDetailedCrushScore(data: CrushFormData): DetailedLoveResponse {
    const { name1, name2, age1, age2, zodiac1, zodiac2 } = data;

    const cleanName1 = name1.toLowerCase().replace(/\s/g, '');
    const cleanName2 = name2.toLowerCase().replace(/\s/g, '');
    const combinedSeed = cleanName1 + cleanName2 + (age1 || "") + (age2 || "") + (zodiac1 || "") + (zodiac2 || "");

    /**
     * 1. The 'Spark' Score (Hash Randomness heavily weighted)
     */
    let hash = 0;
    for (let i = combinedSeed.length - 1; i >= 0; i--) { // Reverse hash for variation
        hash = (hash << 5) - hash + combinedSeed.charCodeAt(i);
        hash |= 0;
    }
    const sparkScore = Math.abs(hash) % 70; // 0–70

    /**
     * 2. Vowel Intrigue Score
     */
    const vowels = ['e', 'i', 'o'];
    const vowelCount = [...combinedSeed].filter((char) => vowels.includes(char)).length;
    const vowelScore = (vowelCount * 11) % 30; // 0–30

    let finalScore = sparkScore + vowelScore;
    if (finalScore > 100) finalScore = finalScore % 100;
    // Floor at 15 for feeling good
    if (finalScore < 15) finalScore += 15;

    return getDetailedCrushInterpretation(finalScore);
}

function getDetailedCrushInterpretation(score: number): DetailedLoveResponse {
    const responseMatch = crushResponsesData.find(res => score <= res.maxScore) || crushResponsesData[crushResponsesData.length - 1];

    return {
        score,
        title: responseMatch.title,
        message: responseMatch.message,
        advice: responseMatch.advice,
        zodiacTip: responseMatch.zodiacTip
    };
}
