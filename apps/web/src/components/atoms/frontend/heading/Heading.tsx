// import { cn } from '@/lib/utilities/ui';

// type HeadingProps = {
//     children: React.ReactNode;
//     className?: string;
// };

// const Heading = ({ children, className }: HeadingProps) => {
//     return (
//         <div
//             className={cn(
//                 'flex items-center justify-center h-[60px] max-w-max aspect-square border border-oak-gray-dark rounded-[25px] transition-colors group-hover:border-oak-carmine-red group-hover:bg-oak-carmine-red',
//                 className,
//             )}
//         >
//             <h2 className="uppercase">{children}</h2>
//         </div>
//     );
// };

// export default Heading;

// import { cn } from '@/lib/utilities/ui';
// // components/atoms/frontend/heading/Heading.tsx
// import type React from 'react';

// type HeadingProps = {
//     children: React.ReactNode;
//     className?: string;
// };

// const Heading = ({ children, className }: HeadingProps) => {
//     return (
//         <div className={cn('', className)}>
//             <h2 className="uppercase">{children}</h2>
//         </div>
//     );
// };

// export default Heading;
// /src/components/Heading/Heading.tsx
import React from 'react';

export type HeadingType = 'h1' | 'h2';
export type HeadingSize = 'sm' | 'base' | 'lg' | 'xl';

export interface HeadingProps {
    text: string;
    type?: HeadingType; // h1 or h2
    size?: HeadingSize;
    align?: 'left' | 'center' | 'right';
    id?: string;
    className?: string;
}

const sizeMap: Record<HeadingSize, string> = {
    sm: 'text-xl',
    base: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
};

export default function Heading({
    text,
    type = 'h2',
    size = 'base',
    align = 'left',
    id,
    className = '',
}: HeadingProps) {
    const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
    const Tag = type;

    return (
        <Tag id={id} className={`${sizeMap[size]} ${alignClass} font-semibold leading-tight ${className}`}>
            {text}
        </Tag>
    );
}
