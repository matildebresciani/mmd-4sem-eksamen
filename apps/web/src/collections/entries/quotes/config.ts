import { createCollection } from '@/lib/collection-templates/collection';

export const Quotes = createCollection('quotes', {
    admin: {
        useAsTitle: 'quote',
        group: 'Entries',
        defaultColumns: ['quote', 'author'],
    },
    fields: [
        {
            type: 'richText',
            name: 'quote',
            label: 'Quote',
            required: true,
        },
        {
            type: 'text',
            name: 'author',
            label: 'Author',
        },
    ],
});
