import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { drawBackground, drawChatBox, drawButton, drawParticles } from './renderers';

const BirthdayCard = ({ translations }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    // State to track animations and interactions reference
    const state = useRef({
        // Layout
        width: 800,
        height: 600,
        scale: 1,

        // Chat Box Animation State
        chatBox: {
            scale: 0,
            opacity: 0,
            y: 0
        },

        // Button Animation State
        button: {
            scale: 1,
            y: 50,
            opacity: 0,
            isHovered: false,
            textScale: 1
        },

        buttonHitArea: { x: 0, y: 0, w: 0, h: 0 },

        // Logic State
        isOpen: false,
        text: '',
        cursorVisible: true,
        particles: [],
        fullMessage: '',
        mouse: { x: 0, y: 0 }
    });

    // Draw Frame
    const draw = useCallback((ctx) => {
        const s = state.current;
        const width = s.width;
        const height = s.height;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, width, height);

        // Render Components
        drawBackground(ctx, width, height);
        drawChatBox(ctx, s, translations);
        drawButton(ctx, s, translations);
        drawParticles(ctx, s.particles);

        // Update Hit Area for Button (Shared Logic)
        // Recalculate based on current state to ensure sync
        const btnScale = s.button.scale * (s.button.isHovered ? 1.1 : 1);
        const btnW = 280;
        const btnH = 70;
        // Button Position Logic from Renderer:
        // ctx.translate(centerX, centerY + 140 + button.y);
        const btnRealY = centerY + 140 + s.button.y;

        s.buttonHitArea = {
            x: centerX - (btnW / 2 * btnScale),
            y: btnRealY - (btnH / 2 * btnScale),
            w: btnW * btnScale,
            h: btnH * btnScale
        };

    }, [translations]);

    // Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let rAF;

        const loop = () => {
            const s = state.current;
            // Update Particles
            for (let i = s.particles.length - 1; i >= 0; i--) {
                const p = s.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.scale *= 0.95;
                if (p.life <= 0) s.particles.splice(i, 1);
            }

            draw(ctx);
            rAF = requestAnimationFrame(loop);
        };
        loop();

        return () => cancelAnimationFrame(rAF);
    }, [draw]);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;

                // For high DPI
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = clientWidth * dpr;
                canvasRef.current.height = clientHeight * dpr;

                // Scale context to match dpr
                const ctx = canvasRef.current.getContext('2d');
                ctx.scale(dpr, dpr);

                // Update logical state
                state.current.width = clientWidth;
                state.current.height = clientHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Entrances
    useEffect(() => {
        const s = state.current;
        const ctx = gsap.context(() => {
            gsap.to(s.chatBox, {
                scale: 1,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)"
            });

            gsap.to(s.button, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 1.2,
                ease: "power2.out"
            });
        });
        return () => ctx.revert();
    }, []);

    // Typewriter
    useEffect(() => {
        const fullMessage = `${translations.title}! ${translations.message}`;
        state.current.fullMessage = fullMessage;
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < fullMessage.length) {
                state.current.text = fullMessage.substring(0, charIndex + 1);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);

        const cursorInterval = setInterval(() => {
            state.current.cursorVisible = !state.current.cursorVisible;
        }, 500);

        return () => {
            clearInterval(typeInterval);
            clearInterval(cursorInterval);
        };
    }, [translations]);

    const spawnParticles = (x, y) => {
        const colors = ['#ec4899', '#a855f7', '#facc15', '#60a5fa'];
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            state.current.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                scale: 1,
                size: 3 + Math.random() * 3,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    };

    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const s = state.current;
        const btn = s.buttonHitArea;

        if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
            s.isOpen = !s.isOpen;

            gsap.to(s.button, {
                scale: 1.2,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });

            const btnCenterX = btn.x + btn.w / 2;
            const btnCenterY = btn.y + btn.h / 2;
            spawnParticles(btnCenterX, btnCenterY);
        }
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const s = state.current;
        const btn = s.buttonHitArea;

        if (btn && x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
            if (!s.button.isHovered) {
                s.button.isHovered = true;
                canvasRef.current.style.cursor = 'pointer';
            }
        } else {
            if (s.button.isHovered) {
                s.button.isHovered = false;
                canvasRef.current.style.cursor = 'default';
            }
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
            <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                className="w-full h-full touch-none"
            />
        </div>
    );
};

export default BirthdayCard;
