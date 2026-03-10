'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { TextReveal } from '@/components/motion/TextReveal';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AboutPage() {
    const t = useTranslations('AboutPage');
    const locale = useLocale();
    const isRtl = locale === 'he';

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-32 pb-24 px-4 md:px-8 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'url("/images/noise.png")' }}
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
                        {['p3', 'p4', 'p5', 'p6'].map((key, i) => (
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
                                    {key === 'p3' && (
                                        <a
                                            href={t('artist_link')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 ms-3 text-amber-400 hover:text-amber-300 transition-colors duration-300 font-serif group"
                                        >
                                            <span className="underline underline-offset-4 decoration-amber-400/30 group-hover:decoration-amber-300">{t('artist_label')}</span>
                                            <span className={cn(
                                                "transition-transform duration-300 group-hover:translate-x-1",
                                                isRtl && "rotate-180 group-hover:-translate-x-1"
                                            )}>
                                            </span>
                                        </a>
                                    )}
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
                        <span className="text-6xl font-serif text-amber-400/20 absolute top-8 start-8">“</span>
                        <p className="text-2xl md:text-4xl font-serif italic text-white leading-normal relative z-10">
                            {t('quote1')}
                        </p>
                        <span className="text-6xl font-serif text-amber-400/20 absolute bottom-8 end-8">”</span>
                    </motion.div>
                </section>

                {/* 5. TENSION SECTION */}
                <section className="max-w-4xl mx-auto text-center space-y-8 mb-32">
                    {['p7', 'p8', 'p9', 'p10'].map((key, i) => (
                        <motion.p
                            key={key}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "text-lg md:text-xl leading-relaxed",
                                key === 'p10' ? "text-amber-400 font-serif text-2xl md:text-3xl mt-12" : "text-slate-300 font-light"
                            )}
                        >
                            {t(key)}
                        </motion.p>
                    ))}
                </section>

                {/* 6. LA METHODE SEDER (5 Pillars) */}
                <section className="mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            {t('method.title')}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
                            {t('method.desc')}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                    >
                        {['s', 'e1', 'd', 'e2', 'r'].map((pillarKey, i) => (
                            <motion.div
                                key={pillarKey}
                                variants={fadeInUp}
                                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors duration-500 group flex flex-col h-full"
                            >
                                <div className="text-6xl font-serif text-amber-400/30 group-hover:text-amber-400 transition-colors duration-500 mb-6">
                                    {t(`method.pillars.${pillarKey}.letter`)}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {t(`method.pillars.${pillarKey}.title`)}
                                </h3>
                                <p className="text-slate-300 font-light leading-relaxed mb-6 flex-grow">
                                    {t(`method.pillars.${pillarKey}.desc`)}
                                </p>
                                {t.has(`method.pillars.${pillarKey}.keywords`) && (
                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <p className="text-sm text-amber-400/80 font-medium tracking-wide">
                                            {t(`method.pillars.${pillarKey}.keywords`)}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 7. APPLICATIONS */}
                <section className="mb-32 bg-slate-900/50 p-8 md:p-16 rounded-sm border border-slate-800">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                            {t('applications.title')}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                            {t('applications.desc')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {['music', 'event', 'business'].map((app, i) => (
                            <motion.div
                                key={app}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="text-center md:text-start"
                            >
                                <div className="w-12 h-1 bg-amber-500 mb-6 mx-auto md:mx-0" />
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide uppercase">
                                    {t(`applications.${app}.title`)}
                                </h3>
                                <p className="text-slate-300 leading-relaxed font-light">
                                    {t(`applications.${app}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 8. SEDER AU QUOTIDIEN */}
                <section className="mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            {t('daily.title')}
                        </h2>
                        <p className="text-xl text-amber-400 font-light uppercase tracking-widest max-w-2xl mx-auto">
                            {t('daily.desc')}
                        </p>
                    </motion.div>

                    <div className="space-y-12">
                        {['level1', 'level2', 'level3'].map((level, i) => (
                            <motion.div
                                key={level}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className={cn(
                                    "grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch bg-white/5 border border-white/10 rounded-sm overflow-hidden",
                                )}
                            >
                                <div className="md:col-span-4 bg-slate-800/50 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-e border-white/10">
                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                        {t(`daily.${level}.title`)}
                                    </h3>
                                </div>
                                <div className="md:col-span-8 p-8 md:p-12">
                                    <p className="text-lg text-slate-300 mb-6 font-light">
                                        {t(`daily.${level}.desc`)}
                                    </p>
                                    <ul className="mb-8 space-y-3">
                                        {(t.raw(`daily.${level}.list`) as string[]).map((item, idx) => (
                                            <li key={idx} className="flex items-start text-slate-400 font-light">
                                                <span className="text-amber-400 me-3 mt-1.5 opacity-70 text-xs">◆</span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-amber-400/80 italic font-serif">
                                        {t(`daily.${level}.conclusion`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 9. CONCLUSION & QUOTE */}
                <section className="max-w-4xl mx-auto text-center border-t border-white/10 pt-24 mb-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-12"
                    >
                        <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed">
                            {t('conclusion.p1')}
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-lg text-amber-400 font-serif">
                            {(t.raw('conclusion.list') as string[]).map((item, idx) => (
                                <div key={idx} className="flex items-center">
                                    {idx > 0 && <span className="hidden md:inline-block w-8 h-[1px] bg-amber-400/30 mx-6" />}
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
                            {t('conclusion.p2')}
                        </p>

                        <div className="pt-16 pb-8">
                            <p className="text-3xl md:text-5xl font-serif text-white tracking-wide leading-tight italic">
                                {t('conclusion.quote2')}
                            </p>
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
