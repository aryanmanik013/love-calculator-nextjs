'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Adsterra Leaderboard Ad (728x90)
 * Note: This ad unit uses a global atOptions variable.
 */
const LeaderboardAd = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;

        // Create the options script
        const atOptions = document.createElement('script');
        atOptions.innerHTML = `
            atOptions = {
                'key' : '17952d935a451cb77de3033782280d0c',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.highperformanceformat.com/17952d935a451cb77de3033782280d0c/invoke.js';
        invokeScript.async = true;

        // Append to the ref
        bannerRef.current.appendChild(atOptions);
        bannerRef.current.appendChild(invokeScript);

        return () => {
            // Clean up scripts if needed, though Adsterra scripts often persist in memory
            if (bannerRef.current) {
                bannerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div
            style={{
                margin: '20px 0',
                textAlign: 'center',
                minHeight: '90px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
            ref={bannerRef}
        >
            {/* The ad will be injected here */}
        </div>
    );
};

export default LeaderboardAd;
