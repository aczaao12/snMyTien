import React, { useEffect, useRef, useState } from 'react';
import musicFile from '../assets/music.mp3';
import gsap from 'gsap';

const MusicPlayer = ({ isPlaying, onSeek, onTimeUpdate }) => {
    const audioRef = useRef(null);
    const discRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
    const [actuallyPlaying, setActuallyPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying && !actuallyPlaying) {
            audioRef.current.play()
                .then(() => {
                    setNeedsUserInteraction(false);
                    setActuallyPlaying(true);
                    // Spin animation
                    gsap.to(discRef.current, {
                        rotation: 360,
                        duration: 2,
                        repeat: -1,
                        ease: "linear"
                    });
                })
                .catch(e => {
                    console.log("Audio play failed (autoplay policy):", e);
                    setNeedsUserInteraction(true);
                });
        } else if (!isPlaying) {
            audioRef.current.pause();
            setActuallyPlaying(false);
            gsap.killTweensOf(discRef.current);
        }
    }, [isPlaying]);

    const handleUserPlay = () => {
        audioRef.current.play()
            .then(() => {
                setNeedsUserInteraction(false);
                setActuallyPlaying(true);
                // Spin animation
                gsap.to(discRef.current, {
                    rotation: 360,
                    duration: 2,
                    repeat: -1,
                    ease: "linear"
                });
            })
            .catch(e => console.log("Manual play failed:", e));
    };

    const handleTimeUpdate = () => {
        const curr = audioRef.current.currentTime;
        setCurrentTime(curr);
        if (onTimeUpdate) onTimeUpdate(curr);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
        if (onSeek) onSeek(time);
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <>
            {/* Play Button Overlay when user interaction needed */}
            {needsUserInteraction && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
                        <div className="text-6xl mb-4">🎵</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Nhấn để phát nhạc
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Trình duyệt yêu cầu bạn tương tác để phát nhạc
                        </p>
                        <button
                            onClick={handleUserPlay}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                        >
                            ▶ Phát Nhạc
                        </button>
                    </div>
                </div>
            )}

            <div
                className={`fixed bottom-4 left-4 z-50 flex items-center gap-4 transition-all duration-300 ${isExpanded ? 'bg-white/90 p-4 rounded-2xl shadow-2xl backdrop-blur-sm pr-6' : ''}`}
            >
                {/* Spinning Disc */}
                <div
                    ref={discRef}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-16 h-16 rounded-full bg-black border-4 border-gray-800 flex items-center justify-center shadow-lg overflow-hidden relative cursor-pointer hover:scale-105 transition-transform shrink-0"
                >
                    {/* Disc Grooves */}
                    <div className="absolute inset-0 rounded-full border-2 border-gray-700 opacity-50 scale-90"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-700 opacity-50 scale-75"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-700 opacity-50 scale-60"></div>

                    {/* Label */}
                    <div className="w-6 h-6 rounded-full bg-red-500 z-10"></div>

                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Controls (Visible when expanded) */}
                {isExpanded && (
                    <div className="flex flex-col gap-1 min-w-[200px]">
                        <div className="flex justify-between text-xs font-bold text-gray-600">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={duration || 260}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                )}

                <audio
                    ref={audioRef}
                    src={musicFile}
                    loop={false}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                />
            </div>
        </>
    );
};

export default MusicPlayer;
