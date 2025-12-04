'use client';
import type { Navigation as NavigationProps } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import BaseBlock from '../../blocks/base-block/BaseBlock';
import Navigation from './components/Navigation';

interface FooterClientProps {
    footer1?: NavigationProps['navItems'] | null;
    footer2?: NavigationProps['navItems'] | null;
    footer3?: NavigationProps['navItems'] | null;
}

export const FooterClient: React.FC<FooterClientProps> = ({ footer1, footer2, footer3 }) => {
    return (
        <footer className="relative mt-auto z-20">
            <BaseBlock className="flex flex-col gap-5 py-8 md:py-8 bg-[var(--bg-highlight)] items-center">
                <Link href="/">
                    <Image alt={'logo'} src={'/images/logo_bot.svg'} width={200} height={40} />
                </Link>
                <div className="flex flex-col gap-5">
                    {footer1 && <Navigation data={footer1} />}
                    {footer2 && <Navigation data={footer2} />}
                    {footer3 && <Navigation data={footer3} />}
                </div>
                <div className="flex gap-5">
                    <Link href="/">
                        <Image alt={'logo'} src={'/images/instagram_bot.svg'} width={40} height={40} />
                    </Link>
                    <Link href="/">
                        <Image alt={'logo'} src={'/images/facebook_bot.svg'} width={40} height={40} />
                    </Link>
                </div>
            </BaseBlock>
        </footer>
    );
};
