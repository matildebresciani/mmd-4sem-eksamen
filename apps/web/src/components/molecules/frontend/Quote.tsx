import RichText from '@/components/molecules/admin/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Image from 'next/image';
import type React from 'react';

type Props = {
    quoteText?: SerializedEditorState | null;
    showName?: boolean | null;
    name?: string | null;
};

const Quote = ({ quoteText, showName, name }: Props) => {
    return (
        <div className="oakgrid">
            <div className="col-span-12 relative min-h-[200px]">
                <Image
                    alt="quoteicon"
                    src="/images/quote.svg"
                    width={134}
                    height={88}
                    className="absolute top-0 left-0"
                />

                <div className="absolute left-5 top-5 w-[90%] lg:left-20 lg:top-10 lg:w-[80%]">
                    {quoteText && <RichText data={quoteText} className="italic" />}
                    {/* Navn vises kun hvis showName er true */}
                    {showName && name && <p className="font-bold">-{name}</p>}
                </div>
            </div>
        </div>
    );
};

export default Quote;
