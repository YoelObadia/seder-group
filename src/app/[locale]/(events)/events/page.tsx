import { Metadata } from 'next';
import EventsClient from './EventsClient';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'EventsPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function EventsPage() {
    return <EventsClient />;
}
