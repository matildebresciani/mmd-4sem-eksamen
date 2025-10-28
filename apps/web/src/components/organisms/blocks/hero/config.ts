import { payloadHeadingCollection } from '@/lib/field-templates/headings';
import { payloadLink } from '@/lib/field-templates/links';
import type { Block } from 'payload';

export const Hero: Block = {
    slug: 'hero',
    interfaceName: 'Hero',
    labels: {
        singular: 'Hero',
        plural: 'Heros',
    },
    fields: [...payloadHeadingCollection, payloadLink()],
};
