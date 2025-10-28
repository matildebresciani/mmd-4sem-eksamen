import Pagination from '@/components/molecules/frontend/Pagination';
import { RenderBlocks } from '@/components/organisms/blocks/RenderBlocks';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { generateArchiveMetadata } from '@/lib/data/metadata';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import { getCachedEntryBySlug } from '@/lib/data/payload/get-cached-entry-by-slug';
import { getCachedOptions } from '@/lib/data/payload/get-cached-options';
import { pageNumberSchema } from '@/lib/schemas/pages';
import { formatLinkByCollection } from '@/lib/utilities/format-link';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{
        locale?: string;
        slug?: string;
        pageNumber?: string | number;
    }>;
};

const collection = 'post-categories';
const collectionToShow = 'posts';

export default async function PostsPage({ params }: Props) {
    const { locale, slug, pageNumber } = await params;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    const pageNumberValidation = pageNumberSchema.safeParse(pageNumber);
    if (!pageNumberValidation.success) {
        notFound();
    }

    const sanitizedPageNumber = pageNumberValidation.data ?? 1;

    const where = {
        'categories.slug': { equals: slug },
    };

    const [page, entries, options] = await Promise.all([
        getCachedEntryBySlug({
            collection,
            // TODO: Skal håndteres hvis man er på root archive
            slug: slug || '',
            locale: validatedLocale,
        }),
        getCachedCollection({
            collection: collectionToShow,
            limit: 1,
            page: sanitizedPageNumber,
            whereFields: slug ? where : undefined,
        }),
        getCachedOptions(validatedLocale),
    ]);

    if (!entries || entries.docs.length === 0) return notFound();
    if (entries.totalPages < sanitizedPageNumber) return notFound();

    // TODO: Skal fetche root archive content hvis slug er undefined
    // if (!page) return notFound();
    // const { id, layout } = page;
    let id = null;
    let layout = null;
    if (page) {
        id = page.id;
        layout = page.layout;
    }

    setRequestLocale(validatedLocale);

    return (
        <article>
            <div className="base-block oakgrid mt-6 lg:mt-16">
                <div className="col-span-12">
                    <h1 className="text-2xl font-medium lg:text-4xl">Posts</h1>
                </div>
            </div>

            <section className="base-block-outer">
                <div className="base-block oakgrid mt-6 lg:mt-10">
                    <div className="col-span-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
                        {entries.docs.map((entry) => (
                            <Link key={entry.id} href={formatLinkByCollection(entry.slug, collectionToShow, locale)}>
                                {entry.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Pagination
                totalPages={entries.totalPages}
                pageNumber={sanitizedPageNumber}
                locale={validatedLocale}
                className="my-6 lg:mt-20 lg:mb-16"
                routeDetails={{
                    route: collectionToShow,
                    type: 'path',
                    slug,
                }}
            />

            {id && layout && <RenderBlocks pageId={id} blocks={layout} locale={validatedLocale} />}
        </article>
    );
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
    const { locale, slug, pageNumber } = await paramsPromise;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    // TODO: Handle root archives
    if (!slug) {
        return {
            title: 'Posts',
        };
    }

    return generateArchiveMetadata({
        slug,
        collection,
        locale: validatedLocale,
        pageNumber,
    });
}
