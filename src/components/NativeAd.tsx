'use client';

import React, { useEffect } from 'react';

const NativeAd = () => {
    useEffect(() => {
        const adContainer = document.getElementById('container-dcf481b044d30142901dae959328c9fc');
        if (!adContainer) return;

        // Create the script element
        const script = document.createElement('script');
        script.src = 'https://pl28896884.effectivegatecpm.com/dcf481b044d30142901dae959328c9fc/invoke.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');

        // Append to the ad container directly
        adContainer.appendChild(script);

        return () => {
            if (adContainer.contains(script)) {
                adContainer.removeChild(script);
            }
        };
    }, []);

    return (
        <div style={{ margin: '32px 0', minHeight: '100px', textAlign: 'center' }}>
            <div id="container-dcf481b044d30142901dae959328c9fc"></div>
        </div>
    );
};

export default NativeAd;
