'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { TextReveal } from '@/components/motion/TextReveal';
import { cn } from '@/lib/utils';

export default function MethodPage() {
    const t = useTranslations('MethodPage');
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

                {/* 2. THE PHILOSOPHY (Tanya & Duality) */}
                <section className="mb-32 relative text-slate-200 font-light leading-relaxed">
                    <div className="max-w-4xl mx-auto space-y-24">

                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                                {t('philosophy.title')}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                        </div>

                        {/* Block 1: Tanya */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={fadeInUp}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-serif text-amber-400 font-bold mb-6">
                                {t('philosophy.blocks.tanya.heading')}
                            </h3>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.tanya.text1')}</p>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.tanya.text2')}</p>

                            <div className="my-10 p-8 border-l-4 border-amber-400 bg-white/5 rounded-r-lg">
                                <p className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight text-right mr-4" dir="rtl">
                                    {t('philosophy.blocks.tanya.quote_hebrew')}
                                </p>
                                <p className="text-xl md:text-2xl font-serif italic text-amber-400/90 text-right mr-4">
                                    {t('philosophy.blocks.tanya.quote_translation')}
                                </p>
                            </div>

                            <p className="text-lg md:text-xl">{t('philosophy.blocks.tanya.text3')}</p>
                        </motion.div>

                        {/* Block 2: Duality */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={fadeInUp}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-serif text-amber-400 font-bold mb-6">
                                {t('philosophy.blocks.duality.heading')}
                            </h3>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.duality.text1')}</p>
                            <p className="text-lg md:text-xl font-medium text-white">{t('philosophy.blocks.duality.text2')}</p>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.duality.text3')}</p>
                        </motion.div>

                        {/* Block 3: Benoni */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={fadeInUp}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-serif text-amber-400 font-bold mb-6">
                                {t('philosophy.blocks.benoni.heading')}
                            </h3>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.benoni.text1')}</p>
                            <p className="text-lg md:text-xl font-medium text-white">{t('philosophy.blocks.benoni.text2')}</p>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.benoni.text3')}</p>
                        </motion.div>

                        {/* Block 4: SEDER */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={fadeInUp}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-serif text-amber-400 font-bold mb-6">
                                {t('philosophy.blocks.seder.heading')}
                            </h3>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.seder.text1')}</p>
                            <p className="text-lg md:text-xl">{t('philosophy.blocks.seder.text2')}</p>
                        </motion.div>

                        {/* Concluding Quote */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mt-20 bg-white/5 border border-white/10 p-12 rounded-sm text-center"
                        >
                            <p className="text-2xl md:text-4xl font-serif italic text-white leading-normal">
                                {t('quote')}
                            </p>
                        </motion.div>

                    </div>
                </section>


                {/* 3. LA METHODE SEDER (5 Pillars) */}
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

                {/* 4. APPLICATIONS */}
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

                {/* 5. SEDER AU QUOTIDIEN */}
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

                {/* 6. CONCLUSION */}
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

                        <p className="text-xl md:text-3xl text-slate-400 font-serif leading-relaxed max-w-3xl mx-auto italic mt-12">
                            {t('conclusion.p2')}
                        </p>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
