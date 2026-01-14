import { Metadata } from 'next';
import UhnwiClient from './UhnwiClient';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'UHNWIPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function UHNWIPage() {
    return <UhnwiClient />;
}
