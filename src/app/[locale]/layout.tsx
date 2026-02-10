import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { montserrat, heebo } from '@/app/fonts';
import '@/app/globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Metadata } from 'next';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: {
            template: '%s | Seder Group',
            default: t('defaultTitle'),
        },
        description: t('defaultDescription'),
        manifest: '/manifest.json',
        icons: {
            icon: '/images/logo.webp',
            apple: '/images/logo.webp',
        },
        openGraph: {
            title: t('defaultTitle'),
            description: t('defaultDescription'),
            images: [
                {
                    url: '/images/logo.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Seder Group Logo',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('defaultTitle'),
            description: t('defaultDescription'),
            images: ['/images/logo.webp'],
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Provide all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    const direction = locale === 'he' ? 'rtl' : 'ltr';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        name: 'Seder Group',
        legalName: 'Seder Group Ltd.',
        url: 'https://seder-group.com',
        logo: 'https://seder-group.com/images/logo.webp',
        description: "Holding de luxe spécialisée dans l'événementiel, la production musicale et la conciergerie privée pour UHNWI.",
        foundingDate: '2020',
        founders: [
            {
                '@type': 'Person',
                name: 'Raphael Skouri'
            }
        ],
        foundingLocation: {
            '@type': 'Place',
            name: 'Jerusalem, Israel'
        },
        areaServed: 'Global',
        sameAs: [
            'https://www.instagram.com/seder.group/',
            'https://www.linkedin.com/company/sedergroup/',
            'https://x.com/SEDER_GR0UP'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+972-52-754-8759',
            contactType: 'corporate headquarters',
            availableLanguage: ['English', 'French', 'Hebrew']
        }
    };

    return (
        <html lang={locale} dir={direction} className={`${montserrat.variable} ${heebo.variable}`}>
            <body className="antialiased bg-black text-white selection:bg-white/20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <NextIntlClientProvider messages={messages}>
                    <Header locale={locale} />
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
