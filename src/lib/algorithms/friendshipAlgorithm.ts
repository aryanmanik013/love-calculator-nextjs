import friendshipResponsesData from '../../data/friendshipResponses.json';
import { FriendshipFormData } from '@/app/friendship-calculator/components/FriendshipForm';
import { DetailedLoveResponse } from './loveAlgorithm'; // Reusing the same response interface

/**
 * Advanced Friendship Compatibility Algorithm
 * Emphasizes long-term harmony and shared vibrational energy.
 */
export function calculateDetailedFriendshipScore(data: FriendshipFormData): DetailedLoveResponse {
    const { name1, name2, age1, age2, zodiac1, zodiac2 } = data;

    const cleanName1 = name1.toLowerCase().replace(/\s/g, '');
    const cleanName2 = name2.toLowerCase().replace(/\s/g, '');

    // Create a consistently deterministic but variable seed based on ALL inputs
    const combinedSeed = cleanName1 + cleanName2 + (age1 || "") + (age2 || "") + (zodiac1 || "") + (zodiac2 || "");

    /**
     * 1. The 'Bond' Score (Hash Randomness)
     * Using a slightly different hashing multiplier for variety from the other algorithms
     */
    let hash = 0;
    for (let i = 0; i < combinedSeed.length; i++) {
        hash = (hash << 7) - hash + combinedSeed.charCodeAt(i);
        hash |= 0;
    }
    const bondScore = Math.abs(hash) % 70; // 0–70

    /**
     * 2. Consonant Harmony Score 
     * (Friendships rely on the 'meat' of the conversation - consonants)
     */
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonantCount = [...combinedSeed].filter((char) => !vowels.includes(char)).length;
    const consonantScore = (consonantCount * 5) % 30; // 0–30

    /**
     * Final Score Calculation
     */
    let finalScore = bondScore + consonantScore;
    if (finalScore > 100) finalScore = finalScore % 100;

    // Floor at 20 because friendship algorithm assumes some level of acquaintance 
    if (finalScore < 20) finalScore += 20;

    return getDetailedFriendshipInterpretation(finalScore);
}

function getDetailedFriendshipInterpretation(score: number): DetailedLoveResponse {
    const responseMatch = friendshipResponsesData.find(res => score <= res.maxScore) || friendshipResponsesData[friendshipResponsesData.length - 1];

    return {
        score,
        title: responseMatch.title,
        message: responseMatch.message,
        advice: responseMatch.advice,
        zodiacTip: responseMatch.zodiacTip
    };
}
