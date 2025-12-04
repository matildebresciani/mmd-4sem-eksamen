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
    variant?: 'primary' | 'secondary' | 'tertiary';
    locale?: Locale;
    onClick?: () => void;
};

const DynamicButton = ({ link, className, variant = 'primary', locale, onClick }: Props) => {
    const { type, label, url, openNewTab } = link;

    const buttonStyle = cn(
        'inline-flex cursor-pointer w-auto button-text',
        variant === 'primary' && 'bg-button-primary text-button-text hover:bg-button-primary-hover p-s justify-center',
        variant === 'secondary' &&
            'bg-button-secondary text-button-text hover:bg-button-secondary-hover p-s justify-center',
        variant === 'tertiary' && 'underline text-fg-highlight-2 transition-transform duration-300 hover:scale-120',
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
            </Link>
        );
    }
};

export default DynamicButton;
