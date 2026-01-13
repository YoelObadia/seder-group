'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

function ScrollHandler() {
    const lenis = useLenis();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const prevPathname = useRef(pathname);

    useEffect(() => {
        // Helper to strip locale from path
        const normalize = (p: string) => {
            return p.replace(/^\/(en|fr|he)/, '') || '/';
        };

        const prev = normalize(prevPathname.current);
        const curr = normalize(pathname);

        // Update ref
        prevPathname.current = pathname;

        // If the path (excluding locale) hasn't changed, don't reset scroll
        // This handles language switches and page refreshes
        if (prev === curr) {
            return;
        }

        // Reset native scroll
        window.scrollTo(0, 0);

        // Reset Lenis scroll
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, searchParams, lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root>
            <ScrollHandler />
            {children}
        </ReactLenis>
    );
}
