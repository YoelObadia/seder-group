import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';
import { ExternalLinkCard } from '@/components/shared/ExternalLinkCard';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/shared/BackButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Seder Events | Wedding Planner Luxe & Bar Mitzvah Kotel',
    description: 'Organisation d\'événements d\'exception en Israël. Mariages de prestige, Bar Mitzvah au Kotel et événements corporate sur-mesure par Seder Group.',
};

export default function EventsPage() {
    const t = useTranslations('EventsPage');
    const { events } = verticals;
    const kotelEvent = events.brands.find(b => b.name === 'Kotel Event') || events.brands[0];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        additionalType: 'https://schema.org/EventPlanner',
        name: 'Seder Events',
        url: 'https://seder-group.com/events',
        image: 'https://seder-group.com/images/events-cover.jpg',
        description: 'Luxury Wedding and Bar Mitzvah Planner in Israel.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jerusalem',
            addressCountry: 'IL'
        },
        priceRange: '$$$$',
        telephone: '+972 52-754-8759'
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 py-24 px-4 md:px-8 flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BackButton theme="light" />

            {/* Header / Intro */}
            <header className="max-w-4xl mx-auto text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-tight"
                >
                    {t('title')}
                </motion.h1>

                <div className="w-24 h-1 bg-slate-900 mx-auto mb-10" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed font-light"
                >
                    <p>{t('intro')}</p>
                    <p className="font-normal text-slate-800">{t('approach')}</p>
                </motion.div>
            </header>

            {/* Expertise Section */}
            <section className="max-w-6xl mx-auto mb-24 w-full">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900"
                >
                    {t('expertise_title')}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        { title: 'point1_title', desc: 'point1_desc' },
                        { title: 'point2_title', desc: 'point2_desc' },
                        { title: 'point3_title', desc: 'point3_desc' },
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                            className="text-center p-6 border-l md:border-l-0 md:border-t border-slate-200 pt-6"
                        >
                            <h3 className="text-xl font-bold mb-3 text-slate-900 uppercase tracking-wide">{t(item.title)}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {t(item.desc)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Conclusion */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center text-lg md:text-xl text-slate-800 italic font-serif mb-24 leading-relaxed"
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
                        title={kotelEvent.name}
                        description={t('cta')}
                        url={kotelEvent.url}
                        image={kotelEvent.image}
                        className="shadow-2xl aspect-[3/4]"
                    />
                </motion.div>
            </section>
        </div>
    );
}
