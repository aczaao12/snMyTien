import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BirthdayCard = ({ translations }) => {
    const cardRef = useRef(null);
    const chatBoxRef = useRef(null);
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Chat box entrance - fade in and scale
            gsap.from(chatBoxRef.current, {
                scale: 0,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)"
            });

            // Button entrance
            gsap.from(buttonRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 1.2,
                ease: "power2.out"
            });

        }, cardRef);

        return () => ctx.revert();
    }, []);

    // Typewriter effect for chat messages
    useEffect(() => {
        const fullMessage = `${translations.title}! ${translations.message}`;
        let charIndex = 0;
        setDisplayedText('');

        const typeInterval = setInterval(() => {
            if (charIndex < fullMessage.length) {
                setDisplayedText(fullMessage.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [translations]);

    const spawnParticles = () => {
        if (!buttonRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('fixed', 'w-2', 'h-2', 'rounded-full', 'pointer-events-none', 'z-50');
            const colors = ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-blue-400'];
            particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);

            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;

            gsap.set(particle, { x: centerX, y: centerY, scale: 0 });
            gsap.to(particle, {
                x: centerX + x,
                y: centerY + y,
                scale: Math.random() * 1.5,
                opacity: 0,
                duration: 1 + Math.random(),
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
        spawnParticles();

        gsap.to(buttonRef.current, {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    };

    return (
        <div ref={cardRef} className="relative z-10 w-full max-w-4xl mx-4 flex flex-col items-center justify-center gap-8 px-4">

            {/* Game-style Chat Box */}
            <div ref={chatBoxRef} className="relative w-full max-w-3xl">
                {/* Chat box container */}
                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-4 border-yellow-400/80 shadow-2xl">
                    {/* Corner decorations */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-yellow-300"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-yellow-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-yellow-300"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-yellow-300"></div>

                    {/* Name tag */}
                    <div className="absolute -top-5 left-8 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full border-2 border-yellow-400 shadow-lg">
                        <span className="text-white font-bold text-base handwriting">{translations.name}</span>
                    </div>

                    {/* Message content with handwriting font */}
                    <div className="mt-4 min-h-[200px] flex items-center justify-center">
                        <p className="text-white text-2xl md:text-3xl leading-relaxed font-medium text-center handwriting">
                            {displayedText}
                            <span className="inline-block w-1 h-7 bg-yellow-400 ml-2 animate-pulse"></span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button
                ref={buttonRef}
                onClick={handleOpen}
                className="px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xl shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 active:scale-95 flex items-center gap-3 border-2 border-white/30 handwriting"
            >
                {isOpen ? (
                    <>
                        <span>{translations.buttonWish}</span>
                        <span className="text-3xl">{translations.wishEmoji}</span>
                    </>
                ) : (
                    <>
                        <span>{translations.buttonSend}</span>
                        <span className="text-3xl">{translations.emoji}</span>
                    </>
                )}
            </button>

            {/* Decorative floating elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-10 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
    );
};

export default BirthdayCard;
