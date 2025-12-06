import { cn } from '@/lib/utilities/ui';
import LogoImg from '@public/favicon.svg';
import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export type LogoProps = Omit<Partial<ImageProps>, 'src'>;

const Logo: FC<LogoProps> = ({ className, ...rest }) => {
    // TODO: Add brand to logo alt text
    return (
        <Image
            src={LogoImg}
            alt={'logo'}
            height={60}
            width={78}
            className={cn('max-w-12 md:max-w-full', className)}
            {...rest}
        />
    );
};

export default Logo;
