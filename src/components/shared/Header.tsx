'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Globe removed
import { LanguageSelector } from './LanguageSelector'; // Import component
import { cn } from '@/lib/utils';

export function Header({ locale }: { locale: string }) {
    const t = useTranslations('Navigation');
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    // useRouter logic handled inside LanguageSelector now

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine theme based on path (simple heuristic)
    const isBusiness = pathname.includes('/business');
    const isMusic = pathname.includes('/music');
    const isEvents = pathname.includes('/events');
    const isUHNWI = pathname.includes('/uhnwi');

    // Dynamic styling
    const headerClass = cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        // Default: Transparent/Dark Theme
        scrolled ? "py-3 backdrop-blur-md" : "py-4 md:py-6 bg-transparent border-transparent",

        // Events (White Theme) override
        isEvents
            ? scrolled
                ? "bg-white/90 border-slate-200 text-slate-900 shadow-sm"
                : "text-slate-900 border-transparent"
            : scrolled
                ? "bg-black/60 border-white/5 text-white"
                : "text-white border-white/5",

        // Specific overrides for Business/UHNWI on scroll (Light header on Dark page)
        !isEvents && (isBusiness || isUHNWI) && scrolled && "bg-white/80 border-gray-200 text-slate-900"
    );

    const navLinks = [
        { href: '/', label: 'home' },
        { href: '/about', label: 'about' },
        { href: '/music', label: 'music' },
        { href: '/events', label: 'events' },
        { href: '/uhnwi', label: 'uhnwi' },
        { href: '/business', label: 'business' },
    ];

    function toggleLanguage(event: MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <header className={headerClass}>
            <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 z-50 relative shrink-0 group">
                    <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                            src="/images/logo.webp"
                            alt="Seder Group Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter group-hover:opacity-80 transition-opacity">
                        SEDER GROUP
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-xs lg:text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity",
                                pathname === link.href && "opacity-100 border-b border-current"
                            )}
                        >
                            {t(link.label)}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <LanguageSelector forceDark={!!(isEvents || (scrolled && (isBusiness || isUHNWI)))} />
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu - Full Screen Responsive */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-6 md:hidden h-dvh overflow-y-auto py-20"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl sm:text-4xl font-serif font-light text-white hover:text-gray-300 transition-colors"
                                >
                                    {t(link.label)}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
