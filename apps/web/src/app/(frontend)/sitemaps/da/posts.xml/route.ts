import { getCachedSitemap } from '@/lib/data/payload/get-cached-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

const collection = 'posts';
const locale = 'da';

export async function GET() {
    const sitemap = await getCachedSitemap(collection, locale);
    return getServerSideSitemap(sitemap);
}
