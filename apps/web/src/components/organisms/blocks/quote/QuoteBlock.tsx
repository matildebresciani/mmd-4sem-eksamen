import Quote from '@/components/molecules/frontend/Quote';
import type { BC } from '@/lib/types/block-props';
import type { Quote as QuoteProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const QuoteBlock: BC<QuoteProps> = ({ block }) => {
    const { richText, name, showName } = block;
    return (
        <BaseBlock>
            <Quote richText={richText} name={name} showName={showName} />
        </BaseBlock>
    );
};

export default QuoteBlock;
