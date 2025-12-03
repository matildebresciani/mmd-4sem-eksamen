import { payloadHeading } from '@/lib/field-templates/headings';
import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';
import { richText } from 'payload/shared';

export const Form: Block = {
    slug: 'form',
    interfaceName: 'Form',
    imageURL: '/images/block-thumbnails/.jpg',
    labels: {
        singular: 'Form',
        plural: 'Forms',
    },
    fields: [
        {
            type: 'radio',
            name: 'layout',
            label: 'Layout',
            options: [
                {
                    label: '1 kolonne',
                    value: 'one-column',
                },
                {
                    label: '2 kolonner',
                    value: 'two-columns',
                },
            ],
            defaultValue: 'two-columns',
            required: true,
        },
        {
            type: 'text',
            name: 'heading',
            label: 'Heading',
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Beskrivelse',
        },
        {
            type: 'relationship',
            name: 'form',
            label: 'Select Form',
            relationTo: 'dynamic-forms',
            required: true,
            admin: {
                description: 'Select the form to display on this page.',
            },
        },
    ],
};
