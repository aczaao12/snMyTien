import React from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    return <div className="absolute w-2 h-4" style={style}></div>;
};

const Confetti: React.FC = () => {
    const confettiCount = 100;
    const pieces = [];

    const colors = ['#f43f5e', '#fb923c', '#facc15', '#ec4899'];

    for (let i = 0; i < confettiCount; i++) {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            animation: `fall ${Math.random() * 5 + 4}s ${Math.random() * 5}s linear forwards`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() + 0.5,
        };
        pieces.push(<ConfettiPiece key={i} style={style} />);
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
             <style>
                {`
                    @keyframes fall {
                        0% {
                            top: -10%;
                            transform: rotate(0deg);
                        }
                        100% {
                            top: 110%;
                            transform: rotate(720deg);
                        }
                    }
                `}
            </style>
            {pieces}
        </div>
    );
};

export default Confetti;