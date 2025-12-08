import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import type { BC } from '@/lib/types/block-props';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { cn } from '@/lib/utilities/ui';
import type { ArticleHero as ArticleHeroProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const ArticleHeroBlock: BC<ArticleHeroProps> = async ({ block, locale, pageId }) => {
    const { order, author } = block;

    const articleData = await getCachedEntryById({
        collection: 'articles',
        id: pageId,
        locale,
    });

    console.log('Article Data in Hero Block:', articleData);

    return (
        <BaseBlock classNameOuter="!pb-section-xxs">
            <div className="oakgrid gap-0">
                <div
                    className={cn(
                        'col-span-12 relative overflow-hidden w-full border border-border-base',
                        order === 'image-split' && 'lg:col-span-6 lg:col-start-1 min-h-[380px] h-full lg:border-r-0',
                        order === 'image-full-width' && 'min-h-[400px] border-b-0',
                    )}
                >
                    {articleData?.contentMeta?.featuredImage && (
                        <ImageMedia
                            fill
                            alt={articleData?.title || 'Article Image'}
                            resource={articleData?.contentMeta?.featuredImage}
                            imgClassName="object-cover w-full h-full"
                        />
                    )}
                    <div className="absolute top-4 left-4 z-10">
                        {articleData?.articleType && <CardLabel label={formatArticleLabel(articleData)} />}
                    </div>
                </div>
                <div
                    className={cn(
                        'col-span-12',
                        order === 'image-split' && 'lg:col-span-6 lg:col-start-7 flex h-[100%]',
                    )}
                >
                    <div className="border border-border-base space-y-s p-m">
                        <div className="flex gap-m">
                            {articleData?.publishedAt && <span>{formatDateTime(articleData.publishedAt, 'long')}</span>}
                            {articleData?.publishedAt && author && <span> | </span>}
                            {author && (
                                <span>
                                    Af{' '}
                                    <span className="italic">
                                        {typeof author === 'string' ? author : author.volunteerName}
                                    </span>
                                </span>
                            )}
                        </div>
                        <h1 className="heading-lg">{articleData?.title}</h1>
                        <p className="italic">{articleData?.contentMeta?.excerpt}</p>
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default ArticleHeroBlock;
