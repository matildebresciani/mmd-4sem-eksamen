import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { initPayload } from '@/lib/config';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import Link from 'next/link';
import { getPayload } from 'payload';

type SearchParams = {
    query?: string | string[];
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams?: SearchParams;
}) {
    const raw = searchParams?.query;
    const q = Array.isArray(raw) ? raw[0] : (raw ?? '');

    const payload = await initPayload();

    const results = q
        ? await payload.find({
              collection: 'articles',
              depth: 1,
              where: {
                  or: [{ title: { like: q } }, { 'contentMeta.excerpt': { like: q } }],
              },
          })
        : { docs: [] };

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12">
                    <h1 className="heading-lg mb-8">Søgeresultater for: “{q}”</h1>
                    {results.docs.length === 0 && <p>Ingen artikler matchede din søgning.</p>}
                    <ul className="space-y-4">
                        {results.docs.map((article) => (
                            <li key={article.id}>
                                <Link href={getArticleUrl(article)} className="underline">
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </BaseBlock>
    );
}
