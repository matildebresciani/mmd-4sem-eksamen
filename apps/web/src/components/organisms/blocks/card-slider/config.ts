import { payloadHeading } from '@/lib/field-templates/headings';
import { payloadConditionalLinkCollection } from '@/lib/field-templates/links';
import type { Block } from 'payload';

export const CardSlider: Block = {
    slug: 'card-slider',
    interfaceName: 'CardSlider',
    imageURL: '/images/block-thumbnails/card-slider-block.png',
    labels: {
        singular: 'CardSlider',
        plural: 'CardSliders',
    },
    fields: [
        payloadHeading({ localized: false }),
        {
            type: 'select',
            name: 'cardType',
            label: 'Artikelkort type',
            options: [
                { label: 'Anmeldelser', value: 'review' },
                { label: 'Interviews', value: 'interview' },
            ],
            defaultValue: 'review',
        },
        ...payloadConditionalLinkCollection,
    ],
};
