'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Adsterra Wide Skyscraper Ad (160x600)
 * Best placed in sidebars or sticky on the sides of the page.
 */
const SkyscraperAd = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!adRef.current) return;

        // Create the options script
        const atOptions = document.createElement('script');
        atOptions.innerHTML = `
            atOptions = {
                'key' : 'e9a0db9cdd8b11027cba814ae8a03617',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
            };
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.highperformanceformat.com/e9a0db9cdd8b11027cba814ae8a03617/invoke.js';
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
                width: '160px',
                height: '600px',
                margin: '0 auto',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
            ref={adRef}
        >
            {/* The 160x600 ad will be injected here */}
        </div>
    );
};

export default SkyscraperAd;
