'use client';

import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';

type Props = {
    articles: Article[];
};

const ArticlesArchive = ({ articles }: Props) => {
    if (!articles?.length) return null;

    return (
        <section>
            <div>{articles[0] && <ArticleCard article={articles[0]} variant="featured" />}</div>
            <div className="grid md:grid-cols-3 gap-4">
                {articles.slice(1).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                {/* TODO: Show more button */}
            </div>
        </section>
    );
};

export default ArticlesArchive;
