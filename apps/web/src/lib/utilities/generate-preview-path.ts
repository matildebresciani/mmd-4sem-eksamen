import { isLocale } from '@/i18n/localized-collections';
import type { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    posts: '/posts',
    pages: '',
};

type Props = {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
    req: PayloadRequest;
    locale?: string;
};

export const generatePreviewPath = ({ collection, slug, req, locale }: Props) => {
    const validatedLocale = isLocale(locale) ? locale : undefined;
    const path = `${validatedLocale ? `/${validatedLocale}` : ''}${collectionPrefixMap[collection]}/${slug}`;
    const params = {
        slug,
        collection,
        path,
        locale: validatedLocale ? validatedLocale : '',
    };

    const encodedParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        encodedParams.append(key, value);
    });

    const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    const protocol = isProduction ? 'https:' : req.protocol;

    const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`;

    return url;
};
