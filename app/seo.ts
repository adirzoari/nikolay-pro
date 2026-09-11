import type { Metadata } from 'next';
import { languages, localizedUrl, type Language } from './i18n/config';
import { socialProfiles } from './social';
import { translator } from './i18n/translate';

export const origin = 'https://nikolai-air.awsfanadir.chatgpt.site';
export const slugs = ['', 'projects', 'certificates', 'guide'] as const;
export function pageMetadata(language: Language, slug: string): Metadata {
  const t = translator(language);
  const titles: Record<string, string> = { '': 'תכנון, התקנה ושירות למערכות מיזוג', projects: 'פרויקטים במיזוג אוויר', certificates: 'תעודות והסמכות', guide: 'לפני שמזמינים טכנאי מזגנים' };
  const descriptions: Record<string, string> = { '': 'פתרונות לבית, לתעשייה ולמשרד', projects: 'הצצה לסוגי העבודות והמערכות שאנחנו מבצעים.', certificates: 'ידע, ניסיון ומקצועיות', guide: 'בדיקות פשוטות, שאלות טובות ורשימת הכנה לביקור — כדי להתחיל ברגל ימין.' };
  const title = `${t(titles[slug] || titles[''])} | ${t('ניקולאי מערכות מיזוג אוויר')}`;
  const description = `${t(descriptions[slug] || descriptions[''])}. ${t('ליווי אישי מהתכנון ועד לביצוע')}`;
  const url = origin + localizedUrl(language, '/' + slug);
  return {
    title, description, metadataBase: new URL(origin),
    alternates: { canonical: url, languages: Object.fromEntries([...languages.map(lang => [lang.code, origin + localizedUrl(lang.code, '/' + slug)]), ['x-default', origin + '/' + slug]]) },
    openGraph: { type: 'website', title, description, url, siteName: t('ניקולאי מערכות מיזוג אוויר'), locale: language },
    twitter: { card: 'summary', title, description },
    robots: { index: true, follow: true },
  };
}
export function structuredData(language: Language, slug: string) {
  const t = translator(language);
  const home = origin + localizedUrl(language);
  return {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': origin + '/#business', name: t('ניקולאי מערכות מיזוג אוויר'), url: origin, telephone: '+972523322821', logo: origin + '/images/og/logo-512.png', sameAs: socialProfiles.map(profile => profile.href) },
      { '@type': 'WebSite', '@id': origin + '/#website', url: origin, name: t('ניקולאי מערכות מיזוג אוויר'), inLanguage: languages.map(item => item.code), publisher: { '@id': origin + '/#business' } },
      { '@type': 'WebPage', '@id': origin + localizedUrl(language, '/' + slug), url: origin + localizedUrl(language, '/' + slug), inLanguage: language, isPartOf: { '@id': origin + '/#website' } },
      ...(slug ? [{ '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: t('בית'), item: home }, { '@type': 'ListItem', position: 2, name: t(slug === 'guide' ? 'מדריך שימושי' : slug === 'projects' ? 'פרויקטים' : 'תעודות'), item: origin + localizedUrl(language, '/' + slug) } ] }] : []),
    ],
  };
}
