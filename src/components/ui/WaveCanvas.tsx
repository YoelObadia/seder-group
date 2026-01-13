'use client';

import { useEffect, useRef } from 'react';

export function WaveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let time = 0;

        // Configuration for waves
        // Exact Reproduction: Large, sweeping gradients matching the reference.
        // Gold (Top-Left), Teal (Bottom-Left), Purple (Right/Base)
        const waves = [
            // Deep Purple Base (Right/Bottom focus)
            { y: height * 0.65, length: 0.0015, amplitude: 180, speed: 0.003, color: '#5b21b6' },
            // Teal/Cyan (Left focus)
            { y: height * 0.55, length: 0.002, amplitude: 150, speed: -0.004, color: '#0e7490' },
            // Gold/Orange (Top-Left accent)
            { y: height * 0.45, length: 0.0018, amplitude: 140, speed: 0.002, color: '#b45309' },
            // Soft Lavender Overlap (Center integration)
            { y: height * 0.5, length: 0.0025, amplitude: 100, speed: 0.005, color: '#7c3aed' },
        ];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Background: Muted Grey-Purple (Base of the photo environment)
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#2e1065'); // Deep Purple
            gradient.addColorStop(0.5, '#4c1d95'); // Violet
            gradient.addColorStop(1, '#581c87'); // Lighter purple

            // Let's make it a bit more "murky"/blended like the photo
            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, '#1a1830'); // Dark muted top
            bgGradient.addColorStop(1, '#2d2a4a'); // Lighter muted bottom

            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            ctx.globalCompositeOperation = 'source-over'; // Standard blending

            waves.forEach((wave) => {
                ctx.beginPath();
                ctx.moveTo(0, height);

                // Advanced Gradient: Horizontal fade + Vertical fade for "Cloud/Liquid" look
                const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
                waveGradient.addColorStop(0, wave.color);
                waveGradient.addColorStop(1, wave.color + '00'); // Transparent at bottom

                ctx.fillStyle = waveGradient;

                for (let x = 0; x < width; x++) {
                    // Complex wave: Main sine + secondary sine for "organic" irregularity
                    const dy = Math.sin(x * wave.length + time * wave.speed) * wave.amplitude +
                        Math.sin(x * wave.length * 2 + time * wave.speed * 1.5) * (wave.amplitude * 0.2);
                    ctx.lineTo(x, wave.y + dy);
                }

                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset

            time += 1; // Increment time
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
