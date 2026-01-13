'use client';

import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
    href?: string;
    theme?: 'light' | 'dark';
    className?: string;
}

export function BackButton({ href = '/', theme = 'dark', className }: BackButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                "fixed top-24 start-4 md:start-8 z-40 p-2 rounded-full transition-all duration-300 hover:scale-110", // Positioning
                theme === 'light'
                    ? "text-slate-900 border border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white"
                    : "text-white border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10",
                className
            )}
            aria-label="Back"
        >
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
        </Link>
    );
}
