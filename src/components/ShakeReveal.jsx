import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ShakeReveal = ({ onClose }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const [phase, setPhase] = useState('ENVELOPE'); // ENVELOPE, FLY_OUT, HOVER, TIKTOK, EXIT

    const state = useRef({
        shakeStrength: 0,
        revealTime: 0,
        image: {
            x: 0, y: 0, scale: 0, z: 0,
            vx: 0, vy: 0, vz: 0,
            angle: 0, vAngle: 0
        },
        tiktokData: [], // Array for grid items
        exitProgress: 0
    });

    const imageRef = useRef(null);

    // Load Image
    useEffect(() => {
        const img = new Image();
        img.src = '/ai-figure-generated.jpeg';
        img.onload = () => {
            imageRef.current = img;
        };

        // Init TikTok Grid Data
        const items = [];
        for (let i = 0; i < 30; i++) {
            items.push({
                x: (i % 3), // 3 Columns
                y: Math.floor(i / 3),
                speed: 1 + Math.random() * 2,
                offset: Math.random() * 1000,
                scaleVar: 0.9 + Math.random() * 0.2
            });
        }
        state.current.tiktokData = items;
    }, []);

    // Shake Detection
    useEffect(() => {
        let lastX = 0, lastY = 0, lastZ = 0;
        let lastTime = 0;
        const threshold = 15;

        const handleMotion = (event) => {
            if (phase !== 'ENVELOPE') return;

            const current = event.accelerationIncludingGravity;
            if (!current) return;

            const currentTime = Date.now();
            if ((currentTime - lastTime) > 100) {
                const diffTime = currentTime - lastTime;
                lastTime = currentTime;
                const deltaX = Math.abs(current.x - lastX);
                const deltaY = Math.abs(current.y - lastY);
                const deltaZ = Math.abs(current.z - lastZ);
                const speed = (deltaX + deltaY + deltaZ) / diffTime * 10000;

                if (speed > threshold * 100) {
                    triggerOpen();
                }
                lastX = current.x; lastY = current.y; lastZ = current.z;
            }
        };

        window.addEventListener('devicemotion', handleMotion);
        return () => window.removeEventListener('devicemotion', handleMotion);
    }, [phase]);

    const triggerOpen = () => {
        if (phase !== 'ENVELOPE') return;
        setPhase('FLY_OUT');

        const s = state.current;
        s.revealTime = Date.now();

        // Initial Velocity (Pop up and towards screen)
        s.image.vx = (Math.random() - 0.5) * 5;
        s.image.vy = -25; // Up fast
        s.image.vz = 0.5; // Towards user
        s.image.vAngle = (Math.random() - 0.5) * 0.5;
        s.image.scale = 0.2; // Start small in envelope

        // Schedule TikTok Mode (30s)
        setTimeout(() => {
            setPhase(prev => (prev === 'EXIT' || prev === 'ENVELOPE') ? prev : 'TIKTOK');
            // Schedule Exit (e.g. 10s after TikTok starts)
            setTimeout(() => {
                setPhase('EXIT');
                // Close after animation
                gsap.to(state.current, {
                    exitProgress: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: onClose
                });
            }, 10000);
        }, 30000); // 30s Wait
    };

    const handleClick = () => {
        if (phase === 'ENVELOPE') triggerOpen();
        // Skip debug
        if (phase === 'HOVER') {
            // setPhase('TIKTOK');
        }
    };

    // Main Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const render = () => {
            const width = canvas.width = window.innerWidth;
            const height = canvas.height = window.innerHeight;
            const centerX = width / 2;
            const centerY = height / 2;
            const s = state.current;
            const now = Date.now();

            ctx.clearRect(0, 0, width, height);

            // Background
            ctx.fillStyle = 'rgba(0,0,0,0.9)';
            ctx.fillRect(0, 0, width, height);

            // --- STAGE 1: ENVELOPE ---
            if (phase === 'ENVELOPE') {
                const shakeX = (Math.random() - 0.5) * s.shakeStrength;
                const shakeY = (Math.random() - 0.5) * s.shakeStrength;
                s.shakeStrength *= 0.9; // Decay

                ctx.save();
                ctx.translate(centerX + shakeX, centerY + shakeY);

                // Scale for viewport=1100
                const scale = width / 800; // Reduced scale relative to mobile width
                ctx.scale(scale, scale);

                // Draw Envelope
                ctx.fillStyle = '#ec4899'; // Pink
                ctx.fillRect(-120, -80, 240, 160);

                // Flap
                ctx.beginPath();
                ctx.moveTo(-120, -80);
                ctx.lineTo(0, 0);
                ctx.lineTo(120, -80);
                ctx.fillStyle = '#db2777'; // Darker pink
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText("Lắc để mở", 0, 120);
                ctx.restore();
            }

            // --- STAGE 2 & 3: FLY OUT & HOVER ---
            if (phase === 'FLY_OUT' || phase === 'HOVER') {
                if (imageRef.current) {
                    if (phase === 'FLY_OUT') {
                        // Physics
                        s.image.x += s.image.vx;
                        s.image.y += s.image.vy;
                        s.image.scale += s.image.vz * 0.1;
                        s.image.angle += s.image.vAngle;

                        // Friction / Target Center
                        s.image.vx *= 0.9;
                        s.image.vy *= 0.9;
                        s.image.vAngle *= 0.9;

                        // Stop condition & Transition to Hover
                        if (Math.abs(s.image.vy) < 0.1 && Math.abs(s.image.vx) < 0.1 && Math.abs(s.image.y) < 100) {
                            setPhase('HOVER');
                        }

                        // Spring to center
                        s.image.x += (0 - s.image.x) * 0.05;
                        s.image.y += (0 - s.image.y) * 0.05;

                        // Target Scale
                        const targetScale = 1.0;
                        s.image.scale += (targetScale - s.image.scale) * 0.05;
                    }
                    else if (phase === 'HOVER') {
                        // Gentle Hover
                        s.image.y = Math.sin(now * 0.002) * 15;
                        s.image.angle = Math.sin(now * 0.0015) * 0.03;
                    }

                    // Draw Single Polaroid
                    ctx.save();
                    ctx.translate(centerX + s.image.x, centerY + s.image.y);

                    const scaleFactor = width / 800; // Reduced scale
                    ctx.scale(s.image.scale * scaleFactor, s.image.scale * scaleFactor);
                    ctx.rotate(s.image.angle);

                    const img = imageRef.current;
                    const iW = 350;
                    const iH = 350 * (img.height / img.width);

                    // Frame
                    ctx.fillStyle = 'white';
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.fillRect(-iW / 2 - 15, -iH / 2 - 15, iW + 30, iH + 80);

                    // Image
                    ctx.drawImage(img, -iW / 2, -iH / 2, iW, iH);

                    // Caption
                    ctx.fillStyle = '#333';
                    ctx.font = '30px "Dancing Script", cursive';
                    ctx.textAlign = 'center';
                    ctx.fillText("Surprise!!", 0, iH / 2 + 45);

                    ctx.restore();

                    // --- PIXEL COUNTDOWN ---
                    if (s.revealTime > 0) {
                        const elapsed = (now - s.revealTime) / 1000;
                        const remaining = Math.max(0, 30 - Math.floor(elapsed));

                        if (remaining > 0) {
                            ctx.save();
                            // Render at top of screen
                            const timerY = 150;

                            ctx.font = '120px "VT323", monospace';
                            ctx.fillStyle = 'white';
                            ctx.textAlign = 'center';
                            ctx.shadowColor = 'black';
                            ctx.shadowBlur = 0;

                            // Pixel Shadow effect
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = '#ec4899'; // Pink stroke
                            ctx.strokeText(remaining, centerX, timerY);
                            ctx.fillText(remaining, centerX, timerY);

                            // Label
                            ctx.font = '40px "VT323", monospace';
                            ctx.fillText("WAIT FOR MAGIC...", centerX, timerY + 50);
                            ctx.strokeText("WAIT FOR MAGIC...", centerX, timerY + 50);
                            ctx.restore();
                        }
                    }
                }
            }

            // --- STAGE 4: TIKTOK WALL ---
            if (phase === 'TIKTOK' || phase === 'EXIT') {
                if (imageRef.current) {
                    const img = imageRef.current;
                    const colCount = 3;
                    const colW = width / colCount;

                    s.tiktokData.forEach((item, i) => {
                        const x = item.x * colW;
                        const scrollY = (now * item.speed * 0.15 + item.offset) % (height + 600) - 300;

                        ctx.save();
                        const myCenterX = x + colW / 2;
                        const myCenterY = scrollY + 150;

                        if (phase === 'EXIT') {
                            const p = s.exitProgress;
                            const exitScale = 1 - p;
                            const exitRot = p * Math.PI;

                            ctx.translate(myCenterX, myCenterY);
                            ctx.rotate(exitRot);
                            ctx.scale(exitScale, exitScale);
                            ctx.translate(-myCenterX, -myCenterY);
                            ctx.globalAlpha = 1 - p;
                        }

                        ctx.translate(myCenterX, myCenterY);
                        ctx.rotate(Math.sin(now * 0.003 + i) * 0.05);

                        const itemScale = (colW / img.width) * item.scaleVar * 0.9;
                        ctx.drawImage(img, -img.width * itemScale / 2, -img.height * itemScale / 2, img.width * itemScale, img.height * itemScale);

                        ctx.restore();
                    });

                    if (phase !== 'EXIT') {
                        ctx.save();
                        ctx.fillStyle = `hsl(${now % 360}, 100%, 70%)`;
                        ctx.font = 'bold 5vw Arial';
                        ctx.textAlign = 'center';
                        ctx.shadowColor = 'black';
                        ctx.shadowBlur = 20;
                        ctx.fillText("HAPPY BIRTHDAY!", centerX, centerY);
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 2;
                        ctx.strokeText("HAPPY BIRTHDAY!", centerX, centerY);
                        ctx.restore();
                    }
                }
            }

            requestRef.current = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(requestRef.current);
    }, [phase]);

    return (
        <div className="fixed inset-0 z-[100] cursor-pointer touch-none" onClick={handleClick}>
            <canvas ref={canvasRef} className="w-full h-full" />
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-8 right-8 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-all z-50"
            >
                ✕
            </button>
        </div>
    );
};

export default ShakeReveal;
