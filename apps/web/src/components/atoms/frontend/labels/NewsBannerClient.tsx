'use client';

import { motion } from 'motion/react';
import React from 'react';

type Props = {
    bannerText: string;
    repeatCount?: number;
    duration?: number;
};

export default function NewsBannerClient({ bannerText, repeatCount = 30, duration = 7 }: Props) {
    return (
        <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{
                duration,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
            }}
            className="absolute top-s left-0 w-full overflow-hidden"
        >
            <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
                {Array.from({ length: repeatCount }).map((_, i) => (
                    <span key={i} className="ml-s text-fg-subtle button-text">
                        {bannerText}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
