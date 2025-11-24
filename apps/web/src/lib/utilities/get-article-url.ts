import type { Article } from '@/payload-types';

export function getArticleUrl(article: Article) {
    switch (article.articleType) {
        case 'review':
            return `/anmeldelser/${article.slug}`;
        case 'interview':
            return `/interviews/${article.slug}`;
        case 'weekly-releases':
            return `/ugens-udgivelser/${article.slug}`;
        default:
            return `/artikel/${article.slug}`;
    }
}
