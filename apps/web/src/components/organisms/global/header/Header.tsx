import Search from '@/components/atoms/frontend/icons/Search';
import LogoLink from '@/components/atoms/frontend/logo/Link';
import type { Locale } from '@/i18n/localized-collections';
import { getCachedNavigation } from '@/lib/data/payload/get-cached-navigation';
import Image from 'next/image';
import React from 'react';
import MainNavigation from './components/MainNavigation';
import MobileNavigation from './components/MobileNavigation';
import SecondaryNavigation from './components/SecondaryNavigation';

export async function Header({ locale }: { locale: Locale }) {
    const [main, secondary, mobile] = await Promise.all([
        getCachedNavigation('position.main', locale),
        getCachedNavigation('position.secondary', locale),
        getCachedNavigation('position.mobile', locale),
    ]);

    // return <HeaderClient main={main} secondary={secondary} mobile={mobile} />;
    return (
        <header className="fixed top-0 left-0 w-full z-20">
            {secondary && <SecondaryNavigation data={secondary} locale={locale} />}
            <div className="base-block flex lg:flex-col items-center justify-between gap-5 py-4 md:py-8">
                {/* Måske lave logo om til link-komponent? og bruge i både header og footer */}
                <Image
                    src={'./images/logo_bot.svg'}
                    alt={'full logo'}
                    height={203}
                    width={1210}
                    className={'hidden lg:block'}
                />
                <div className="hidden lg:flex lg:base-block lg:gap-l bg-bg-base p-1 items-center">
                    {main && <MainNavigation data={main} locale={locale} />}
                    <Search />
                </div>
                <div className="lg:hidden flex justify-between base-block">
                    <LogoLink />
                    <div className="flex gap-base items-center">
                        <Search />
                        {mobile && <MobileNavigation data={mobile} locale={locale} />}
                    </div>
                </div>
            </div>
        </header>
    );
}
