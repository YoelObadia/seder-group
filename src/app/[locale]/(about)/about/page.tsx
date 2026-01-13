'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { TextReveal } from '@/components/motion/TextReveal';
import { cn } from '@/lib/utils';

export default function AboutPage() {
    const t = useTranslations('AboutPage');
    const locale = useLocale();
    const isRtl = locale === 'he';

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-32 pb-24 px-4 md:px-8 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'url("/images/noise.png")' }} // Optional noise texture if available, or just keeping it subtle
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* 1. HERO SECTION */}
                <header className="text-center mb-24 md:mb-32">
                    <div className="mb-6 overflow-hidden">
                        <TextReveal
                            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-2"
                            delay={0.2}
                        >
                            {t('title')}
                        </TextReveal>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <p className="text-lg md:text-2xl text-amber-400 font-light tracking-[0.2em] uppercase mb-12"
                            style={{ fontFamily: 'var(--font-heebo), sans-serif' }}>
                            {t('subtitle')}
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                    </motion.div>
                </header>


                {/* 2. INTRO (The Hook) */}
                <section className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={fadeInUp}
                        className="space-y-8"
                    >
                        <p className="text-2xl md:text-4xl leading-relaxed font-serif text-slate-200">
                            {t('p1')}
                        </p>
                        <p className="text-xl md:text-2xl leading-relaxed text-slate-400 font-light">
                            {t('p2')}
                        </p>
                    </motion.div>
                </section>


                {/* 3. THE STORY (Editorial Grid) */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24 md:mb-32 items-start">
                    {/* Left Column (Sticky Title or Accent) */}
                    <div className="md:col-span-4 md:sticky md:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <span className={cn(
                                "text-6xl md:text-9xl font-serif text-white/5 absolute -top-8 -z-10 select-none",
                                isRtl ? "-right-2 md:-right-8" : "-left-2 md:-left-8"
                            )}>
                                SEDER
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">
                                {t('sidebar_title')}
                            </h3>
                            <div className="w-12 h-1 bg-amber-500 mb-6" />
                        </motion.div>
                    </div>

                    {/* Right Column (Narrative) */}
                    <div className="md:col-span-8 space-y-12">
                        {['p3', 'p4', 'p5', 'p6', 'p7'].map((key, i) => (
                            <motion.div
                                key={key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={fadeInUp}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p className={cn(
                                    "text-lg md:text-xl leading-8 text-slate-300 font-light",
                                    i === 0 && "first-letter:text-5xl first-letter:font-serif first-letter:text-amber-400 first-letter:float-start first-letter:me-3 first-letter:mt-1"
                                )}>
                                    {t(key)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>


                {/* 4. SYNTHESIS (Blockquote) */}
                <section className="max-w-5xl mx-auto mb-24 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-white/5 border border-white/10 p-12 md:p-20 rounded-sm text-center"
                    >
                        <span className="text-6xl font-serif text-amber-400/20 absolute top-8 left-8">“</span>
                        <p className="text-2xl md:text-4xl font-serif italic text-white leading-normal relative z-10">
                            {t('p8')}
                        </p>
                        <span className="text-6xl font-serif text-amber-400/20 absolute bottom-8 right-8">”</span>
                    </motion.div>
                </section>


                {/* 5. CONCLUSION */}
                <section className="max-w-3xl mx-auto text-center space-y-12 mb-20">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-slate-400 leading-relaxed"
                    >
                        {t('p9')}
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="pt-12"
                    >
                        <p className="text-3xl md:text-5xl font-serif text-amber-400 tracking-wide">
                            {t('closing')}
                        </p>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
