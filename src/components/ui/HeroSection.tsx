'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { cn } from '@/lib/utils';
import { TextReveal } from '@/components/motion/TextReveal';

interface HeroSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: any;
    theme?: 'light' | 'dark';
    codedEnvironment?: boolean;
}

export function HeroSection({
    dict,
    theme = 'dark',
    codedEnvironment = false,
}: HeroSectionProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isDark = theme === 'dark';

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

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

            {/* Main Content Container */}
            <motion.div
                className="container mx-auto px-4 flex flex-col items-center text-center z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Holding Badge */}
                <motion.div variants={fadeUpVariants} className="mb-8">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                        <span
                            className="text-xs font-medium tracking-widest text-white uppercase"
                            style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                        >
                            {heroContent.badge}
                        </span>
                    </div>
                </motion.div>

                {/* 2. Masterpiece Title */}
                <motion.h1
                    variants={fadeUpVariants}
                    className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter mb-6 drop-shadow-xl"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    {heroContent.title}
                </motion.h1>

                {/* 3. Elegant Separator */}
                <motion.div variants={fadeUpVariants} className="w-24 h-[1px] bg-white/30 mb-8" />

                {/* 4. Subtitle */}
                <div className="mb-4">
                    <TextReveal
                        className="text-sm md:text-lg lg:text-xl font-medium text-slate-300 uppercase tracking-[0.3em]"
                        delay={0.8}
                    >
                        {heroContent.subtitle}
                    </TextReveal>
                </div>

                {/* 5. Motto */}
                <motion.p
                    variants={fadeUpVariants}
                    className="text-lg md:text-2xl text-slate-200 font-serif italic opacity-90"
                >
                    &quot;{heroContent.motto}&quot;
                </motion.p>
            </motion.div>

            {/* 6. Scroll Indicator */}
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
