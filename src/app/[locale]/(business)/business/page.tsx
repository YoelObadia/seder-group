import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';
import { ExternalLinkCard } from '@/components/shared/ExternalLinkCard';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/shared/BackButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Seder Business | Conciergerie Corporate & Lifestyle Manager Israël',
    description: 'Services B2B exclusifs et gestion de patrimoine. Conciergerie d\'entreprise, consulting immobilier et relocation VIP à Tel Aviv et Jérusalem.',
};

export default function BusinessPage() {
    const t = useTranslations('BusinessPage');
    const { business } = verticals;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Seder Business',
        url: 'https://seder-group.com/business',
        description: 'Premium Corporate Concierge and Real Estate Consulting in Israel.',
        areaServed: 'Israel',
        serviceType: ['Corporate Concierge', 'Real Estate Consulting', 'Relocation']
    };

    return (
        <div className="min-h-screen text-white py-24 px-4 md:px-8 flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BackButton theme="dark" />
            {/* Header / Intro */}
            <header className="max-w-4xl mx-auto text-center mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-tight text-white"
                >
                    {t('title')}
                </motion.h1>

                <div className="w-24 h-1 bg-blue-800 mx-auto mb-10" />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-12"
                >
                    {t('intro')}
                </motion.p>
            </header>

            {/* Core Value Pillars */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                {[
                    { title: 'mediation_title', desc: 'mediation_desc' },
                    { title: 'network_title', desc: 'network_desc' },
                    { title: 'realty_title', desc: 'realty_desc' },
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">{t(item.title)}</h3>
                        <p className="text-slate-400 leading-relaxed text-base">
                            {t(item.desc)}
                        </p>
                    </motion.div>
                ))}
            </section>

            {/* CTA Section - Dual Cards */}
            <section className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {business.brands.map((brand, index) => (
                    <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.8 }}
                        className="w-full max-w-xs mx-auto"
                    >
                        <ExternalLinkCard
                            title={brand.name}
                            description={brand.description}
                            url={brand.url}
                            image={brand.image}
                            className="shadow-2xl aspect-[3/4]"
                        />
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
