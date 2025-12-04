// // 'use client';

// // import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
// // import Quote from '@/components/molecules/frontend/Quote';
// // import type { BC } from '@/lib/types/block-props';
// // import type { Quote as PayloadQuote } from '@/payload-types';
// // import React, { useEffect, useRef, useState } from 'react';
// // import BaseBlock from '../base-block/BaseBlock';

// // // Types
// // type QuoteItem = PayloadQuote;
// // type QuoteSliderProps = {
// //     quotes?: (PayloadQuote | null)[] | undefined;
// // };

// // const QuoteSliderBlock: BC<QuoteSliderProps> = ({ block }) => {
// //     const quotes: QuoteItem[] = Array.isArray(block?.quotes) ? (block.quotes as QuoteItem[]) : [];

// //     const totalSlides = quotes.length || 0;
// //     const [currentSlide, setCurrentSlide] = useState(0);

// //     // Optional: autoplay
// //     const autoplayRef = useRef<number | null>(null);
// //     const AUTOPLAY_MS = 6000;

// //     useEffect(() => {
// //         if (totalSlides <= 1) return;
// //         autoplayRef.current = window.setInterval(() => {
// //             setCurrentSlide((s) => (s + 1) % totalSlides);
// //         }, AUTOPLAY_MS);

// //         return () => {
// //             if (autoplayRef.current) window.clearInterval(autoplayRef.current);
// //         };
// //     }, [totalSlides]);

// //     // keyboard navigation
// //     useEffect(() => {
// //         const onKey = (e: KeyboardEvent) => {
// //             if (e.key === 'ArrowLeft') setCurrentSlide((s) => Math.max(0, s - 1));
// //             if (e.key === 'ArrowRight') setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
// //         };
// //         window.addEventListener('keydown', onKey);
// //         return () => window.removeEventListener('keydown', onKey);
// //     }, [totalSlides]);

// //     if (!totalSlides) return null;

// //     return (
// //         <BaseBlock>
// //             <div className="oakgrid">
// //                 <div className="relative overflow-hidden">
// //                     <div
// //                         className="flex transition-transform duration-500 ease-in-out"
// //                         style={{
// //                             width: `${totalSlides * 100}%`,
// //                             transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
// //                         }}
// //                     >
// //                         {quotes.map((q) => (
// //                             <div key={q.id} className="w-full flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
// //                                 <Quote richText={q.richText} name={q.name} showName={q.showName} />
// //                             </div>
// //                         ))}
// //                     </div>
// //                     {/* Pagination bullets */}
// //                     <div className="mt-4">
// //                         <PaginationBullets
// //                             totalSlides={totalSlides}
// //                             currentSlide={currentSlide}
// //                             onBulletClick={(i) => {
// //                                 setCurrentSlide(i);
// //                                 // restart autoplay timer
// //                                 if (autoplayRef.current) {
// //                                     window.clearInterval(autoplayRef.current);
// //                                     autoplayRef.current = window.setInterval(() => {
// //                                         setCurrentSlide((s) => (s + 1) % totalSlides);
// //                                     }, AUTOPLAY_MS);
// //                                 }
// //                             }}
// //                         />
// //                     </div>
// //                 </div>
// //             </div>
// //         </BaseBlock>
// //     );
// // };

// // export default QuoteSliderBlock;
// 'use client';

// import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
// import Quote from '@/components/molecules/frontend/Quote';
// import type { Quote as PayloadQuote } from '@/payload-types';
// import type React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import BaseBlock from '../base-block/BaseBlock';

// export type QuoteSliderBlockProps = {
//     block: {
//         quotes?: (PayloadQuote | null)[];
//     };
// };

// const QuoteSliderBlock: React.FC<QuoteSliderBlockProps> = ({ block }) => {
//     // Sikre at quotes altid er et array
//     const quotes: PayloadQuote[] = Array.isArray(block?.quotes) ? (block.quotes.filter(Boolean) as PayloadQuote[]) : [];

//     const totalSlides = quotes.length;
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const autoplayRef = useRef<number | null>(null);
//     const AUTOPLAY_MS = 6000;

//     useEffect(() => {
//         if (totalSlides <= 1) return;
//         autoplayRef.current = window.setInterval(() => {
//             setCurrentSlide((s) => (s + 1) % totalSlides);
//         }, AUTOPLAY_MS);

//         return () => {
//             if (autoplayRef.current) window.clearInterval(autoplayRef.current);
//         };
//     }, [totalSlides]);

//     useEffect(() => {
//         const onKey = (e: KeyboardEvent) => {
//             if (e.key === 'ArrowLeft') setCurrentSlide((s) => Math.max(0, s - 1));
//             if (e.key === 'ArrowRight') setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
//         };
//         window.addEventListener('keydown', onKey);
//         return () => window.removeEventListener('keydown', onKey);
//     }, [totalSlides]);

//     if (!totalSlides) return null;

//     return (
//         <BaseBlock>
//             <div className="oakgrid">
//                 <div className="relative overflow-hidden">
//                     <div
//                         className="flex transition-transform duration-500 ease-in-out"
//                         style={{
//                             width: `${totalSlides * 100}%`,
//                             transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
//                         }}
//                     >
//                         {quotes.map((q) => (
//                             <div key={q.id} className="w-full flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
//                                 <Quote richText={q.richText} name={q.name} showName={!!q.showName} />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mt-4">
//                         <PaginationBullets
//                             totalSlides={totalSlides}
//                             currentSlide={currentSlide}
//                             onBulletClick={(i) => {
//                                 setCurrentSlide(i);
//                                 if (autoplayRef.current) {
//                                     window.clearInterval(autoplayRef.current);
//                                     autoplayRef.current = window.setInterval(() => {
//                                         setCurrentSlide((s) => (s + 1) % totalSlides);
//                                     }, AUTOPLAY_MS);
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </BaseBlock>
//     );
// };

// export default QuoteSliderBlock;
// QuoteSliderBlock.tsx
// 'use client';

// import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
// import Quote from '@/components/molecules/frontend/Quote';
// import type { Quote as PayloadQuote } from '@/payload-types';
// import { useEffect, useRef, useState } from 'react';
// import BaseBlock from '../base-block/BaseBlock';

// export type QuoteSliderBlockProps = {
//     block: {
//         quotes?: (PayloadQuote | null)[];
//     };
// };

// const QuoteSliderBlock: React.FC<QuoteSliderBlockProps> = ({ block }) => {
//     const quotes: PayloadQuote[] = Array.isArray(block?.quotes) ? (block.quotes.filter(Boolean) as PayloadQuote[]) : [];

//     const totalSlides = quotes.length;
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const autoplayRef = useRef<number | null>(null);
//     const AUTOPLAY_MS = 6000;

//     useEffect(() => {
//         if (totalSlides <= 1) return;
//         autoplayRef.current = window.setInterval(() => {
//             setCurrentSlide((s) => (s + 1) % totalSlides);
//         }, AUTOPLAY_MS);

//         return () => {
//             if (autoplayRef.current) window.clearInterval(autoplayRef.current);
//         };
//     }, [totalSlides]);

//     useEffect(() => {
//         const onKey = (e: KeyboardEvent) => {
//             if (e.key === 'ArrowLeft') setCurrentSlide((s) => Math.max(0, s - 1));
//             if (e.key === 'ArrowRight') setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
//         };
//         window.addEventListener('keydown', onKey);
//         return () => window.removeEventListener('keydown', onKey);
//     }, [totalSlides]);

//     if (!totalSlides) return null;

//     return (
//         <BaseBlock>
//             <div className="oakgrid">
//                 <div className="relative overflow-hidden">
//                     <div
//                         className="flex transition-transform duration-500 ease-in-out"
//                         style={{
//                             width: `${totalSlides * 100}%`,
//                             transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
//                         }}
//                     >
//                         {quotes.map((q) => (
//                             <div key={q.id} className="w-full flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
//                                 <Quote richText={q.richText} name={q.name} showName={!!q.showName} />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mt-4">
//                         <PaginationBullets
//                             totalSlides={totalSlides}
//                             currentSlide={currentSlide}
//                             onBulletClick={(i) => {
//                                 setCurrentSlide(i);
//                                 if (autoplayRef.current) {
//                                     window.clearInterval(autoplayRef.current);
//                                     autoplayRef.current = window.setInterval(() => {
//                                         setCurrentSlide((s) => (s + 1) % totalSlides);
//                                     }, AUTOPLAY_MS);
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </BaseBlock>
//     );
// };

// export default QuoteSliderBlock;

'use client';

import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
import Quote from '@/components/molecules/frontend/Quote';
import type { Quote as PayloadQuote } from '@/payload-types';
import type { PayloadBlockProps } from 'payload/types';
import { useEffect, useRef, useState } from 'react';
import BaseBlock from '../base-block/BaseBlock';

const QuoteSliderBlock: React.FC<PayloadBlockProps<{ quotes?: (PayloadQuote | null)[] }>> = ({ data }) => {
    const quotes: PayloadQuote[] = Array.isArray(data?.quotes) ? (data.quotes.filter(Boolean) as PayloadQuote[]) : [];

    const totalSlides = quotes.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoplayRef = useRef<number | null>(null);
    const AUTOPLAY_MS = 6000;

    // Autoplay
    useEffect(() => {
        if (totalSlides <= 1) return;
        autoplayRef.current = window.setInterval(() => {
            setCurrentSlide((s) => (s + 1) % totalSlides);
        }, AUTOPLAY_MS);
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        };
    }, [totalSlides]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') setCurrentSlide((s) => Math.max(0, s - 1));
            if (e.key === 'ArrowRight') setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [totalSlides]);

    if (!totalSlides) return null;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            width: `${totalSlides * 100}%`,
                            transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
                        }}
                    >
                        {quotes.map((q) => (
                            <div key={q.id} className="w-full flex-shrink-0" style={{ width: `${100 / totalSlides}%` }}>
                                <Quote richText={q.richText} name={q.name} showName={q.showName} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <PaginationBullets
                            totalSlides={totalSlides}
                            currentSlide={currentSlide}
                            onBulletClick={(i) => {
                                setCurrentSlide(i);
                                if (autoplayRef.current) {
                                    window.clearInterval(autoplayRef.current);
                                    autoplayRef.current = window.setInterval(() => {
                                        setCurrentSlide((s) => (s + 1) % totalSlides);
                                    }, AUTOPLAY_MS);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default QuoteSliderBlock;
