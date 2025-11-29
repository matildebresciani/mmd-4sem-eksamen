import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadSEO } from '@/lib/field-templates/seo';
import type { Block, CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';
import { authenticatedOrPublished } from '../../../access/authenticatedOrPublished';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';

const blocks: Block[] = [Paragraph];

export const Articles: CollectionConfig = createRoutedCollection('articles', {
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
        categories: true,
        articleType: true,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt', 'publishStatus'],
        group: 'Content',
        livePreview: payloadLivePreview('articles'),
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'articles',
                req,
                articleType:
                    typeof data?.articleType === 'string' &&
                    ['review', 'interview', 'weekly-releases'].includes(data.articleType as string)
                        ? (data.articleType as 'review' | 'interview' | 'weekly-releases')
                        : undefined,
            }),
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            localized: true,
                            blocks,
                            admin: {
                                initCollapsed: false,
                            },
                        },
                    ],
                    label: 'Content',
                },
                {
                    fields: [
                        // --- ARTICLE TYPE ---
                        {
                            name: 'articleType',
                            label: 'Artiklens type',
                            type: 'select',
                            required: true,
                            options: [
                                { label: 'Anmeldelse', value: 'review' },
                                { label: 'Interview', value: 'interview' },
                                { label: 'Ugens udgivelser', value: 'weekly-releases' },
                            ],
                        },
                        // --- REVIEW TYPE (only if review) ---
                        {
                            name: 'reviewType',
                            label: 'Anmeldelsestype',
                            type: 'select',
                            options: [
                                { label: 'Koncertanmeldelse', value: 'concert' },
                                { label: 'Albumanmeldelse', value: 'album' },
                            ],
                            admin: {
                                condition: (_, siblingData) => siblingData.articleType === 'review',
                            },
                        },
                        // --- GENRE ---
                        {
                            name: 'genres',
                            label: 'Genre',
                            type: 'relationship',
                            hasMany: true,
                            relationTo: 'genres',
                            admin: {
                                position: 'sidebar',
                            },
                        },
                        // --- ARTIST NAME ---
                        {
                            type: 'text',
                            name: 'artistName',
                            label: 'Artist Navn',
                        },

                        // --- QUOTE ---
                        {
                        name: 'showName',
                        type: 'checkbox',
                        label: 'Vis navn på quote',
                        },
                        {
                        name: 'name',
                        type: 'text',
                        label: 'Navn',
                        admin: {
                          condition: (data) => data.showName === true,
                        }
                        },

                        // --- CATEGORIES ---
                        // Usikkert på om vi skal bruge denne endnu, og til hvad
                        {
                            name: 'categories',
                            label: 'Kategorier',
                            type: 'relationship',
                            relationTo: 'article-categories',
                            hasMany: true,
                            admin: {
                                position: 'sidebar',
                            },
                        },
                        {
                            name: 'relatedArticles',
                            label: 'Relaterede artikler',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                };
                            },
                            hasMany: true,
                            relationTo: 'articles',
                        },
                    ],
                    label: 'Meta',
                },
                payloadSEO,
            ],
        },
    ],
});
