import { payloadHeading } from '@/lib/field-templates/headings';
import type { Block } from 'payload';

export const MainTeam: Block = {
    slug: 'main-team',
    interfaceName: 'MainTeam',
    imageURL: '/images/block-thumbnails/.jpg',
    labels: {
        singular: 'MainTeam',
        plural: 'MainTeams',
    },
    fields: [
        payloadHeading(),
        {
            type: 'relationship',
            name: 'mainVolunteers',
            label: 'Frivillige',
            relationTo: 'volunteers',
            hasMany: true,
            required: true,
            minRows: 1,
        },
    ],
};
