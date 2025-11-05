'use client';
import { cn } from '@/lib/utilities/ui';
import Link from 'next/link';
import Arrow from '../icons/Arrow';

type Props = {
    type?: 'button' | 'submit' | 'link';
    title: string;
    href?: string;
    openNewTab?: boolean | null;
    className?: string;
    addArrow?: boolean;
    onClick?: () => void;
};

const BaseButton = ({ type, title, href, openNewTab, className, addArrow, onClick }: Props) => {
    const style = cn(
        'flex items-center justify-center gap-6 w-max max-w-full py-4 px-8 font-medium text-lg leading-[178%] border border-white bg-oak-cta-bg rounded-2xl cursor-pointer md:px-23',
        className,
    );

    if (type === 'link' && href) {
        return (
            <Link href={href} className={style} target={openNewTab ? '_blank' : '_self'} onClick={() => onClick?.()}>
                {title}
                {addArrow && <Arrow className="h-5 w-5 min-w-5" />}
            </Link>
        );
    }

    return (
        <button type={type && type !== 'link' ? type : 'button'} className={style} onClick={() => onClick?.()}>
            {title}
            {addArrow && <Arrow className="h-5 w-5 min-w-5" />}
        </button>
    );
};

export default BaseButton;
