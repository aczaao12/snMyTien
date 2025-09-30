import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Autoplay can be blocked by browsers, so we handle the promise.
        audioRef.current.play().catch(error => {
            console.log("Audio playback failed. User interaction might be required.", error)
            setIsPlaying(false); // Make sure state is correct if play fails
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Rất tiếc, không thể dùng trực tiếp link YouTube. 
  // Mình đã thay bằng một bản nhạc lofi chill khác cũng rất hay.
  // Bạn có thể thay link nhạc mp3 khác tại đây.
  const musicUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_18182b489a.mp3";

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }
        `}
      </style>
      <audio ref={audioRef} src={musicUrl} preload="auto"></audio>
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Bật nhạc"}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-transparent rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-rose-100 focus:ring-rose-400"
      >
        {/* Vinyl Disc */}
        <div 
          className="absolute top-0 left-0 w-full h-full animate-spin-slow rounded-full bg-slate-800 shadow-lg flex items-center justify-center"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
            {/* Label */}
            <div className="w-6 h-6 rounded-full bg-rose-300 flex items-center justify-center">
                 {/* Spindle hole */}
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
            </div>
        </div>
        
        {/* Play/Pause Icon */}
        <div className="relative z-10 text-white/80">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.118v3.764a1 1 0 001.555.832l3.197-1.882a1 1 0 000-1.664l-3.197-1.882z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
    </>
  );
};

export default MusicPlayer;
