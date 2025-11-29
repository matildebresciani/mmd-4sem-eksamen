import type { Quote as QuoteProps } from '@/payload-types';
import BaseBlock from "../base-block/BaseBlock";
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import RichText from '@/components/molecules/admin/RichText';
import Image from 'next/image';

const QuoteBlock: BC<QuoteProps> = ({block, locale}) => {
const {richText} = block;

return (
  <BaseBlock>
  <div className='oakgrid'>
  <div className={cn('col-span-full relative min-h-[200px]')}>
  <Image alt='quoteicon' src={'/images/quote.svg'} width={134} height={88} className='absolute top-0 left-0'/>
  {richText && <RichText data={richText} className='italic absolute left-5 top-5 w-[90%] lg:left-20 lg:top-10 lg:w-[80%]'/>}
  </div>
  </div>
  </BaseBlock>
);
};

export default QuoteBlock;