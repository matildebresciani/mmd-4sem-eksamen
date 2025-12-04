import ArticlesArchive from '@/components/organisms/articles-archive/ArticlesArchive';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import type { CollectionPageType } from '@/lib/types/collection-page';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;

    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    setRequestLocale(validatedLocale);

    const reviews = await getCachedCollection({
        collection: 'articles',
        whereFields: {
            articleType: { equals: 'review' },
        },
        // sort: '-publishedAt.da',
        limit: 50,
    });

    console.log(
        reviews.docs.map((d) => ({
            slug: d.slug,
            publishedAt: d.publishedAt,
        })),
    );

    return (
        <article className="pt-4 pb-20">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12 space-y-section-xxs">
                        <h1 className="text-center">Anmeldelser</h1>
                        {/* TODO: Filtrering */}
                        <ArticlesArchive articles={reviews.docs} />
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Anmeldelser',
    };
};
