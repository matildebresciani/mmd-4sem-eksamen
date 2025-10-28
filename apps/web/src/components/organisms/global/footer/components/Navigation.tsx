import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Navigation as NavigationProps } from '@/payload-types';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    data: NavigationProps['navItems'];
};

const Navigation = ({ data }: Props) => {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <nav>
            <ul>
                {data?.map((item, i) => {
                    const itemLink = formatLink(item.link, locale);
                    return (
                        <li key={item.id ?? i}>
                            <Link
                                href={itemLink}
                                className={cn('hover:underline', itemLink === pathname && 'underline')}
                                target={item.link.openNewTab ? '_blank' : '_self'}
                            >
                                {item.link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
