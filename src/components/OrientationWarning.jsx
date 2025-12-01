import React, { useEffect, useState } from 'react';

const OrientationWarning = () => {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Check if mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                // Check if portrait mode
                const isPortrait = window.innerHeight > window.innerWidth;
                setShowWarning(isPortrait);
            } else {
                setShowWarning(false);
            }
        };

        // Check on mount
        checkOrientation();

        // Listen for orientation changes
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!showWarning) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
            <div className="text-center px-8">
                <div className="text-8xl mb-8 animate-bounce">
                    📱 → 🔄
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white handwriting mb-4">
                    Xin vui lòng xoay ngang điện thoại
                </h2>
                <p className="text-xl text-white/80">
                    Để có trải nghiệm tốt nhất
                </p>
            </div>
        </div>
    );
};

export default OrientationWarning;
