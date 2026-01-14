import { Metadata } from 'next';
import BusinessClient from './BusinessClient';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BusinessPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function BusinessPage() {
    return <BusinessClient />;
}
