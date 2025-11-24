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
        limit: 50,
    });

    return (
        <article className="pt-4 pb-20">
            <section className="base-block-outer">
                <div className="base-block oakgrid mt-6 lg:mt-10">
                    <div className="col-span-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
                        <h1>Anmeldelser</h1>
                        {/* TODO: Filtrering */}
                        {reviews.docs.map((article) => (
                            // <Card key={article.id} article={article} />
                            <Link key={article.id} href={getArticleUrl(article)}>
                                {article.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Anmeldelser',
    };
};
