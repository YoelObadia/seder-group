"use client";

import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';
import { ExternalLinkCard } from '@/components/shared/ExternalLinkCard';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/shared/BackButton';

export default function UhnwiClient() {
    const t = useTranslations('UHNWIPage');
    const { uhnwi } = verticals;

    const mainBrand = uhnwi.brands[0];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Seder UHNWI Services',
        url: 'https://seder-group.com/uhnwi',
        description: 'Exclusive Lifestyle Management and Family Office Services for UHNWI in Israel.',
        provider: {
            '@type': 'Organization',
            name: 'Seder Group'
        },
        serviceType: 'Luxury Lifestyle Management',
        areaServed: 'Global'
    };

    return (
        <div className="min-h-screen bg-black text-white pt-40 pb-24 md:py-24 px-4 md:px-8 flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BackButton theme="dark" className="text-amber-400 border-amber-400/20 bg-black/40 hover:bg-amber-400/10" />
            {/* Header / Intro */}
            <header className="max-w-4xl mx-auto text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl md:text-7xl font-serif font-medium mb-8 tracking-tight text-[#dbb369]"
                >
                    {t('title')}
                </motion.h1>

                <div className="w-24 h-1 bg-[#dbb369] mx-auto mb-12" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                >
                    <p className="text-white font-medium">{t('intro')}</p>
                    <p>{t('service_desc')}</p>
                </motion.div>
            </header>

            {/* Promise Section */}
            <section className="max-w-3xl mx-auto text-center mb-24 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[#dbb369] to-transparent opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="pt-24"
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-[#dbb369] mb-8">{t('promise_title')}</h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light px-4 md:px-12 border-s-2 border-[#dbb369]/30 md:border-s-0 inline-block">
                        {t('promise_desc')}
                    </p>
                </motion.div>
            </section>

            {/* Conclusion */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center text-lg md:text-xl text-[#dbb369] italic font-serif mb-24 leading-relaxed"
            >
                "{t('conclusion')}"
            </motion.p>

            {/* CTA Section */}
            <section className="w-full max-w-xs mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full"
                >
                    <ExternalLinkCard
                        title={mainBrand.name}
                        description={t(`brands.${mainBrand.description}`)}
                        url={mainBrand.url}
                        image={mainBrand.image}
                        className="shadow-2xl shadow-[#dbb369]/10 aspect-[3/4] border border-[#dbb369]/20"
                    />
                </motion.div>
            </section>
        </div>
    );
}
