import type { Block } from 'payload';
import { payloadRichText } from '@/lib/field-templates/rich-text';

export const Quote: Block = {
    slug: 'quote',
    interfaceName: 'Quote',
    imageURL: '/images/block-thumbnails/.jpg',
    labels: {
        singular: 'Quote',
        plural: 'Quotes',
    },
    fields: [payloadRichText()],
};
