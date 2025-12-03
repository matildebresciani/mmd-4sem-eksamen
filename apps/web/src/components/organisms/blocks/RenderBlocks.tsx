import type { Locale, RoutedCollectionSlug } from '@/i18n/localized-collections';
import type { Article, Page } from '@/payload-types';
import type React from 'react';
import { Fragment } from 'react';
import ArticleAuthorBlock from './article-author/ArticleAuthor';
import ArticleHeroBlock from './article-hero/ArticleHero';
import ArticleSliderBlock from './article-slider/ArticleSlider';
import DividerBlock from './divider/Divider';
import FeaturedArticleBlock from './featured-article/FeaturedArticle';
import FormBlock from './form/Form';
import GalleryBlock from './gallery/Gallery';
import HeroBlock from './hero/Hero';
import ParagraphBlock from './paragraph/Paragraph';
import PlaylistBlock from './playlist-block/PlaylistBlock';
import QuoteBlock from './quote/QuoteBlock';
import RecentArticlesBlock from './recent-articles/RecentArticles';
import RelatedArticlesBlock from './related-articles/RelatedArticles';
import TextImageBlock from './text-image/TextImage';

const blockComponents = {
    hero: HeroBlock,
    paragraph: ParagraphBlock,
    'text-image': TextImageBlock,
    quote: QuoteBlock,
    divider: DividerBlock,
    'article-slider': ArticleSliderBlock,
    'recent-articles': RecentArticlesBlock,
    'article-author': ArticleAuthorBlock,
    'related-articles': RelatedArticlesBlock,
    playlist: PlaylistBlock,
    'article-hero': ArticleHeroBlock,
    'featured-article': FeaturedArticleBlock,
    gallery: GalleryBlock,
    form: FormBlock,
};

export const RenderBlocks: React.FC<{
    pageId: string;
    blocks: NonNullable<Page['layout'] | Article['layout']>[0][];
    locale?: Locale;
    collectionType?: RoutedCollectionSlug;
}> = (props) => {
    const { pageId, blocks, locale, collectionType } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType];

                        if (Block) {
                            return (
                                <Block
                                    // biome-ignore lint/suspicious/noArrayIndexKey: This should be fine for render blocks as they do not really change while in use
                                    key={index}
                                    pageId={pageId}
                                    // @ts-expect-error
                                    block={block}
                                    locale={locale}
                                    collectionType={collectionType}
                                />
                            );
                        }
                    }
                    console.warn(`Block type "${blockType}" not found in blockComponents`);
                    return null;
                })}
            </Fragment>
        );
    }

    return null;
};
