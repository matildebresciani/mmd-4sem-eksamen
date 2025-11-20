import path from 'node:path';
// storage-adapter-import-placeholder
import sharp from 'sharp'; // sharp-import

import { Media } from './collections/assets/media/config';
import { ArticleCategories } from './collections/categories/article-categories/config';
import { Articles } from './collections/content/articles/config';
import { Pages } from './collections/content/pages/config';
import { Products } from './collections/content/products/config';
import { Faqs } from './collections/entries/faqs/config';
import { ApiKeys } from './collections/tools-settings/api-keys/config';
import { Navigation } from './collections/tools-settings/navigation/config';
import { Options } from './collections/tools-settings/options/config';
import { Redirects } from './collections/tools-settings/redirects/config';
import { Users } from './collections/tools-settings/users/config';

import { da } from '@payloadcms/translations/languages/da';
import { en } from '@payloadcms/translations/languages/en';
import { defaultLocale, locales } from './i18n/localized-collections';

import { fileURLToPath } from 'node:url';
import { defaultLexical } from '@/components/molecules/admin/fields/defaultLexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { type PayloadRequest, buildConfig } from 'payload';
import { Icons } from './collections/assets/icons/config';
import { ProductCategories } from './collections/categories/product-categories/config';
import { plugins } from './lib/plugins';
import { getServerSideURL } from './lib/utilities/get-url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        components: {
            afterDashboard: ['@/components/molecules/admin/AfterDashboard'],
        },
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    // This config helps us configure global or default features that the other editors can inherit
    editor: defaultLexical,
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    collections: [
        Pages,
        Articles,
        Products,
        ArticleCategories,
        ProductCategories,
        Media,
        Icons,
        Faqs,
        Navigation,
        Redirects,
        Users,
        ApiKeys,
    ],
    cors: [getServerSideURL()].filter(Boolean),
    globals: [Options],
    plugins: [
        ...plugins,
        // storage-adapter-placeholder
    ],
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    jobs: {
        access: {
            run: ({ req }: { req: PayloadRequest }): boolean => {
                // Allow logged in users to execute this endpoint (default)
                if (req.user) return true;

                // If there is no logged in user, then check
                // for the Vercel Cron secret to be present as an
                // Authorization header:
                const authHeader = req.headers.get('authorization');
                return authHeader === `Bearer ${process.env.CRON_SECRET}`;
            },
        },
        tasks: [],
    },
    i18n: {
        supportedLanguages: { en, da },
        fallbackLanguage: defaultLocale,
    },
    localization: {
        defaultLocale,
        locales: [...locales],
    },
    compatibility: {
        allowLocalizedWithinLocalized: true,
    },
    email: resendAdapter({
        //TODO: Lav egen resend bruger
        defaultFromAddress: 'mabr0005@stud.kea.dk',
        defaultFromName: 'Reset Password',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
});
