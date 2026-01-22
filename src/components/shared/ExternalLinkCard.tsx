'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface ExternalLinkCardProps {
    title: string;
    description?: string;
    url: string;
    image: string;
    className?: string;
}

export function ExternalLinkCard({ title, description, url, image, className }: ExternalLinkCardProps) {
    const t = useTranslations('home.gateway');

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative block w-full aspect-[3/5] md:aspect-[3/4] overflow-hidden rounded-2xl",
                className
            )}
        >
            {/* Background Image with Zoom Effect */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Dark Overlay - Darker on mobile for readability, dynamic on desktop */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/40 md:group-hover:bg-black/50 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end text-white">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full"
                >
                    <div className="flex flex-col gap-3 md:gap-4 w-full">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl md:text-3xl font-serif font-bold text-white max-w-[90%] md:max-w-[80%] leading-tight">{title}</h3>
                            {/* Desktop Icon Hint */}
                            <div className="hidden md:block bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowUpRight size={24} className="rtl:-rotate-90 text-white" />
                            </div>
                        </div>

                        {/* Description (Optional) */}
                        {description && (
                            <p className="text-sm text-gray-300 line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                {description}
                            </p>
                        )}

                        {/* Explicit CTA Button - Always visible on Mobile, Fade/Slide on Desktop */}
                        <div className="mt-2">
                            {/* Mobile: Always visible button */}
                            <div className="md:hidden inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-bold uppercase tracking-widest text-xs w-full justify-between">
                                <span>{t('enter')}</span>
                                <ArrowRight size={16} className="rtl:rotate-180" />
                            </div>

                            {/* Desktop: Text link that becomes button or highlighted */}
                            <div className="hidden md:inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-[10px] group-hover:bg-white group-hover:text-black transition-all duration-300">
                                {t('enter')}
                                <ArrowRight size={14} className="rtl:rotate-180" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </a>
    );
}
