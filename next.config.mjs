import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Active experimental features if needed for View Transitions (native in 15+ usually, but keeping strictly minimal as requested)
    experimental: {
        // viewTransition: true // Often not needed explicitly in 15+ App Router for basic VT API usage, but good to have if specific flag required. Leaving standard for now.
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
};

export default withNextIntl(nextConfig);
