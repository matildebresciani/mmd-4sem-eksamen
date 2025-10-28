import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales, localizedCollections, paginationTranslations } from './localized-collections';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Doesn't force a locale prefix when the locale is the default
    localePrefix: 'as-needed',

    // Don't detect the locale from the browser
    localeDetection: false,

    // Used when no locale matches
    defaultLocale: defaultLocale,

    pathnames: {
        '/': '/',
        '/posts': {
            en: `/${localizedCollections['post-categories'].en}/`,
            da: `/${localizedCollections['post-categories'].da}/`,
        },
        '/posts/page/[pageNumber]': {
            en: `/${localizedCollections['post-categories'].en}/${paginationTranslations.page.en}/[pageNumber]`,
            da: `/${localizedCollections['post-categories'].da}/${paginationTranslations.page.da}/[pageNumber]`,
        },
        '/posts/[slug]': {
            en: `/${localizedCollections['post-categories'].en}/[slug]`,
            da: `/${localizedCollections['post-categories'].da}/[slug]`,
        },
        '/posts/[slug]/page/[pageNumber]': {
            en: `/${localizedCollections['post-categories'].en}/[slug]/${paginationTranslations.page.en}/[pageNumber]`,
            da: `/${localizedCollections['post-categories'].da}/[slug]/${paginationTranslations.page.da}/[pageNumber]`,
        },
        '/post/[slug]': {
            en: `/${localizedCollections.posts.en}/[slug]`,
            da: `/${localizedCollections.posts.da}/[slug]`,
        },
    },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
