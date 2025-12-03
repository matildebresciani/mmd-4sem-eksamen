import ArticlesArchive from '@/components/organisms/articles-archive/ArticlesArchive';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
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

    const interviews = await getCachedCollection({
        collection: 'articles',
        whereFields: {
            articleType: { equals: 'interview' },
        },
        sort: '-publishedAt',
        limit: 50,
    });

    return (
        <article className="pt-4 pb-20">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12 space-y-section-xxs">
                        <h1 className="text-center">Interviews</h1>
                        <ArticlesArchive articles={interviews.docs} />
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Interviews',
    };
};
