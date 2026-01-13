'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ExternalLinkCardProps {
    title: string;
    description?: string;
    url: string;
    image: string;
    className?: string;
}

export function ExternalLinkCard({ title, description, url, image, className }: ExternalLinkCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative block w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl",
                className
            )}
        >
            {/* Background Image with Zoom Effect */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full"
                >
                    <div className="flex items-end justify-between w-full">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">{title}</h3>
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight size={24} className="rtl:-rotate-90 text-white" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </a>
    );
}
