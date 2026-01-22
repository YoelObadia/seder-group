'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TextReveal } from '@/components/motion/TextReveal';

const HeroBackground = dynamic(() => import('./HeroBackground').then(mod => mod.HeroBackground), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0a0520]" />
});

interface HeroSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: any;
    theme?: 'light' | 'dark';
    codedEnvironment?: boolean;
}

export function HeroSection({
    dict,
    theme = 'dark', // eslint-disable-line @typescript-eslint/no-unused-vars
    codedEnvironment = false,
}: HeroSectionProps) {

    // Fallback if dict is missing
    const heroContent = dict?.home?.hero || {
        badge: "HOLDING",
        title: "SEDER GROUP",
        subtitle: "BUSINESS • EVENTS • MUSIC",
        motto: "Orchestrating Excellence."
    };

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10">
            {/* Background Layer (Dark Satin Gyroid) */}
            {codedEnvironment && (
                <div className="absolute inset-0 z-0">
                    <HeroBackground />
                </div>
            )}

            {/* Main Content Container - Using Standard HTML for LCP/FCP Optimization */}
            {/* Removed motion.div container to prevent initial opacity: 0 blocking paint */}
            <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">

                {/* 1. Holding Badge - CSS Animation */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                        <span
                            className="text-xs font-medium tracking-widest text-white uppercase"
                            style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                        >
                            {heroContent.badge}
                        </span>
                    </div>
                </div>

                {/* 2. Masterpiece Title - LCP ELEMENT - CSS Animation */}
                <h1
                    className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter mb-6 drop-shadow-xl animate-fade-in-up delay-100 opacity-0 fill-mode-forwards"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    {heroContent.title}
                </h1>

                {/* 3. Elegant Separator - CSS Animation */}
                <div className="w-24 h-[1px] bg-white/30 mb-8 animate-fade-in-up delay-200 opacity-0 fill-mode-forwards" />

                {/* 4. Subtitle - Client Side Text Reveal (Acceptable to be delayed slightly) */}
                <div className="mb-4">
                    <TextReveal
                        className="text-sm md:text-lg lg:text-xl font-medium text-slate-300 uppercase tracking-[0.3em]"
                        delay={0.8}
                    >
                        {heroContent.subtitle}
                    </TextReveal>
                </div>

                {/* 5. Motto - CSS Animation */}
                <p
                    className="text-lg md:text-2xl text-slate-200 font-serif italic opacity-90 animate-fade-in-up delay-300 fill-mode-forwards"
                >
                    &quot;{heroContent.motto}&quot;
                </p>
            </div>

            {/* 6. Scroll Indicator - Kept Motion as it's interactive/decorative */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="animate-bounce">
                    <ChevronDown className="w-8 h-8 text-white/50" strokeWidth={1.5} />
                </div>
            </motion.div>
        </section>
    );
}
