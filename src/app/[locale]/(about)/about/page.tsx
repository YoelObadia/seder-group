'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    const paragraphs = [
        'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-32 px-4 md:px-8 flex flex-col items-center">
            {/* Header */}
            <header className="max-w-4xl mx-auto text-center mb-20 w-full">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 tracking-tight text-amber-400"
                >
                    {t('title')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl md:text-2xl text-slate-300 font-light italic mb-12"
                    style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                >
                    {t('subtitle')}
                </motion.p>

                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-20" />

                <div className="space-y-10 text-lg md:text-xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto text-start">
                    {paragraphs.map((key, index) => (
                        <motion.p
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: index * 0.05, duration: 0.6 }}
                        >
                            {t(key)}
                        </motion.p>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="pt-12 text-center"
                    >
                        <p className="text-2xl md:text-3xl font-serif text-amber-400">
                            {t('closing')}
                        </p>
                    </motion.div>
                </div>
            </header>
        </div>
    );
}
