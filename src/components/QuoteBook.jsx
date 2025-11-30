import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { quotes } from '../data/quotes';

const QuoteBook = ({ autoAdvance = true }) => {
    const bookRef = useRef(null);
    // Pick a random quote initially
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
    const [displayedText, setDisplayedText] = useState('');
    const [displayedAuthor, setDisplayedAuthor] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const currentQuote = quotes[currentQuoteIndex];

    // Typewriter effect for quote text
    useEffect(() => {
        setIsTyping(true);
        let charIndex = 0;
        setDisplayedText('');
        setDisplayedAuthor('');

        const typeInterval = setInterval(() => {
            if (charIndex < currentQuote.text.length) {
                setDisplayedText(currentQuote.text.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                // Start typing author after text is done
                setTimeout(() => {
                    let authorIndex = 0;
                    const authorInterval = setInterval(() => {
                        if (authorIndex < currentQuote.author.length) {
                            setDisplayedAuthor(currentQuote.author.substring(0, authorIndex + 1));
                            authorIndex++;
                        } else {
                            clearInterval(authorInterval);
                            setIsTyping(false);
                        }
                    }, 60);
                }, 500);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [currentQuote]);

    // Page turn animation
    const turnPage = (direction) => {
        if (isTyping) return;

        const newIndex = direction === 'next'
            ? (currentQuoteIndex + 1) % quotes.length
            : (currentQuoteIndex - 1 + quotes.length) % quotes.length;

        // Fade out animation
        gsap.to(bookRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setCurrentQuoteIndex(newIndex);
                // Fade in animation
                gsap.to(bookRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    };

    // Auto advance every 15 seconds
    useEffect(() => {
        if (!autoAdvance) return; // Skip if autoAdvance is false

        const advanceTimer = setInterval(() => {
            if (!isTyping) {
                turnPage('next');
            }
        }, 15000);

        return () => clearInterval(advanceTimer);
    }, [currentQuoteIndex, isTyping, autoAdvance]);

    // Category color mapping
    const getCategoryColor = (category) => {
        const colors = {
            classic: 'from-amber-400 to-orange-500',
            philosophy: 'from-purple-400 to-indigo-500',
            literary: 'from-pink-400 to-rose-500',
            wisdom: 'from-emerald-400 to-teal-500',
            inspirational: 'from-blue-400 to-cyan-500'
        };
        return colors[category] || 'from-gray-400 to-gray-500';
    };

    return (
        <div className="relative w-full max-w-4xl mx-4">
            {/* Book Container */}
            <div
                ref={bookRef}
                className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 md:p-16 shadow-2xl border-4 border-amber-900/20"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a574\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}
            >
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-900/30"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-900/30"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-900/30"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-900/30"></div>

                {/* Category Badge */}
                <div className="flex justify-center mb-8">
                    <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(currentQuote.category)} shadow-lg`}>
                        <span className="text-white text-sm font-semibold uppercase tracking-wider">
                            {currentQuote.category}
                        </span>
                    </div>
                </div>

                {/* Quote Text */}
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center px-4">
                    <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-800 handwriting mb-8">
                        "{displayedText}
                        {isTyping && displayedAuthor === '' && (
                            <span className="inline-block w-1 h-8 bg-amber-600 ml-2 animate-pulse"></span>
                        )}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
                        <p className="text-xl md:text-2xl text-amber-900 italic font-serif">
                            {displayedAuthor}
                            {isTyping && displayedAuthor !== '' && (
                                <span className="inline-block w-1 h-6 bg-amber-600 ml-2 animate-pulse"></span>
                            )}
                        </p>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
                    </div>
                </div>

                {/* Page Number */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-amber-900/50 text-sm font-serif">
                        {currentQuoteIndex + 1} / {quotes.length}
                    </span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 px-4">
                <button
                    onClick={() => turnPage('prev')}
                    disabled={isTyping}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="handwriting">Trang trước</span>
                </button>

                <button
                    onClick={() => turnPage('next')}
                    disabled={isTyping}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="handwriting">Trang sau</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 w-full bg-amber-200/30 rounded-full h-2 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuoteIndex + 1) / quotes.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default QuoteBook;
