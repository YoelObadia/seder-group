'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import Flag from 'react-world-flags';

const languages = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'en', label: 'English', flag: 'GB' },
    { code: 'he', label: 'עברית', flag: 'IL' },
];

interface LanguageSelectorProps {
    className?: string;
    forceDark?: boolean;
}

export function LanguageSelector({ className, forceDark }: LanguageSelectorProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        setIsOpen(false);
        // Seamless transition: Replace content without page reload or scroll reset
        router.replace(pathname, { locale: newLocale, scroll: false });
    };

    const currentLang = languages.find((l) => l.code === locale);

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 text-xs font-bold uppercase px-3 py-1.5 rounded-full cursor-pointer transition-colors backdrop-blur-sm border",
                    forceDark
                        ? "border-slate-900/20 text-slate-900 hover:bg-slate-900/5"
                        : "border-white/20 text-white hover:bg-white/10",
                    className
                )}
            >
                <div className="w-4 h-3 relative overflow-hidden rounded-[1px] shadow-sm">
                    <Flag code={currentLang?.flag} alt={currentLang?.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span>{locale.toUpperCase()}</span>
                <ChevronDown
                    size={14}
                    className={cn(
                        "transition-transform duration-200",
                        forceDark ? "text-slate-900/60" : "text-white/60",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>

            {/* Dropdown - Glassmorphism & Logical Positioning */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full mt-2 end-0 w-40 bg-slate-900/95 backdrop-blur-xl border border-white/10 cursor-pointer rounded-xl overflow-hidden shadow-2xl z-[100] py-1"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={cn(
                                    "w-full relative flex items-center justify-center px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/10 cursor-pointer",
                                    locale === lang.code ? "text-white bg-white/5" : "text-white/70"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] shadow-sm">
                                        <Flag code={lang.flag} alt={lang.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <span className={cn(lang.code === 'he' && "font-sans")}>{lang.label}</span>
                                </div>
                                {locale === lang.code && (
                                    <div className="absolute right-3 text-white/50">
                                        <Check size={12} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
