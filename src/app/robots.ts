import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/private/',
                    '/legal/',
                    '/*?*', // Block URL parameters
                ],
            },
            {
                userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
                disallow: '/',
            },
        ],
        sitemap: 'https://seder-group.com/sitemap.xml',
    };
}
