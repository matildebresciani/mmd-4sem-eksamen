'use client';

import LogoLink from '@/components/atoms/frontend/logo/Link';
import SearchBar from '@/components/molecules/frontend/SearchBar';
import type { Navigation } from '@/payload-types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import BaseBlock from '../../blocks/base-block/BaseBlock';
import MainNavigation from './components/MainNavigation';
import MobileNavigation from './components/MobileNavigation';

type Props = {
    main?: Navigation['navItems'] | null;
    secondary?: Navigation['navItems'] | null;
    mobile?: Navigation['navItems'] | null;
    locale: string;
};

export default function HeaderClient({ main, mobile, locale }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Tailwind breakpoints: md=768, lg=1024
    const isMobile = vw < 768;
    const isTablet = vw >= 768 && vw < 1024;
    const isDesktop = vw >= 1024;

    // Helper til at læse CSS-variabler
    const getCSSVar = (name: string, fallback = 0) => {
        if (typeof window === 'undefined') return fallback;
        const value = getComputedStyle(document.documentElement).getPropertyValue(name);
        return Number.parseInt(value.replace('px', '').trim()) || fallback;
    };

    // Hent højder fra CSS-variabler
    const heights = {
        desktop: {
            large: getCSSVar('--header-height-desktop', 303),
            small: getCSSVar('--header-height-desktop-offset', 140),
        },
        tablet: { large: getCSSVar('--header-height', 220), small: getCSSVar('--header-height-offset', 110) },
        mobile: { large: getCSSVar('--header-height', 140), small: getCSSVar('--header-height-offset', 72) },
    };

    const headerHeight = isDesktop
        ? scrolled
            ? heights.desktop.small
            : heights.desktop.large
        : isTablet
          ? scrolled
              ? heights.tablet.small
              : heights.tablet.large
          : scrolled
            ? heights.mobile.small
            : heights.mobile.large;

    // Nav bar højde (brug præcis højde hvis din MainNavigation har en konkret height)
    const navBarHeight = isMobile ? 48 : 64;
    const navOffset = isMobile ? 8 : 12;
    const navTop = Math.max(headerHeight - navBarHeight - navOffset, 0);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    // smallLogoLeft: left offset inside container when left-aligned (mobile/tablet)
    const smallLogoLeft = 16;

    return (
        // Header baggrund går hele vejen
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-bg-base overflow-visible"
            animate={{ height: headerHeight }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ willChange: 'height' }}
        >
            <BaseBlock classNameOuter="!pb-0">
                {/* Container max width 1536px */}
                <div className="oakgrid">
                    <div className="col-span-12  relative" style={{ height: headerHeight }}>
                        {/* =========================
              MOBILE & TABLET ROW (vises på < lg:1024)
              - flex-row, logo venstre, actions til højre
              - small-logo flytter til venstre når scrolled
              ========================= */}
                        <div className="flex items-center justify-between w-full h-full lg:hidden gap-l">
                            {/* Venstre: Logo (full når ikke scrolled, small når scrolled) */}
                            <div className="flex items-center">
                                <motion.div
                                    animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -6 : 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="flex items-center"
                                >
                                    <LogoLink variant="full" />
                                </motion.div>

                                {/* small logo (positioneret absolut hvis scrolled, ellers hidden) */}
                                <motion.div
                                    className="absolute top-xs"
                                    style={{
                                        left: smallLogoLeft,
                                    }}
                                    animate={{
                                        opacity: scrolled ? 1 : 0,
                                        x: 0,
                                        y: scrolled ? 0 : -8,
                                        scale: scrolled ? 0.85 : 1,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <LogoLink />
                                </motion.div>
                            </div>

                            {/* Højre: search + burger */}
                            <div className="flex items-center gap-3 mt-m">
                                <SearchBar />
                                {mobile && <MobileNavigation data={mobile} locale={locale} />}
                            </div>
                        </div>

                        {/* =========================
              DESKTOP LAYOUT (lg and up)
              - logo centered (stack), main navigation absolute under logo
              ========================= */}
                        <div className="hidden lg:block w-full h-full">
                            <div className="w-full h-full flex items-start justify-center relative">
                                {/* Full logo */}
                                <motion.div
                                    animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -10 : 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="z-30"
                                >
                                    <LogoLink variant="full" />
                                </motion.div>

                                {/* Small logo (centered on desktop) */}
                                <motion.div
                                    className="absolute top-s left-[50%] transform -translateX(-50%) z-40"
                                    animate={{
                                        opacity: scrolled ? 1 : 0,
                                        y: scrolled ? 0 : -10,
                                        scale: scrolled ? 0.85 : 1,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <LogoLink />
                                </motion.div>
                            </div>
                            <div
                                className="absolute left-0 right-0 z-20 px-0 mx-auto"
                                style={{
                                    top: navTop,
                                }}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-1">
                                        {main && <MainNavigation data={main} locale={locale} />}
                                    </div>
                                    <div className="flex-shrink-0">
                                        <SearchBar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseBlock>
        </motion.header>
    );
}
