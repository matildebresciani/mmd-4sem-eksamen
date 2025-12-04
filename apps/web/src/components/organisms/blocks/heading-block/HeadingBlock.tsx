// import Heading from '@/components/atoms/frontend/heading/Heading';
// import type { BC } from '@/lib/types/block-props';
// import type { HeadingBlock as HeadingProps } from '@/payload-types';
// import BaseBlock from '../base-block/BaseBlock';

// type HeadingBlockType = {
//     text?: string | null;
//     type?: 'h1' | 'h2';
//     size?: 'sm' | 'base' | 'lg' | 'xl';
//     align?: 'left' | 'center' | 'right';
//     id?: string;
//     className?: string;
// };

// const HeadingBlock: BC<HeadingBlockType> = ({ block }) => {
//     // defensive destructure
//     const {
//         text = '',
//         type = 'h2',
//         size = 'base',
//         align = 'left',
//         id = undefined,
//         className = '',
//     } = (block as HeadingBlockType) || {};

//     // hvis ingen tekst: returner null i stedet for at rendere tom heading
//     if (!text) return null;

//     return (
//         <BaseBlock>
//             <Heading
//                 text={text}
//                 type={type || 'h2'}
//                 size={size || 'base'}
//                 align={align || 'left'}
//                 id={id}
//                 className={className}
//             />
//         </BaseBlock>
//     );
// };

// export default HeadingBlock;
