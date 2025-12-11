import type { BC } from '@/lib/types/block-props';
import type { Divider as DividerProps } from '@/payload-types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import BaseBlock from '../base-block/BaseBlock';

const DividerBlock: BC<DividerProps> = () => {
    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 flex items-center gap-5">
                    <span className="divider" />
                    <Star />
                    <span className="divider" />
                </div>
            </div>
        </BaseBlock>
    );
};

export default DividerBlock;
