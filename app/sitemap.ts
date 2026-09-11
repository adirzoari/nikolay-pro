import type { MetadataRoute } from 'next';
import { languages, localizedUrl } from './i18n/config';
import { origin } from './seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'projects', 'guide'].flatMap(slug => languages.map(language => ({
    url: origin + localizedUrl(language.code, '/' + slug),
    alternates: { languages: Object.fromEntries(languages.map(l => [l.code, origin + localizedUrl(l.code, '/' + slug)])) },
  })));
}
