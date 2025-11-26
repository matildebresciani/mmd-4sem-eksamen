'use client';

import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';

type Props = {
    articles: Article[];
};

const CardSliderClient = ({ articles }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="relative max-w-full h-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <PaginationButton action="prev" onClick={() => swiperRef.current?.slidePrev()} />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <PaginationButton action="next" onClick={() => swiperRef.current?.slideNext()} />
            </div>

            <Swiper
                spaceBetween={16}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2.05,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {articles.map((article) => (
                    <SwiperSlide key={article.id} className="w-full !h-auto">
                        <ArticleCard article={article} className="flex-grow" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSliderClient;
