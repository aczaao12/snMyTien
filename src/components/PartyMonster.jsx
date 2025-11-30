import React from 'react';

// Pink Monster Imports
import pinkWalk from '../assets/1 Pink_Monster/Pink_Monster_Walk_6.png';
import pinkJump from '../assets/1 Pink_Monster/Pink_Monster_Jump_8.png';
import pinkIdle from '../assets/1 Pink_Monster/Pink_Monster_Idle_4.png';
import pinkAttack1 from '../assets/1 Pink_Monster/Pink_Monster_Attack1_4.png';
import pinkAttack2 from '../assets/1 Pink_Monster/Pink_Monster_Attack2_6.png';
import pinkClimb from '../assets/1 Pink_Monster/Pink_Monster_Climb_4.png';
import pinkDeath from '../assets/1 Pink_Monster/Pink_Monster_Death_8.png';
import pinkHurt from '../assets/1 Pink_Monster/Pink_Monster_Hurt_4.png';
import pinkPush from '../assets/1 Pink_Monster/Pink_Monster_Push_6.png';
import pinkRun from '../assets/1 Pink_Monster/Pink_Monster_Run_6.png';
import pinkThrow from '../assets/1 Pink_Monster/Pink_Monster_Throw_4.png';
import pinkWalkAttack from '../assets/1 Pink_Monster/Pink_Monster_Walk+Attack_6.png';

// Owlet Monster Imports
import owletWalk from '../assets/2 Owlet_Monster/Owlet_Monster_Walk_6.png';
import owletJump from '../assets/2 Owlet_Monster/Owlet_Monster_Jump_8.png';
import owletIdle from '../assets/2 Owlet_Monster/Owlet_Monster_Idle_4.png';
import owletAttack1 from '../assets/2 Owlet_Monster/Owlet_Monster_Attack1_4.png';
import owletAttack2 from '../assets/2 Owlet_Monster/Owlet_Monster_Attack2_6.png';
import owletClimb from '../assets/2 Owlet_Monster/Owlet_Monster_Climb_4.png';
import owletDeath from '../assets/2 Owlet_Monster/Owlet_Monster_Death_8.png';
import owletHurt from '../assets/2 Owlet_Monster/Owlet_Monster_Hurt_4.png';
import owletPush from '../assets/2 Owlet_Monster/Owlet_Monster_Push_6.png';
import owletRun from '../assets/2 Owlet_Monster/Owlet_Monster_Run_6.png';
import owletThrow from '../assets/2 Owlet_Monster/Owlet_Monster_Throw_4.png';
import owletWalkAttack from '../assets/2 Owlet_Monster/Owlet_Monster_Walk+Attack_6.png';

// Dude Monster Imports
import dudeWalk from '../assets/3 Dude_Monster/Dude_Monster_Walk_6.png';
import dudeJump from '../assets/3 Dude_Monster/Dude_Monster_Jump_8.png';
import dudeIdle from '../assets/3 Dude_Monster/Dude_Monster_Idle_4.png';
import dudeAttack1 from '../assets/3 Dude_Monster/Dude_Monster_Attack1_4.png';
import dudeAttack2 from '../assets/3 Dude_Monster/Dude_Monster_Attack2_6.png';
import dudeClimb from '../assets/3 Dude_Monster/Dude_Monster_Climb_4.png';
import dudeDeath from '../assets/3 Dude_Monster/Dude_Monster_Death_8.png';
import dudeHurt from '../assets/3 Dude_Monster/Dude_Monster_Hurt_4.png';
import dudePush from '../assets/3 Dude_Monster/Dude_Monster_Push_6.png';
import dudeRun from '../assets/3 Dude_Monster/Dude_Monster_Run_6.png';
import dudeThrow from '../assets/3 Dude_Monster/Dude_Monster_Throw_4.png';
import dudeWalkAttack from '../assets/3 Dude_Monster/Dude_Monster_Walk+Attack_6.png';

const sprites = {
    pink: {
        walk: { img: pinkWalk, frames: 6, width: 192 },
        jump: { img: pinkJump, frames: 8, width: 256 },
        idle: { img: pinkIdle, frames: 4, width: 128 },
        attack1: { img: pinkAttack1, frames: 4, width: 128 },
        attack2: { img: pinkAttack2, frames: 6, width: 192 },
        climb: { img: pinkClimb, frames: 4, width: 128 },
        death: { img: pinkDeath, frames: 8, width: 256 },
        hurt: { img: pinkHurt, frames: 4, width: 128 },
        push: { img: pinkPush, frames: 6, width: 192 },
        run: { img: pinkRun, frames: 6, width: 192 },
        throw: { img: pinkThrow, frames: 4, width: 128 },
        walkAttack: { img: pinkWalkAttack, frames: 6, width: 192 },
    },
    owlet: {
        walk: { img: owletWalk, frames: 6, width: 192 },
        jump: { img: owletJump, frames: 8, width: 256 },
        idle: { img: owletIdle, frames: 4, width: 128 },
        attack1: { img: owletAttack1, frames: 4, width: 128 },
        attack2: { img: owletAttack2, frames: 6, width: 192 },
        climb: { img: owletClimb, frames: 4, width: 128 },
        death: { img: owletDeath, frames: 8, width: 256 },
        hurt: { img: owletHurt, frames: 4, width: 128 },
        push: { img: owletPush, frames: 6, width: 192 },
        run: { img: owletRun, frames: 6, width: 192 },
        throw: { img: owletThrow, frames: 4, width: 128 },
        walkAttack: { img: owletWalkAttack, frames: 6, width: 192 },
    },
    dude: {
        walk: { img: dudeWalk, frames: 6, width: 192 },
        jump: { img: dudeJump, frames: 8, width: 256 },
        idle: { img: dudeIdle, frames: 4, width: 128 },
        attack1: { img: dudeAttack1, frames: 4, width: 128 },
        attack2: { img: dudeAttack2, frames: 6, width: 192 },
        climb: { img: dudeClimb, frames: 4, width: 128 },
        death: { img: dudeDeath, frames: 8, width: 256 },
        hurt: { img: dudeHurt, frames: 4, width: 128 },
        push: { img: dudePush, frames: 6, width: 192 },
        run: { img: dudeRun, frames: 6, width: 192 },
        throw: { img: dudeThrow, frames: 4, width: 128 },
        walkAttack: { img: dudeWalkAttack, frames: 6, width: 192 },
    }
};

const PartyMonster = ({ type = 'pink', action = 'idle' }) => {
    const currentSprite = sprites[type][action] || sprites[type].idle;

    // Determine animation class based on frame count
    let animClass = 'animate-sprite'; // Default 6 frames
    if (currentSprite.frames === 8) animClass = 'animate-sprite-8';
    if (currentSprite.frames === 4) animClass = 'animate-sprite-4';

    return (
        <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
            <div className="relative w-[32px] h-[32px] scale-[2] md:scale-[3] origin-center">
                <div
                    className={`absolute inset-0 ${animClass}`}
                    style={{
                        backgroundImage: `url(${currentSprite.img})`,
                        backgroundSize: `${currentSprite.width}px 32px`,
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                    }}
                />
            </div>
        </div>
    );
};

export default PartyMonster;
