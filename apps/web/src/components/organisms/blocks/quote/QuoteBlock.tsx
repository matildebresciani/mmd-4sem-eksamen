import type { Quote as QuoteProps } from '@/payload-types';
import BaseBlock from "../base-block/BaseBlock";
import type { BC } from '@/lib/types/block-props';
import Quote from '@/components/molecules/frontend/Quote';

const QuoteBlock: BC<QuoteProps> = ({ block }) => {
  const { richText, showName, name } = block;
  return  (
  <BaseBlock>
  <Quote richText={richText} showName={showName} name={name} />;
  </BaseBlock>
  )
};

export default QuoteBlock;

