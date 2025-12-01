import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import type { Article } from '@/payload-types';
import Link from 'next/link';

type Props = {
    article: Article;
    showLabel?: boolean;
    className?: string;
};

const DefaultCard = ({ article, showLabel, className }: Props) => {
    return (
        <Link href={getArticleUrl(article)}>
            <div className={`border h-full flex flex-col ${className}`}>
                <div className="relative overflow-hidden w-full aspect-square border-b">
                    {article?.contentMeta?.featuredImage && (
                        <ImageMedia
                            fill
                            alt={article?.title || 'Article Image'}
                            resource={article?.contentMeta?.featuredImage}
                            imgClassName="object-cover w-full h-full"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    )}
                    {showLabel && (
                        <div className="absolute top-4 left-4 z-10">
                            <CardLabel label={formatArticleLabel(article)} />
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {article.genres && (
                            <span>
                                {typeof article.genres[0] === 'string' ? article.genres[0] : article.genres[0]?.name}
                            </span>
                        )}
                        {article.genres && article.artistName && <span>|</span>}
                        {article.artistName && <span>{article.artistName}</span>}
                    </div>
                    <div>{article.publishedAt && <span>{formatDateTime(article.publishedAt, 'long')}</span>}</div>
                </div>
                <h3>{article.title}</h3>
            </div>
        </Link>
    );
};

export default DefaultCard;
