import { VerticalShowcase } from '@/types';

export const verticals: Record<string, VerticalShowcase> = {
    events: {
        id: 'events',
        title: 'Seder Events',
        description: 'Creating unforgettable moments through precision and elegance.',
        brands: [
            {
                name: 'Kotel Event',
                description: 'Premium religious and private celebrations at the Western Wall.',
                url: 'https://kotel-event.com',
                image: '/images/ke-card.webp' // Placeholder
            }
        ]
    },
    uhnwi: {
        id: 'uhnwi',
        title: 'Seder UHNWI',
        description: 'Exclusivity redefined for the few.',
        brands: [
            {
                name: 'UHNWI',
                description: 'Exclusive event planning for Ultra-High-Net-Worth Individuals.',
                url: 'https://luxury-israel-event.com', // Fictional link as requested
                image: '/images/uhnwi-card.webp' // Placeholder
            }
        ]
    },
    business: {
        id: 'business',
        title: 'Seder Business',
        description: 'Strategic excellence for the modern entertainment landscape.',
        brands: [
            {
                name: 'Consulting',
                description: 'Expert guidance on market penetration and growth.',
                url: 'https://seder-business.vercel.app',
                image: '/images/business-card.webp'
            },
            {
                name: 'Conciergerie',
                description: 'Luxury lifestyle management and corporate solutions.',
                url: 'https://seder-concierge.com',
                image: '/images/concierge-card.webp'
            }
        ]
    },
    music: {
        id: 'music',
        title: 'Seder Music',
        description: 'A global label amplifying the voices of tomorrow.',
        brands: [
            {
                name: 'Seder Music',
                description: 'Discover our roster and latest releases.',
                url: 'https://seder-musique.vercel.app',
                image: '/images/music-card.webp'
            }
        ]
    }
};
