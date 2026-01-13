import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { montserrat, heebo } from '@/app/fonts';
import '@/app/globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
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

    return (
        <html lang={locale} dir={direction} className={`${montserrat.variable} ${heebo.variable}`}>
            <body className="antialiased bg-black text-white selection:bg-white/20">
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
