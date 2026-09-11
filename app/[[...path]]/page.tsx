import { notFound } from 'next/navigation';
import Home from '../views/Home';
import ProjectsPage from '../views/ProjectsPage';
import CertificatesPage from '../views/CertificatesPage';
import GuidePage from '../views/GuidePage';
import { languages, resolveRoute } from '../i18n/config';
import { LocaleProvider } from '../i18n/LocaleProvider';
import { pageMetadata, slugs, structuredData } from '../seo';

type Props = { params: Promise<{ path?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return languages.flatMap(lang => slugs.map(slug => ({ path: [...(lang.code === 'he' ? [] : [lang.code]), ...(slug ? [slug] : [])] })));
}
export async function generateMetadata({ params }: Props) {
  const { language, slug } = resolveRoute((await params).path);
  return pageMetadata(language, slug);
}
export default async function Page({ params }: Props) {
  const { language, slug } = resolveRoute((await params).path);
  const pages = { '': Home, projects: ProjectsPage, certificates: CertificatesPage, guide: GuidePage };
  if (!(slug in pages)) notFound();
  const View = pages[slug as keyof typeof pages];
  return <LocaleProvider language={language}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(language, slug)).replace(/</g, '\\u003c') }}/><View/></LocaleProvider>;
}
