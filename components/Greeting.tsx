import React from 'react';
import Confetti from './Confetti';

const Greeting: React.FC = () => {
  //  ĐỔI TÊN NGƯỜI BẠN Ở ĐÂY
  const friendName = "Mỹ Tiên"; 
  
  return (
    <>
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
        `}
      </style>
      <div className="h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
        <Confetti />
        <h1 
          className="font-dancing text-6xl md:text-8xl text-rose-500 drop-shadow-lg animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Chúc Mừng Sinh Nhật
        </h1>
        <h2 
          className="font-playfair text-xl md:text-3xl text-amber-700 mt-6 animate-fade-in-up"
          style={{ animationDelay: '1.0s' }}
        >
          Gửi {friendName},
        </h2>
        <p 
          className="font-playfair text-3xl md:text-5xl text-amber-600 mt-4 drop-shadow-md animate-fade-in-up"
          style={{ animationDelay: '1.5s' }}
        >
          15 / 12
        </p>
        <div 
          className="animate-fade-in-up" 
          style={{ animationDelay: '2.0s' }}
        >
          <p className="mt-8 text-2xl md:text-4xl text-slate-700 font-semibold tracking-wider">
            生日快乐
          </p>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            (shēngrì kuàilè)
          </p>
        </div>
        <div 
          className="absolute bottom-10 animate-fade-in-up"
          style={{ animationDelay: '2.5s' }}
        >
          <div className="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Greeting;