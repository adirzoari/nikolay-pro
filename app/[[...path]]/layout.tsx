import type { Metadata } from 'next';
import '../globals.css';
import '../inner.css';
import '../refinements.css';
import { direction, resolveRoute } from '../i18n/config';
export const metadata: Metadata = {
  title: 'ניקולאי | מערכות מיזוג אוויר',
  description: 'תכנון, התקנה, שירות ותחזוקה למערכות מיזוג אוויר. פתרונות לבית ולעסק, מערכות VRF וליווי אישי עם ניקולאי.',
};
export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{path?: string[]}>}>) {
  const { language } = resolveRoute((await params).path);
  return <html lang={language} dir={direction(language)}><body>{children}</body></html>;
}
