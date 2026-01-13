'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Mail, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 md:py-20 border-t border-slate-900 w-full">
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16 md:mb-24">

                    {/* Brand */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                                <Image
                                    src="/images/logo.webp"
                                    alt="Seder Group Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-white text-2xl md:text-3xl font-serif font-bold tracking-tighter">
                                SEDER GROUP
                            </h3>
                        </div>
                        <p className="text-sm md:text-base max-w-sm leading-relaxed text-slate-400">
                            {t('slogan')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold uppercase text-xs md:text-sm tracking-widest mb-2">{t('explore')}</h4>
                        <div className="flex flex-col gap-3 text-sm md:text-base">
                            <Link href="/business" className="hover:text-white transition-colors w-fit">Business</Link>
                            <Link href="/events" className="hover:text-white transition-colors w-fit">Events</Link>
                            <Link href="/music" className="hover:text-white transition-colors w-fit">Music</Link>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold uppercase text-xs md:text-sm tracking-widest mb-2">{t('contact')}</h4>
                        <a href="mailto:contact@seder-group.com" className="hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base w-fit">
                            <Mail size={18} />
                            contact@seder-group.com
                        </a>
                        <div className="flex gap-6 mt-4">
                            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Linkedin size={24} /></a>
                            <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200"><Twitter size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Legal */}
                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                    <p className="text-center md:text-start">&copy; {new Date().getFullYear()} Seder Group. {t('rights')}</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
