import { productField } from '@/components/molecules/admin/fields/product';
import { slugField } from '@/components/molecules/admin/fields/slug';
import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { payloadMeta } from '@/lib/field-templates/meta';
import type { CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated,
    },
    admin: {
        defaultColumns: ['title', 'subtitle'],
        useAsTitle: 'title',
        group: 'Content',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Product Details',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                        },
                        {
                            name: 'subtitle',
                            type: 'text',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            relationTo: 'product-categories',
                            hasMany: true,
                        },
                        {
                            name: 'alternativeProducts',
                            type: 'relationship',
                            relationTo: 'products',
                            hasMany: true,
                            maxRows: 3,
                        },
                        {
                            name: 'upsellProducts',
                            type: 'relationship',
                            relationTo: 'products',
                            hasMany: true,
                            maxRows: 3,
                        },
                    ],
                },
                {
                    label: 'Editorial',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            localized: true,
                            blocks: [Paragraph],
                            required: false,
                            admin: {
                                initCollapsed: false,
                            },
                        },
                    ],
                },
                payloadMeta,
            ],
        },
        ...productField(),
        ...slugField(),
    ],
};
