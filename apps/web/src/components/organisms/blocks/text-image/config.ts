import { payloadConditionalLinkCollection } from '@/lib/field-templates/links';
import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

export const TextImage: Block = {
    slug: 'text-image',
    interfaceName: 'TextImage',
    imageURL: '/images/block-thumbnails/text-image.jpg',
    labels: {
        singular: 'TextImage',
        plural: 'TextImages',
    },
    fields: [
        {
            type: 'radio',
            name: 'order',
            label: 'Order',
            required: true,
            defaultValue: 'image-left',
            options: [
                {
                    label: 'Image Left',
                    value: 'image-left',
                },
                {
                    label: 'Image Right',
                    value: 'image-right',
                },
            ],
        },
        {
            type: 'upload',
            name: 'image',
            label: 'Image',
            relationTo: 'media',
            required: true,
        },
        payloadRichText(),
        ...payloadConditionalLinkCollection,
    ],
};
