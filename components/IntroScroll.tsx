import React, { useState } from 'react';

interface IntroScrollProps {
  onEnd: () => void;
}

const IntroScroll: React.FC<IntroScrollProps> = ({ onEnd }) => {
  const [animationState, setAnimationState] = useState<'initial' | 'unrolling' | 'fading'>('initial');

  const handleOpen = () => {
    setAnimationState('unrolling');
    // Duration includes unrolling (1.5s), text fade-in (0.5s) and a buffer
    setTimeout(() => {
      setAnimationState('fading');
      // Duration for the final fade-out
      setTimeout(onEnd, 600); 
    }, 2500);
  };

  return (
    <>
      <style>
        {`
          .shadow-inner-strong {
            box-shadow: inset 0 0 15px rgba(0,0,0,0.15);
          }
        `}
      </style>
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-rose-100/50 backdrop-blur-sm transition-opacity duration-500 ${animationState === 'fading' ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-full max-w-xs text-center">
          
          {/* Top Roller */}
          <div className="h-6 bg-gradient-to-r from-[#8c624d] via-[#c49a85] to-[#8c624d] rounded-full shadow-lg z-10 relative"></div>

          {/* Unrolling Paper */}
          <div 
            className="overflow-hidden transition-[max-height] duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ maxHeight: animationState === 'unrolling' ? '400px' : '0px' }}
          >
            <div className="bg-[#fdf6e3] py-12 px-4 shadow-inner-strong">
              {/* Content that fades in after unrolling starts */}
              <div className={`transition-opacity duration-500 ${animationState === 'unrolling' ? 'opacity-100 delay-[1000ms]' : 'opacity-0'}`}>
                  <h1 className="font-dancing text-4xl text-rose-500 drop-shadow-sm">Chúc Mừng Sinh Nhật</h1>
                  <h2 className="font-playfair text-3xl text-amber-700 mt-2">Mỹ Tiên</h2>
              </div>
            </div>
          </div>

          {/* Bottom Roller */}
           <div className={`h-6 bg-gradient-to-r from-[#8c624d] via-[#c49a85] to-[#8c624d] rounded-full shadow-lg transition-transform duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${animationState !== 'unrolling' ? '-translate-y-full' : 'translate-y-0'}`}></div>

          {/* Seal & Button - visible only in initial state */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none ${animationState !== 'initial' ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-serif shadow-md border-2 border-yellow-400 select-none">福</div>
            
            <button 
              onClick={handleOpen} 
              className="mt-6 px-6 py-2 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-600 transition-colors shadow-lg pointer-events-auto"
            >
              Mở quà
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroScroll;
