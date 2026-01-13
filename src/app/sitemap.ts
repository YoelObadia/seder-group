import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://seder-group.com';
    const lastModified = new Date();

    const locales = ['en', 'fr', 'he'] as const;
    const paths = [
        { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/music', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/events', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/business', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/uhnwi', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add root (x-default behavior usually handled by alternates, but good to have)
    // Here we just map all localized versions explicitly

    for (const locale of locales) {
        for (const { path, priority, changeFrequency } of paths) {
            // Check if it's the root path to avoid double slashes if needed, 
            // but usually /en is what we want, and /en/about
            const fullUrl = path === ''
                ? `${baseUrl}/${locale}`
                : `${baseUrl}/${locale}${path}`;

            sitemapEntries.push({
                url: fullUrl,
                lastModified,
                changeFrequency,
                priority,
            });
        }
    }

    return sitemapEntries;
}
