import RichText from '@/components/molecules/admin/RichText';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { cn } from '@/lib/utilities/ui';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Image from 'next/image';
// components/molecules/frontend/Quote.tsx
import type React from 'react';

interface QuoteProps {
    richText?: SerializedEditorState | null;
    showName?: boolean;
    name?: string;
}

const Quote: React.FC<QuoteProps> = ({ richText, showName, name }) => {
    return (
        <BaseBlock>
            <div className={cn('oakgrid')}>
                <div className="col-span-full relative min-h-[200px]">
                    <Image
                        alt="quoteicon"
                        src="/images/quote.svg"
                        width={134}
                        height={88}
                        className="absolute top-0 left-0"
                    />
                    {richText && (
                        <RichText
                            data={richText}
                            className="italic absolute left-5 top-5 w-[90%] lg:left-20 lg:top-10 lg:w-[80%]"
                        />
                    )}
                    {/* Navn vises kun hvis showName er true */}
                    {showName && name && <p className="font-bold">{name}</p>}
                </div>
            </div>
        </BaseBlock>
    );
};

export default Quote;
