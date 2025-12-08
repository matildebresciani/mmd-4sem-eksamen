import { Heading } from '@/components/atoms/frontend/heading/Heading';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;

    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    setRequestLocale(validatedLocale);

    const payload = await initPayload();

    const concerts = await payload.find({
        collection: 'concerts',
        // sort: '-date',
        limit: 50,
    });

    // const concerts = await payload.find({
    //     collection: 'concerts',
    //     limit: 1,
    //     page: 1,
    //     depth: 0,
    // });

    return (
        <article className="pt-4 pb-20">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12 space-y-section-xxs">
                        <Heading>Koncertkalender</Heading>
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Koncerter',
    };
};
