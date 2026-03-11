'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Adsterra Medium Rectangle Ad (300x250)
 * Highly effective placement, usually placed within content or near result areas.
 */
const MediumRectangleAd = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!adRef.current) return;

        // Create the options script
        const atOptions = document.createElement('script');
        atOptions.innerHTML = `
            atOptions = {
                'key' : 'b0e6ce1cdf0e2c7f7f983f0ff4ecba8b',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
            };
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.highperformanceformat.com/b0e6ce1cdf0e2c7f7f983f0ff4ecba8b/invoke.js';
        invokeScript.async = true;

        // Append to the ref
        adRef.current.appendChild(atOptions);
        adRef.current.appendChild(invokeScript);

        return () => {
            if (adRef.current) {
                adRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div
            style={{
                width: '300px',
                height: '250px',
                margin: '20px auto',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.05)'
            }}
            ref={adRef}
        >
            {/* The 300x250 ad will be injected here */}
        </div>
    );
};

export default MediumRectangleAd;
