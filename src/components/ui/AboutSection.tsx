'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface AboutSectionProps {
    title: string;
    description: string;
    image: string; // URL for now
    inverted?: boolean; // If true, image is on the left (desktop)
}

export function AboutSection({ title, description, image, inverted = false }: AboutSectionProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const locale = useLocale();
    const isRtl = locale === 'he';

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className={cn(
                    "flex flex-col-reverse md:items-center gap-12 md:gap-24",
                    inverted ? "md:flex-row-reverse" : "md:flex-row"
                )}>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: inverted ? (isRtl ? -50 : 50) : (isRtl ? 50 : -50) }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 leading-tight">
                            {title}
                        </h2>
                        <div className="h-0.5 w-16 bg-[var(--color-business)]" />
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            {description}
                        </p>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full aspect-[4/3] relative overflow-hidden rounded-sm"
                    >
                        {/* Using img for external consistency with other prompts, but structured for Image if available */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
