import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WishDisplay = ({ text, action }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        // Reset
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'all' });
        gsap.set(el, { opacity: 0, scale: 0.5, y: 0, rotation: 0, color: '#ec4899' }); // Default pink

        // Animation based on action
        switch (action) {
            case 'jump':
                // Bounce in
                gsap.to(el, { opacity: 1, scale: 1.5, duration: 0.5, ease: "bounce.out" });
                gsap.to(el, { y: -50, duration: 0.3, yoyo: true, repeat: 1 });
                break;

            case 'attack1':
            case 'attack2':
                // Strike/Slash effect (Red, fast scale)
                gsap.set(el, { color: '#ef4444', scale: 2, opacity: 0 });
                gsap.to(el, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in" });
                gsap.to(el, { x: 10, duration: 0.05, repeat: 5, yoyo: true }); // Shake
                break;

            case 'climb':
                // Slide up
                gsap.set(el, { y: 50, opacity: 0, color: '#3b82f6' });
                gsap.to(el, { y: -50, opacity: 1, duration: 1, ease: "power1.out" });
                break;

            case 'death':
                // Drop down and fade
                gsap.set(el, { y: -50, opacity: 1, color: '#6b7280' });
                gsap.to(el, { y: 100, opacity: 0, rotation: 45, duration: 1, ease: "bounce.out" });
                break;

            case 'hurt':
                // Shake and flash
                gsap.set(el, { color: '#f59e0b' });
                gsap.to(el, { opacity: 1, scale: 1.2, duration: 0.2 });
                gsap.to(el, { x: 20, duration: 0.1, repeat: 5, yoyo: true });
                break;

            case 'run':
                // Slide in from left
                gsap.set(el, { x: -200, opacity: 0, skewX: -20, color: '#10b981' });
                gsap.to(el, { x: 0, opacity: 1, skewX: 0, duration: 0.5, ease: "back.out" });
                break;

            case 'throw':
                // Fly out arc
                gsap.set(el, { x: 0, y: 0, scale: 0, opacity: 1, color: '#8b5cf6' });
                gsap.to(el, { x: 200, y: -100, scale: 1.5, rotation: 360, duration: 1, ease: "power1.out" });
                gsap.to(el, { opacity: 0, delay: 0.8, duration: 0.2 });
                break;

            case 'walk':
            case 'walkAttack':
                // Typewriter-ish / Fade up
                gsap.set(el, { y: 20, opacity: 0 });
                gsap.to(el, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
                break;

            default: // idle
                // Pulse
                gsap.set(el, { opacity: 0, scale: 0.8 });
                gsap.to(el, { opacity: 1, scale: 1.2, duration: 0.5, yoyo: true, repeat: 1 });
                break;
        }

    }, [text, action]);

    return (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none w-full text-center">
            <h2
                ref={textRef}
                className="text-4xl md:text-6xl font-bold handwriting drop-shadow-lg whitespace-nowrap"
            >
                {text}
            </h2>
        </div>
    );
};

export default WishDisplay;
