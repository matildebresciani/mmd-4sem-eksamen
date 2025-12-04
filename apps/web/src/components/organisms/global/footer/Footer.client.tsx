'use client';
import type { Navigation as NavigationProps } from '@/payload-types';
import { motion } from 'motion/react';
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
            <BaseBlock className="flex flex-col gap-10 py-8 md:py-8 bg-bg-base items-center z-21">
                <Link href="/" className="z-23">
                    <Image alt={'logo'} src={'/images/logo_bot.svg'} width={1620} height={242} />
                </Link>
                <div className="absolute bottom-0 bg-bg-highlight w-full h-[75%] z-22" />
                <div className="flex flex-col gap-5 text-button-text text-center z-23">
                    {footer1 && <Navigation data={footer1} />}
                    {footer2 && <Navigation data={footer2} />}
                    {footer3 && <Navigation data={footer3} />}
                </div>
                <div className="flex gap-5 z-23">
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                        <Link href="/">
                            <Image alt={'logo'} src={'/images/instagram_bot.svg'} width={47} height={47} />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                        <Link href="/">
                            <Image alt={'logo'} src={'/images/facebook_bot.svg'} width={47} height={47} />
                        </Link>
                    </motion.div>
                </div>
            </BaseBlock>
        </footer>
    );
};
