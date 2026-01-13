'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VisionSection({ dict }: { dict: any }) {

    // Safety check
    if (!dict?.home?.vision) return null;
    const vision = dict.home.vision;

    return (
        <section className="relative w-full min-h-screen py-24 md:py-0 bg-[#0f172a] flex flex-col items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN - IDENTITY */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative ps-8 md:ps-10"
                    >
                        {/* Gold Vertical Line Signature */}
                        <div className="absolute start-0 top-1 w-[2px] h-full max-h-[160px] bg-amber-400" />

                        <div className="space-y-6">
                            <span
                                className="block text-xs font-bold tracking-[0.25em] text-amber-500/80 uppercase"
                                style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                            >
                                {vision.label}
                            </span>

                            <h2
                                className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] font-serif"
                                dangerouslySetInnerHTML={{ __html: vision.title }}
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN - CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-8 md:gap-10 pt-2 lg:pt-4"
                    >
                        <div className="space-y-6">
                            <p
                                className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                dangerouslySetInnerHTML={{ __html: vision.pitch }}
                            />

                            <div className="pt-4">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors group"
                                >
                                    <span
                                        className="text-sm md:text-base font-bold uppercase tracking-widest border-b border-amber-400/30 group-hover:border-amber-300 pb-1"
                                        style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
                                    >
                                        {vision.mission}
                                    </span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 duration-300" />
                                </Link>
                            </div>
                        </div>

                        {/* Footer / Cities List */}
                        <div className="mt-4 pt-8 border-t border-slate-800">
                            <p
                                className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {vision.cities}
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
