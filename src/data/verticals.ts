import { VerticalShowcase } from '@/types';

export const verticals: Record<string, VerticalShowcase> = {
    events: {
        id: 'events',
        title: 'Seder Events',
        description: 'description',
        brands: [
            {
                name: 'Kotel Event',
                description: 'kotel_event',
                url: 'https://kotel-event.com',
                image: '/images/ke-card.webp' // Placeholder
            },
            {
                name: 'Concierge',
                description: 'conciergerie',
                url: 'https://concierge-seder.com',
                image: '/images/concierge-card.webp'
            }
        ]
    },
    business: {
        id: 'business',
        title: 'Seder Business',
        description: 'description',
        brands: [
            {
                name: 'Consulting',
                description: 'consulting',
                url: 'https://seder-business.com',
                image: '/images/business-card.webp'
            },
            {
                name: 'UHNWI',
                description: 'uhnwi',
                url: 'https://luxury-israel-event.com', // Fictional link as requested
                image: '/images/uhnwi-card.webp' // Placeholder
            }
        ]
    },
    music: {
        id: 'music',
        title: 'Seder Music',
        description: 'description',
        brands: [
            {
                name: 'Seder Music',
                description: 'seder_music',
                url: 'https://seder-music.com',
                image: '/images/music-card.webp'
            }
        ]
    }
};
