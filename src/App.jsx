import React, { useEffect, useRef, useState } from 'react';
import QuoteBook from './components/QuoteBook';
import Monster from './components/Monster';
import BigNumber from './components/BigNumber';
import LanguageSelector from './components/LanguageSelector';
import StartOverlay from './components/StartOverlay';
import OrientationWarning from './components/OrientationWarning';
import { translations } from './i18n/translations';
import gsap from 'gsap';
import cakeImg from './assets/cake.png';
import endImg from './assets/end.png';
import MusicPlayer from './components/MusicPlayer';
import PartyMonster from './components/PartyMonster';
import WishDisplay from './components/WishDisplay';
import { wishes } from './data/wishes';

function App() {
  const appRef = useRef(null);
  const monsterRef = useRef(null);
  const spriteWrapperRef = useRef(null); // Wrapper for flipping sprite
  const bubbleRef = useRef(null); // Chat bubble
  const bookWrapperRef = useRef(null);
  const age19Ref = useRef(null);
  const age20Ref = useRef(null);
  const cakeRef = useRef(null);
  const owletRef = useRef(null);
  const dudeRef = useRef(null);
  const curtainCallRef = useRef(null);
  const tlRef = useRef(null); // Store timeline reference

  const [currentLang, setCurrentLang] = useState('vi');
  const [monsterAction, setMonsterAction] = useState('walk');
  const [showQuotes, setShowQuotes] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [monsterFlip, setMonsterFlip] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // For start overlay

  // Party Monsters State
  const [owletAction, setOwletAction] = useState('idle');
  const [dudeAction, setDudeAction] = useState('idle');
  const [isDancing, setIsDancing] = useState(false);

  // Wishes State
  const [currentWish, setCurrentWish] = useState('');

  // Handle start button click
  const handleStart = () => {
    setHasStarted(true);
  };

  // Dance Moves List (excluding rock/dust)
  const danceMoves = [
    'attack1', 'attack2', 'climb', 'death', 'hurt',
    'idle', 'jump', 'run', 'throw', 'walkAttack'
  ];

  // Random Dance & Wishes Logic
  useEffect(() => {
    let interval;
    if (isDancing) {
      interval = setInterval(() => {
        // Random Move
        const randomMove = danceMoves[Math.floor(Math.random() * danceMoves.length)];
        setMonsterAction(randomMove);
        setOwletAction(randomMove);
        setDudeAction(randomMove);

        // Random Wish
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        setCurrentWish(randomWish);

      }, 1200); // Change move & wish every 1.2 seconds
    } else {
      setCurrentWish(''); // Clear wish when not dancing
    }
    return () => clearInterval(interval);
  }, [isDancing]);

  useEffect(() => {
    if (!hasStarted) return; // Don't start animation until user clicks

    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.to(".bg-gradient", {
        backgroundPosition: "200% center",
        duration: 20,
        repeat: -1,
        ease: "linear"
      });

      const tl = gsap.timeline();
      tlRef.current = tl; // Save ref
      const screenWidth = window.innerWidth;

      // Initial Setup
      gsap.set(monsterRef.current, { x: -screenWidth / 2 - 300, opacity: 1 });
      gsap.set(age19Ref.current, { x: 0, opacity: 1, scale: 1 });
      gsap.set(age20Ref.current, { x: -screenWidth / 2 - 300, opacity: 1 });
      gsap.set(cakeRef.current, { x: -screenWidth / 2 - 300, opacity: 1 });
      gsap.set(bookWrapperRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(bubbleRef.current, { opacity: 0, scale: 0, y: 20 });
      gsap.set(curtainCallRef.current, { x: -screenWidth - 500 }); // Start far left

      // Party Monsters Hidden Initially
      gsap.set(owletRef.current, { x: -screenWidth / 2 - 100, opacity: 0, scale: 0 });
      gsap.set(dudeRef.current, { x: screenWidth / 2 + 100, opacity: 0, scale: 0 });

      // =================================================
      // PHASE 1: Intro & "Hello"
      // =================================================
      tl.call(() => {
        setMonsterAction('walk');
        setBubbleText("Hello, Thắng nè");
      });
      tl.to(bubbleRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, "<");
      tl.to(monsterRef.current, { x: -screenWidth / 2 + 100, duration: 4, ease: "linear" }, "<");
      tl.call(() => setMonsterAction('walk'));
      tl.to({}, { duration: 1 });

      // =================================================
      // PHASE 2: Push 19 Away
      // =================================================
      tl.call(() => setMonsterAction('walk'));
      tl.to(monsterRef.current, { x: -150, duration: 3, ease: "linear" });
      tl.call(() => setMonsterAction('push'));
      tl.to([monsterRef.current, age19Ref.current], { x: `+=${screenWidth + 400}`, duration: 6, ease: "power1.inOut" });
      tl.to(bubbleRef.current, { opacity: 0, scale: 0, y: 20, duration: 0.3, ease: "power2.in" });

      // =================================================
      // PHASE 3: Bring 20 In
      // =================================================
      tl.call(() => {
        setMonsterAction('walk');
        setMonsterFlip(false);
        gsap.set(monsterRef.current, { x: -screenWidth / 2 - 300 });
        gsap.set(age20Ref.current, { x: -screenWidth / 2 - 150 });
      });
      tl.call(() => {
        setMonsterAction('push');
        setBubbleText("Tiên lại thêm một tuổi nè");
      });
      tl.to(bubbleRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
      tl.to([monsterRef.current, age20Ref.current], {
        x: (index, target) => {
          if (target === age20Ref.current) return 0;
          return -150;
        },
        duration: 6, ease: "power1.out"
      });

      // =================================================
      // PHASE 4: Celebration (Jump)
      // =================================================
      tl.call(() => {
        setMonsterAction('jump');
        setBubbleText("Chúc mừng sinh nhật nhé Người đẹp!!");
      });
      tl.to({}, { duration: 5 });

      // =================================================
      // PHASE 5: Exit (Run)
      // =================================================
      tl.call(() => setMonsterAction('run'));
      tl.to(monsterRef.current, { x: screenWidth + 300, duration: 2.5, ease: "linear" });
      tl.to(bubbleRef.current, { opacity: 0, scale: 0, y: 20, duration: 0.3, ease: "power2.in" }, "-=0.5");

      // =================================================
      // PHASE 6: Cake & Music & Party
      // =================================================
      // Reset for Cake
      tl.call(() => {
        setMonsterAction('walk');
        setMonsterFlip(false);
        gsap.set(monsterRef.current, { x: -screenWidth / 2 - 300 });
        gsap.set(cakeRef.current, { x: -screenWidth / 2 - 150 });
      });

      // Start Music & Push Cake
      tl.call(() => {
        setIsPlayingMusic(true);
        setMonsterAction('push');
        setBubbleText("Happy birth day");
      });

      tl.to(bubbleRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });

      // Push Cake to Center (11s)
      tl.to([monsterRef.current, cakeRef.current], {
        x: (index, target) => {
          if (target === cakeRef.current) return 0; // Center Cake
          return -150; // Monster left of cake
        },
        duration: 11,
        ease: "linear"
      });

      // PARTY TIME! Owlet and Dude appear
      tl.call(() => {
        setIsDancing(true); // Start random dance
      });

      // Animate Owlet and Dude in
      tl.to([owletRef.current, dudeRef.current], {
        x: (index, target) => {
          if (target === owletRef.current) return -300; // Left of monster
          return 300; // Right of cake
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Dance Loop
      // Song Duration = 260s (4m20s).
      // Music starts roughly at T=40s in timeline (approx).
      // Curtain Call starts at Music T=240s (20s remaining).
      // So Dance Duration = 240s - (Time elapsed since music start).
      // Let's just set a long duration, but we will jump out of it when seeking.
      // Or better, we set it to exactly fill the gap.
      // Let's assume Music Start is T=0 for music.
      // We need to wait until Music T=240.
      // So duration is 240s.
      tl.to({}, { duration: 229 }); // 240 - 11s (push cake) = 229s

      // =================================================
      // PHASE 7: Exit All (Before Curtain Call)
      // =================================================
      tl.call(() => {
        setIsDancing(false); // Stop random dance
        setMonsterAction('walk');
        setBubbleText("Bye bye!!");
        setOwletAction('walk');
        setDudeAction('walk');
      });

      // All walk off right
      tl.to([monsterRef.current, owletRef.current, dudeRef.current], {
        x: `+=${screenWidth + 500}`, // All move right off screen
        duration: 5, // Faster exit to clear stage for curtain call
        ease: "linear"
      });

      // Quotes Fade In (Can happen here)
      tl.to(age20Ref.current, { opacity: 0, scale: 1.2, duration: 1 }, "-=5");
      tl.call(() => setShowQuotes(true), "-=5");
      tl.to(bookWrapperRef.current, { opacity: 1, scale: 1, duration: 1 }, "-=5");

      // =================================================
      // PHASE 8: Curtain Call (End Image)
      // =================================================
      // Starts at Music T=240s (approx).

      // Reset Monsters for Pushing
      tl.call(() => {
        setMonsterAction('push'); // Pushing
        setOwletAction('push');
        setDudeAction('push');
        setMonsterFlip(false); // Face right
        setBubbleText(""); // Clear bubble
      });

      // Push Curtain Call across screen
      // Move from Left (-screenWidth) to Center (0)
      tl.to(curtainCallRef.current, {
        x: 0, // Center the container
        duration: 15, // Slow push
        ease: "linear"
      });

      // Stop & Show Final Bubble
      tl.call(() => {
        setMonsterAction('idle');
        setOwletAction('idle');
        setDudeAction('idle');
        setBubbleText("Hẹn gặp vào năm sau nhé !!");
      });

      // Show Bubble on Pink Monster
      tl.to(bubbleRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      // Hold for remaining time (5s)
      tl.to({}, { duration: 5 });

    }, appRef);

    return () => ctx.revert();
  }, [hasStarted]);

  const handleSeek = (time) => {
    if (!tlRef.current) return;

    // Map audio time to timeline time
    const offset = 39;

    // If seeking near end (>= 240s), jump to Curtain Call
    if (time >= 240) {
      tlRef.current.seek(offset + time);
    } else {
      tlRef.current.seek(offset + time);
    }

    // Update states based on time
    if (time >= 240) {
      setIsDancing(false);
      setIsPlayingMusic(true);
    } else if (time > 11 && time < 240) {
      setIsDancing(true);
      setIsPlayingMusic(true);
    } else {
      setIsDancing(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };

  return (
    <div ref={appRef} className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-[length:200%_auto] bg-gradient relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Start Overlay */}
      {!hasStarted && <StartOverlay onStart={handleStart} />}

      {/* Orientation Warning (Mobile only) */}
      <OrientationWarning />

      <LanguageSelector currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      <MusicPlayer isPlaying={isPlayingMusic} onSeek={handleSeek} />

      {/* Wish Display */}
      {isDancing && <WishDisplay text={currentWish} action={monsterAction} />}

      {/* Container for animation alignment */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-screen">

        {/* Curtain Call Container (Phase 8) */}
        <div
          ref={curtainCallRef}
          className="absolute z-50 flex flex-col items-center justify-center"
          style={{ left: 0 }}
        >
          <div className="flex items-end">
            {/* Monsters Pushing (Left side) */}
            <div className="flex flex-col gap-4 mr-[-20px] z-10">
              <PartyMonster type="owlet" action="push" />
              <PartyMonster type="pink" action="push" />
              <PartyMonster type="dude" action="push" />
            </div>

            {/* End Image */}
            <div className="relative">
              <img src={endImg} alt="End" className="max-h-[70vh] w-auto drop-shadow-2xl border-8 border-white rounded-lg rotate-2" />
            </div>
          </div>

          {/* Credits */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-pink-300">
            <p className="text-2xl font-bold text-pink-600 handwriting text-center">
              Design By Hồ Quốc Thắng gửi Đặng Thị Mỹ Tiên
            </p>
          </div>
        </div>

        {/* Owlet Monster (Left) */}
        <div ref={owletRef} className="absolute z-25 pointer-events-none">
          <PartyMonster type="owlet" action={owletAction} />
        </div>

        {/* Monster Container (Pink) */}
        <div
          ref={monsterRef}
          className="absolute z-30 flex flex-col items-center justify-center transition-transform duration-0"
        >
          {/* Chat Bubble */}
          <div
            ref={bubbleRef}
            className="absolute -top-24 bg-white px-6 py-3 rounded-2xl shadow-xl border-2 border-pink-400 whitespace-nowrap z-40"
          >
            <p className="text-pink-600 font-bold handwriting text-xl">{bubbleText}</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-400 rotate-45"></div>
          </div>

          {/* Sprite Wrapper */}
          <div
            ref={spriteWrapperRef}
            style={{ transform: monsterFlip ? 'scaleX(-1)' : 'scaleX(1)' }}
          >
            <PartyMonster type="pink" action={monsterAction} />
          </div>
        </div>

        {/* Dude Monster (Right) */}
        <div ref={dudeRef} className="absolute z-25 pointer-events-none">
          <div style={{ transform: dudeAction === 'walk' ? 'scaleX(1)' : 'scaleX(-1)' }}>
            <PartyMonster type="dude" action={dudeAction} />
          </div>
        </div>

        {/* Age 19 */}
        <div ref={age19Ref} className="absolute z-20">
          <BigNumber number="19" className="text-gray-100/80" />
        </div>

        {/* Age 20 */}
        <div ref={age20Ref} className="absolute z-20">
          <BigNumber number="20" className="text-yellow-300" />
        </div>

        {/* Cake */}
        <div ref={cakeRef} className="absolute z-25">
          <img src={cakeImg} alt="Birthday Cake" className="w-64 md:w-80 drop-shadow-2xl" />
        </div>

        {/* Book Wrapper */}
        <div ref={bookWrapperRef} className="z-10 absolute inset-0 flex items-center justify-center">
          {showQuotes && <QuoteBook />}
        </div>

      </div>
    </div>
  );
}

export default App;
