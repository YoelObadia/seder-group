"use client";

import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';
import { ExternalLinkCard } from '@/components/shared/ExternalLinkCard';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/shared/BackButton';

export default function MusicClient() {
    const t = useTranslations('MusicPage');
    const { music } = verticals;
    // Assuming Seder Music Label is the main CTA
    const mainBrand = music.brands.find(b => b.name === 'Seder Music Label') || music.brands[0];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'Seder Music',
        url: 'https://seder-group.com/music',
        logo: 'https://seder-group.com/images/music-logo.png',
        description: 'Elite music production and live bands for luxury events in Israel.',
        genre: ['Jewish Soul', 'Pop', 'Classical', 'Chassidic'],
        location: {
            '@type': 'Place',
            name: 'Tel Aviv, Israel'
        },
        potentialAction: {
            '@type': 'ListenAction',
            target: 'https://seder-group.com/music/demos'
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-40 pb-24 md:py-24 px-4 md:px-8 flex flex-col items-center relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BackButton theme="dark" />
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,black_100%)] pointer-events-none" />

            {/* Header / Intro */}
            <header className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl md:text-7xl font-serif font-medium mb-8 tracking-tight text-white"
                >
                    {t('title')}
                </motion.h1>

                <div className="w-24 h-1 bg-red-600 mx-auto mb-10" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-300 leading-relaxed font-light space-y-8 text-start md:text-center"
                >
                    <p>{t('intro')}</p>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <p className="font-bold text-white mb-6 uppercase tracking-widest text-sm">{t('value_prop')}</p>
                        <ul className="space-y-6 text-base md:text-lg text-start">
                            <li dangerouslySetInnerHTML={{ __html: t.raw('point1') }} />
                            <li dangerouslySetInnerHTML={{ __html: t.raw('point2') }} />
                            <li dangerouslySetInnerHTML={{ __html: t.raw('point3') }} />
                        </ul>
                    </div>

                </motion.div>
            </header>

            {/* CTA Section */}
            <section className="w-full max-w-xs mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full"
                >
                    <ExternalLinkCard
                        title={mainBrand.name}
                        description={mainBrand.description}
                        url={mainBrand.url}
                        image={mainBrand.image}
                        className="shadow-2xl aspect-[3/4] shadow-red-900/20"
                    />
                </motion.div>
            </section>
        </div>
    );
}
