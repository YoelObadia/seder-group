'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    amount?: 'some' | 'all' | number;
}

export function TextReveal({ children, className, delay = 0, amount = 0.5 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount });

    // Split text into words
    const words = children.split(' ');

    return (
        <span ref={ref} className={cn("inline-block", className)}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true">
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-top me-[0.3em] last:me-0">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={isInView ? { y: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: delay + (i * 0.03),
                                ease: [0.215, 0.61, 0.355, 1] // Custom refined ease
                            }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </span>
        </span>
    );
}
