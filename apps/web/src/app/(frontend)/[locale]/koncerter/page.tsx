import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

type Props = {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
    const { locale } = params;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    setRequestLocale(validatedLocale);

    const payload = await initPayload();

    const concerts = await payload.find({
        collection: 'concerts',
        sort: '-date',
        limit: 50,
        overrideAccess: false,
    });

    return (
        <article className="pt-4 pb-20">
            <section className="base-block-outer">
                <div className="base-block oakgrid mt-6 lg:mt-10">
                    <div className="col-span-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
                        <h1>Koncerter</h1>
                        {concerts.docs.map((concert) => (
                            // <Card key={concert.id} concert={concert} />
                            <div key={concert.id}>{concert.artist}</div>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Koncerter',
    };
};
