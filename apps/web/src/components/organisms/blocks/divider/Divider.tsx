import type { BC } from '@/lib/types/block-props';
import type { Divider as DividerProps } from '@/payload-types';
import Image from 'next/image';
import BaseBlock from '../base-block/BaseBlock';

const DividerBlock: BC<DividerProps> = () => {
    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 flex items-center gap-5">
                    <span className="divider" />
                    <Image alt="grafik" height={100} width={100} src="/images/grafik.svg" />
                    <span className="divider" />
                </div>
            </div>
        </BaseBlock>
    );
};

export default DividerBlock;
