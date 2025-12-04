import type { Block } from 'payload';

export const VolunteerRoles: Block = {
    slug: 'volunteer-roles',
    interfaceName: 'VolunteerRoles',
    imageURL: '/images/block-thumbnails/.jpg',
    labels: {
        singular: 'VolunteerRoles',
        plural: 'VolunteerRoles',
    },
    fields: [
        {
            type: 'array',
            name: 'roles',
            label: 'Volunteer Roles',
            fields: [
                {
                    type: 'text',
                    name: 'volunteerRole',
                    label: 'Frivillig Rolle',
                },
                {
                    type: 'textarea',
                    name: 'roleDescription',
                    label: 'Rolle Beskrivelse',
                },
            ],
        },
    ],
};
