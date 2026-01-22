'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
const GOLD = '#FFD700';
const BG_COLOR = '#050505';

interface FounderSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: any;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER WITH GLOW (Odometer Style)
// ═══════════════════════════════════════════════════════════════════════════════
function GlowingCounter({
    value,
    suffix = '',
    duration = 2.5,
}: {
    value: number;
    suffix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        setIsAnimating(true);

        const controls = animate(0, value, {
            duration,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (latest) => setCount(Math.floor(latest)),
            onComplete: () => setIsAnimating(false),
        });

        return () => controls.stop();
    }, [isInView, value, duration]);

    return (
        <span
            ref={ref}
            className="relative inline-block tabular-nums"
            style={{
                textShadow: isAnimating
                    ? `0 0 40px ${GOLD}80, 0 0 80px ${GOLD}40`
                    : `0 0 20px ${GOLD}20`,
                transition: 'text-shadow 0.5s ease',
            }}
        >
            {count.toLocaleString()}{suffix}
        </span>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPEWRITER QUOTE REVEAL
// ═══════════════════════════════════════════════════════════════════════════════
function TypewriterQuote({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const words = text.split(' ');

    return (
        <div ref={ref} className="relative">
            <p className="text-xl md:text-2xl text-white/80 font-serif italic leading-relaxed">
                <span className="text-gold text-3xl mr-2">"</span>
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                        transition={{
                            duration: 0.4,
                            delay: i * 0.05,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className="inline-block me-[0.3em]"
                    >
                        {word}
                    </motion.span>
                ))}
                <span className="text-gold text-3xl ml-1">"</span>
            </p>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCANNING GOLD BORDER
// ═══════════════════════════════════════════════════════════════════════════════
function ScanningBorder() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {/* Animated scanning line */}
            <motion.div
                className="absolute w-full h-full"
                style={{
                    background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${GOLD} 10deg, transparent 20deg)`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            {/* Inner mask to create border effect */}
            <div
                className="absolute inset-[2px] rounded-2xl"
                style={{ background: BG_COLOR }}
            />
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FILM GRAIN OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════
function FilmGrain() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN FOUNDER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export function FounderSection({ dict }: FounderSectionProps) {

    // Fallback if dict is not ready yet
    if (!dict || !dict.home || !dict.home.founder) return null;

    const founderData = dict.home.founder;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const locale = useLocale();
    const isRtl = locale === 'he';

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isHovered, setIsHovered] = useState(false);

    // Parallax effect
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Inverse parallax for image (slower movement)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const smoothImageY = useSpring(imageY, { damping: 20, stiffness: 100 });

    // Content reveal
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const contentRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-24 md:py-0 flex items-center overflow-hidden"
            style={{ background: BG_COLOR }}
        >
            {/* Background ambient glow */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(ellipse 80% 50% at 20% 50%, ${GOLD}15 0%, transparent 70%)`,
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* 12-column grid: image 5 cols, gap 1 col, content 6 cols */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

                    {/* ═══ PORTRAIT SIDE (5 columns) ═══ */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            ref={imageRef}
                            style={{ y: smoothImageY }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            {/* Scanning Gold Border */}
                            <ScanningBorder />

                            {/* Image Container */}
                            <div className="absolute inset-[2px] rounded-2xl overflow-hidden bg-[#0a0a0a]">
                                {/* IMAGE AVEC EFFET N&B VERS COULEUR */}
                                <Image
                                    src="/images/picture.webp"
                                    alt={founderData.name}
                                    fill
                                    className="object-cover transition-all duration-700 ease-out"
                                    style={{
                                        // C'est ici que la magie opère :
                                        // grayscale(1) = Noir et Blanc
                                        // grayscale(0) = Couleur
                                        filter: isHovered
                                            ? 'grayscale(0) brightness(1.1) contrast(1.05)'
                                            : 'grayscale(1) brightness(0.9) contrast(1.1)',
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    priority
                                />

                                {/* Film Grain Overlay */}
                                <FilmGrain />

                                {/* Bottom gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

                                {/* Name & Role at bottom */}
                                <div className="absolute bottom-8 left-8 right-8 z-20">
                                    <motion.h3
                                        className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-tight"
                                        style={{
                                            fontFamily: 'var(--font-montserrat), sans-serif',
                                            letterSpacing: isHovered ? '0.1em' : '0em',
                                            transition: 'letter-spacing 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                                        }}
                                    >
                                        {founderData.name}
                                    </motion.h3>
                                    <p
                                        className="text-sm tracking-[0.3em] uppercase font-mono"
                                        style={{ color: GOLD, fontFamily: 'var(--font-heebo), sans-serif' }}
                                    >
                                        {founderData.role}
                                    </p>
                                </div>

                                {/* Subtle vignette */}
                                <div
                                    className="absolute inset-0 pointer-events-none z-10"
                                    style={{
                                        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.6)',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* ═══ SPACER (1 column) ═══ */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* ═══ CONTENT SIDE (6 columns) ═══ */}
                    <div ref={contentRef} className="lg:col-span-6 space-y-12">

                        {/* Section Title */}
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                            className="space-y-4"
                        >
                            <span
                                className="text-xs font-mono tracking-[0.5em] uppercase"
                                style={{ color: GOLD, fontFamily: 'var(--font-heebo), sans-serif' }}
                            >
                                {founderData.label}
                            </span>
                            <h2
                                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight leading-[0.9]"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {founderData.title}
                            </h2>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={isContentInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                className="w-24 h-[3px] ltr:origin-left rtl:origin-right"
                                style={{ background: GOLD }}
                            />
                        </motion.div>

                        {/* Statistics Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                            className="grid grid-cols-2 gap-8 md:gap-12"
                        >
                            {/* Years */}
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="text-5xl md:text-6xl lg:text-7xl font-bold"
                                        style={{ color: GOLD, fontFamily: 'var(--font-montserrat), sans-serif' }}
                                    >
                                        <GlowingCounter value={15} />
                                    </span>
                                    <span
                                        className="text-3xl md:text-4xl font-bold text-white"
                                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                    >+</span>
                                </div>
                                <p
                                    className="text-sm text-white/50 uppercase tracking-[0.2em] font-mono"
                                    style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                                >
                                    {founderData.stats.years}
                                </p>
                            </div>

                            {/* Projects */}
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="text-5xl md:text-6xl lg:text-7xl font-bold"
                                        style={{ color: GOLD, fontFamily: 'var(--font-montserrat), sans-serif' }}
                                    >
                                        <GlowingCounter value={500} duration={3} />
                                    </span>
                                    <span
                                        className="text-3xl md:text-4xl font-bold text-white"
                                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                    >+</span>
                                </div>
                                <p
                                    className="text-sm text-white/50 uppercase tracking-[0.2em] font-mono"
                                    style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                                >
                                    {founderData.stats.projects}
                                </p>
                            </div>
                        </motion.div>

                        {/* Quote Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="relative p-8 md:p-10 rounded-2xl overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                backdropFilter: 'blur(20px)',
                                border: `1px solid rgba(255,255,255,0.08)`,
                            }}
                        >
                            {/* Subtle gold accent line */}
                            <div
                                className="absolute top-0 start-0 w-1 h-full"
                                style={{ background: `linear-gradient(180deg, ${GOLD} 0%, transparent 100%)` }}
                            />

                            <TypewriterQuote text={founderData.manifesto} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
