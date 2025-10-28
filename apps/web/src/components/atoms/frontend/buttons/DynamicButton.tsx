'use client';
import type { Locale } from '@/i18n/localized-collections';
import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Option } from '@/payload-types';
import Link from 'next/link';
import Arrow from '../icons/Arrow';

// TODO: Move to boilerplate

type Props = {
    link: Option['linkTypeTemplate'];
    className?: string;
    variant?: 'highlight' | 'primary' | 'secondary' | 'tertiary';
    locale?: Locale;
    addArrow?: boolean;
    onClick?: () => void;
};

const DynamicButton = ({ link, className, variant = 'primary', locale, addArrow, onClick }: Props) => {
    const { type, label, url, openNewTab } = link;

    // TODO Hover states
    const buttonStyle = cn(
        'inline-flex cursor-pointer w-auto font-bold',
        variant === 'primary' &&
            'bg-fg-base text-text-on-color px-8 py-4 md:px-16 md:py-6 rounded-2xl mt-6 justify-center',
        variant === 'highlight' &&
            'bg-fg-highlight text-text-base px-8 py-4 md:px-16 md:py-6 rounded-2xl mt-6 justify-center',
        variant === 'secondary' &&
            'bg-transparent border border-border-base text-text-base px-8 py-4 md:px-16 md:py-6 rounded-2xl mt-6 justify-center',
        variant === 'tertiary' && 'underline',
        className,
    );

    if (type === 'custom' && url) {
        return (
            <Link
                href={url}
                className={buttonStyle}
                target={openNewTab ? '_blank' : '_self'}
                onClick={() => onClick?.()}
            >
                {label}
                {addArrow && <Arrow className="h-5 w-5 min-w-5" />}
            </Link>
        );
    }

    if (type === 'reference') {
        return (
            <Link
                href={formatLink(link, locale ?? 'en')}
                className={buttonStyle}
                target={openNewTab ? '_blank' : '_self'}
                onClick={() => onClick?.()}
            >
                {label}
                {addArrow && <Arrow className="h-5 w-5 min-w-5" />}
            </Link>
        );
    }
};

export default DynamicButton;
