// import type { Block } from 'payload';

// export const Heading: Block = {
//     slug: 'heading',
//     interfaceName: 'Heading',
//     imageURL: '/images/block-thumbnails/.jpg',
//     labels: {
//         singular: 'Heading',
//         plural: 'Headings',
//     },
//     fields: [

//     ],
// };
// /payload/blocks/headingBlock.ts
// import { payloadHeading } from '@/lib/field-templates/headings';
// import type { Block } from 'payload/types';

// const HeadingBlock: Block = {
//     slug: 'heading',
//     labels: { singular: 'Heading', plural: 'Headings' },
//     fields: [
//         payloadHeading({ required: false }),
//         { name: 'text', type: 'text', required: true },

//         {
//             name: 'type',
//             type: 'select',
//             options: [
//                 { label: 'H1', value: 'h1' },
//                 { label: 'H2', value: 'h2' },
//             ],
//             defaultValue: 'h2',
//         },
//         {
//             name: 'size',
//             type: 'select',
//             options: [
//                 { label: 'Small', value: 'sm' },
//                 { label: 'Base', value: 'base' },
//                 { label: 'Large', value: 'lg' },
//                 { label: 'XL', value: 'xl' },
//             ],
//             defaultValue: 'base',
//         },
//         {
//             name: 'align',
//             type: 'radio',
//             options: [
//                 { label: 'Left', value: 'left' },
//                 { label: 'Center', value: 'center' },
//                 { label: 'Right', value: 'right' },
//             ],
//             defaultValue: 'left',
//         },
//         { name: 'id', type: 'text' },
//         { name: 'className', type: 'text' },
//     ],
// };

// export default HeadingBlock;
