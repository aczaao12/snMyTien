import React from 'react';
import walkSprite from '../assets/Pink_Monster_Walk_6.png';
import pushSprite from '../assets/Pink_Monster_Push_6.png';
import jumpSprite from '../assets/Pink_Monster_Jump_8.png';
import runSprite from '../assets/Pink_Monster_Run_6.png';

const Monster = ({ action }) => {
    return (
        // Container determines the visual size on screen (scaled up)
        // w-16 (64px) = 2x scale, md:w-24 (96px) = 3x scale
        <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">

            {/* Inner container fixed at native sprite size (32x32) */}
            {/* We scale this up to fill the parent container */}
            <div className="relative w-[32px] h-[32px] scale-[2] md:scale-[3] origin-center">

                {/* Walk Sprite (6 frames) */}
                <div
                    className="absolute inset-0 animate-sprite"
                    style={{
                        backgroundImage: `url(${walkSprite})`,
                        backgroundSize: '192px 32px',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                        display: action === 'walk' ? 'block' : 'none'
                    }}
                />

                {/* Push Sprite (6 frames) */}
                <div
                    className="absolute inset-0 animate-sprite"
                    style={{
                        backgroundImage: `url(${pushSprite})`,
                        backgroundSize: '192px 32px',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                        display: action === 'push' ? 'block' : 'none'
                    }}
                />

                {/* Run Sprite (6 frames) */}
                <div
                    className="absolute inset-0 animate-sprite"
                    style={{
                        backgroundImage: `url(${runSprite})`,
                        backgroundSize: '192px 32px',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                        display: action === 'run' ? 'block' : 'none'
                    }}
                />

                {/* Jump Sprite (8 frames) */}
                <div
                    className="absolute inset-0 animate-sprite-8"
                    style={{
                        backgroundImage: `url(${jumpSprite})`,
                        backgroundSize: '256px 32px', // 8 frames * 32px
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                        display: action === 'jump' ? 'block' : 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default Monster;
