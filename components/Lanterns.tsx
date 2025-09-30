import React, { useMemo } from 'react';

// Define the color pairs for the lanterns
const colors = [
    { outer: 'bg-rose-400/50', inner: 'bg-rose-300' },
    { outer: 'bg-amber-400/50', inner: 'bg-amber-300' },
    { outer: 'bg-pink-400/50', inner: 'bg-pink-300' },
    { outer: 'bg-purple-400/50', inner: 'bg-purple-300' },
    { outer: 'bg-orange-400/50', inner: 'bg-orange-300' },
    { outer: 'bg-yellow-400/50', inner: 'bg-yellow-300' },
    { outer: 'bg-indigo-400/50', inner: 'bg-indigo-300' },
];

const Lantern: React.FC<{ duration: number; delay: number; size: number; left: number; color: { outer: string; inner: string } }> = ({ duration, delay, size, left, color }) => {
    const style: React.CSSProperties = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
    };

    return <div className="absolute bottom-[-150px] animate-float" style={style}>
        <div className={`w-full h-full ${color.outer} rounded-full blur-sm`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 ${color.inner} rounded-full blur-md`}></div>
    </div>
}

const Lanterns: React.FC = () => {
    const baseLanterns = [
        { duration: 15, delay: 0, size: 60, left: 10 },
        { duration: 20, delay: 5, size: 80, left: 30 },
        { duration: 18, delay: 2, size: 40, left: 50 },
        { duration: 25, delay: 8, size: 100, left: 70 },
        { duration: 16, delay: 1, size: 50, left: 90 },
        { duration: 22, delay: 10, size: 70, left: 5 },
        { duration: 19, delay: 4, size: 90, left: 85 },
        { duration: 28, delay: 12, size: 60, left: 45 },
    ];
    
    // useMemo will prevent re-calculating random colors on every render
    const lanterns = useMemo(() => baseLanterns.map(lantern => ({
        ...lantern,
        color: colors[Math.floor(Math.random() * colors.length)]
    })), []);
    
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <style>
                {`
                    @keyframes float {
                        0% {
                            bottom: -150px;
                            transform: translateX(0);
                        }
                        50% {
                            transform: translateX(20px);
                        }
                        100% {
                            bottom: 105%;
                            transform: translateX(-20px);
                        }
                    }
                    .animate-float {
                        animation-name: float;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    }
                `}
            </style>
            {lanterns.map((props, i) => <Lantern key={i} {...props} />)}
        </div>
    )
}

export default Lanterns;