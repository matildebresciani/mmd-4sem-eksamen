// import type { BlockComponentProps } from 'payload/types';
// import type { FC } from 'react';
// import QuoteSliderBlock from './QuoteSliderBlock';
// import type { QuoteSliderProps } from './QuoteSliderBlock';

// const QuoteSliderPayloadBlock: FC<BlockComponentProps & QuoteSliderProps> = (props) => {
//     // Payload giver dig props.data, som er block-data
//     const { data } = props;

//     return <QuoteSliderBlock block={data} />;
// };

// export default QuoteSliderPayloadBlock;

// import QuoteSliderBlock from './QuoteSliderBlock';

// const QuoteSliderPayloadBlock = (props: any) => {
//     return <QuoteSliderBlock block={props.data} />;
// };

// export default QuoteSliderPayloadBlock;
// QuoteSliderPayloadBlock.tsx
// import QuoteSliderBlock from './QuoteSliderBlock';
// import type { QuoteSliderProps } from './QuoteSliderBlock';

// type PayloadBlockProps = {
//     data: QuoteSliderProps;
//     [key: string]: unknown; // resten af props Payload sender, hvis der er nogen
// };

// const QuoteSliderPayloadBlock = (props: PayloadBlockProps) => {
//     return <QuoteSliderBlock block={props.data} />;
// };

// export default QuoteSliderPayloadBlock;
// import QuoteSliderBlock, { type QuoteSliderBlockProps } from './QuoteSliderBlock';

// type PayloadBlockProps = {
//     data: QuoteSliderBlockProps['block'];
//     [key: string]: unknown;
// };

// const QuoteSliderPayloadBlock = (props: PayloadBlockProps) => {
//     return <QuoteSliderBlock block={props.data} />;
// };

// export default QuoteSliderPayloadBlock;
