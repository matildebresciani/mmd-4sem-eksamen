import LogoLink from '@/components/atoms/frontend/logo/Link';
import SearchBar from '@/components/molecules/frontend/SearchBar';
import type { Locale } from '@/i18n/localized-collections';
import { getCachedNavigation } from '@/lib/data/payload/get-cached-navigation';
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

    return (
        <header className="fixed top-0 left-0 w-full z-100 bg-bg-base">
            {secondary && <SecondaryNavigation data={secondary} locale={locale} />}
            <div className="base-block flex lg:flex-col items-center justify-between gap-5 py-4 md:py-8">
                <LogoLink variant="full" className="hidden lg:block" />

                <div className="hidden lg:flex lg:gap-l bg-bg-base items-center">
                    {main && <MainNavigation data={main} locale={locale} />}
                    <SearchBar />
                </div>
                <div className="lg:hidden flex justify-between w-full">
                    <LogoLink />
                    <div className="flex gap-base items-center">
                        <SearchBar />
                        {mobile && <MobileNavigation data={mobile} locale={locale} />}
                    </div>
                </div>
            </div>
        </header>
    );
}
