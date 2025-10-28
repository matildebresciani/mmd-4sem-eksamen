import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadSEO } from '@/lib/field-templates/seo';
import type { Block, CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';
import { authenticatedOrPublished } from '../../../access/authenticatedOrPublished';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';

const blocks: Block[] = [Paragraph];

export const Posts: CollectionConfig<'posts'> = createRoutedCollection('posts', {
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
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt', 'publishStatus'],
        group: 'Content',
        livePreview: payloadLivePreview('posts'),
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'posts',
                req,
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
                        {
                            name: 'relatedPosts',
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
                            relationTo: 'posts',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'post-categories',
                        },
                    ],
                    label: 'Meta',
                },
                payloadSEO,
            ],
        },
    ],
});
