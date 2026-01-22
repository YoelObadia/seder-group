'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useRouter } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { verticals } from '@/data/verticals';

import Image from 'next/image';

const gateways = [
    {
        id: 'music',
        vertical: verticals.music,
        href: '/music',
        bgClass: 'bg-black',
        img: '/images/music-card2.webp', // Music/Stage
        logo: '/images/music-logo(1).webp'
    },
    {
        id: 'events',
        vertical: verticals.events,
        href: '/events',
        bgClass: 'bg-[#d4c5a3]',
        img: '/images/events.webp', // Elegant/Event
        logo: '/images/events-logo(1).webp'
    },
    {
        id: 'uhnwi',
        vertical: verticals.uhnwi,
        href: '/uhnwi',
        bgClass: 'bg-[#dbb369]',
        img: '/images/uhnwi.webp', // Luxury/Gold
        logo: '/images/uhnwi-logo(1).webp'
    },
    {
        id: 'business',
        vertical: verticals.business,
        href: '/business',
        bgClass: 'bg-slate-900',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Corporate/Abstract
        logo: '/images/business-logo(1).webp'
    }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GatewaySection({ dict }: { dict: any }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const router = useRouter();

    // Fallback
    const t = dict?.home?.gateway || { enter: 'Entrer', explore: 'Explorer' };

    return (
        <section className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-black overflow-hidden relative" id="gateway">
            {gateways.map((item) => {
                const isHovered = hoveredId === item.id;
                const flexValue = isHovered ? 3 : 1;

                return (
                    <motion.div
                        key={item.id}
                        layout
                        className={cn(
                            "relative flex flex-col justify-end p-8 md:p-12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] border-b md:border-b-0 md:border-e border-white/5 last:border-0 cursor-pointer overflow-hidden group min-h-[35vh] md:min-h-0",
                        )}
                        style={{ flex: typeof window !== 'undefined' && window.innerWidth >= 768 ? flexValue : 'none' }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => router.push(item.href)}
                    >
                        {/* Background with zoom */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                            style={{
                                backgroundImage: `url(${item.img})`,
                                transform: isHovered ? 'scale(1.1)' : 'scale(1.0)',
                                filter: isHovered ? 'brightness(0.6)' : 'brightness(0.4) grayscale(50%)'
                            }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />



                        {/* Content */}
                        <div className="relative z-10 w-full">
                            <motion.div
                                layout="position"
                                className="mb-4 md:mb-6 origin-bottom-left rtl:origin-bottom-right"
                            >
                                <div className="relative h-20 w-40 md:h-32 md:w-64 lg:h-40 lg:w-80 max-w-[90%]">
                                    <Image
                                        src={item.logo}
                                        alt={item.id}
                                        fill
                                        className="object-contain object-left-bottom rtl:object-right-bottom drop-shadow-lg"
                                        sizes="(max-width: 768px) 160px, 320px"
                                    />
                                </div>
                            </motion.div>

                            <AnimatePresence mode='wait'>
                                {isHovered ? (
                                    <motion.div
                                        key="expanded"
                                        initial={{ opacity: 0, height: 0, y: 10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="hidden md:block overflow-hidden"
                                    >
                                        <p className="text-gray-300 mb-6 max-w-sm line-clamp-2 text-sm leading-relaxed">
                                            {dict?.home?.gateway?.items?.[item.id]?.description || item.vertical.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-[10px] group-hover:bg-white group-hover:text-black transition-all duration-300">
                                            {t.enter}
                                            <ArrowRight size={14} className="rtl:rotate-180" />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="collapsed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="hidden md:flex items-center gap-2 text-white/50 uppercase tracking-[0.2em] text-[10px] font-medium mt-2"
                                    >
                                        <span>{t.explore}</span>
                                        <ArrowRight size={14} className="animate-pulse rtl:rotate-180" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Mobile CTA - Always visible and distinctive */}
                            <div className="md:hidden mt-6">
                                <span className="inline-flex w-full justify-between items-center px-4 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                                    {t.enter}
                                    <ArrowRight size={16} className="rtl:rotate-180" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}
