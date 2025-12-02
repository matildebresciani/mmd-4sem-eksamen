import { payloadHeading } from '@/lib/field-templates/headings';
import type { Block } from 'payload';

export const RelatedArticles: Block = {
    slug: 'related-articles',
    interfaceName: 'RelatedArticles',
    labels: {
        singular: 'RelatedArticles',
        plural: 'RelatedArticles',
    },
    fields: [
        {
            type: 'text',
            name: 'heading',
            label: 'Heading',
            defaultValue: 'Relaterede artikler:',
        },
    ],
};
