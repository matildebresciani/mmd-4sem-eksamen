import type { Divider as DividerProps } from '@/payload-types';
import BaseBlock from "../base-block/BaseBlock";
import type { BC } from '@/lib/types/block-props';
import Image from 'next/image';

const DividerBlock: BC<DividerProps> = ({block, locale}) => {
const {} = block;

return (
  <BaseBlock>
  <div className='oakgrid'>
    <div className='col-span-12 flex items-center gap-5'>
    <span className='divider'></span>
    <Image alt="grafik" height={100} width={100} src="/images/grafik.svg"/>
    <span className='divider'></span>
    </div>
  </div>
  </BaseBlock>
);
};

export default DividerBlock;