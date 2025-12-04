// import { payloadRichText } from '@/lib/field-templates/rich-text';
// import type { Block } from 'payload';
// import QuoteSliderBlock from './QuoteSliderBlock';

// export const QuoteSlider: Block = {
//     slug: 'quotesliderblock',
//     interfaceName: 'QuoteSliderBlock',
//     labels: {
//         singular: 'QuoteSliderBlock',
//         plural: 'QuoteSliderBlocks',
//     },

//     fields: [
//         {
//             name: 'quotes',
//             type: 'array',
//             label: 'Quotes',
//             minRows: 1,
//             maxRows: 5,

//             fields: [
//                 {
//                     name: 'name',
//                     type: 'text',
//                     label: 'Navn',
//                 },
//                 {
//                     name: 'showName',
//                     type: 'checkbox',
//                     label: 'Vis navn på quote',
//                 },
//                 payloadRichText(),
//             ],
//         },
//     ],
// import QuoteSliderBlock from '@/components/organisms/blocks/quote-slider-block/QuoteSliderBlock';
// import { payloadRichText } from '@/lib/field-templates/rich-text';
// import type { Block } from 'payload';

// export const QuoteSlider: Block = {
//     slug: 'quote-slider',
//     labels: { singular: 'Quote Slider', plural: 'Quote Sliders' },
//     fields: [
//         {
//             name: 'quotes',
//             type: 'array',
//             fields: [
//                 { name: 'quote', type: 'richText' },
//                 { name: 'author', type: 'text' },
//                 { name: 'showName', type: 'checkbox' },
//             ],
//         },
//         payloadRichText(),
//     ],
//     admin: {
//         components: {
//             Block: QuoteSliderBlock, // direkte komponent, IKKE en wrapper-funktion
//         },
//     },
// };
import QuoteSliderBlock from '@/components/organisms/blocks/quote-slider-block/QuoteSliderBlock';
import type { Block } from 'payload/types';

export const QuoteSlider: Block = {
    slug: 'quote-slider',
    labels: { singular: 'Quote Slider', plural: 'Quote Sliders' },
    fields: [
        {
            name: 'quotes',
            type: 'array',
            fields: [
                { name: 'richText', type: 'richText' },
                { name: 'name', type: 'text' },
                { name: 'showName', type: 'checkbox' },
            ],
        },
    ],
    admin: {
        components: {
            Block: QuoteSliderBlock, // ✅ bruger nu korrekt Payload-komponent
        },
    },
};
