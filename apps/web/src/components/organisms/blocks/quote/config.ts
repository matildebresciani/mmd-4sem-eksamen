import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

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
