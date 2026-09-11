import type { Metadata } from 'next';
import '../globals.css';
import '../inner.css';
import '../refinements.css';
import '../dark.css';
import { direction, resolveRoute } from '../i18n/config';
export const metadata: Metadata = {
  title: 'ניקולאי | מערכות מיזוג אוויר',
  description: 'תכנון, התקנה, שירות ותחזוקה למערכות מיזוג אוויר. פתרונות לבית ולעסק, מערכות VRF וליווי אישי עם ניקולאי.',
};
// Runs before first paint so a stored or system dark preference never flashes a light page.
const themeScript = `try{var s=localStorage.getItem('nikolai-theme');document.documentElement.dataset.theme=(s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches))?'dark':'light'}catch(e){}`;
export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{path?: string[]}>}>) {
  const { language } = resolveRoute((await params).path);
  return <html lang={language} dir={direction(language)} suppressHydrationWarning>
    <head>
      <meta name="theme-color" content="#f7fcff"/>
      <script dangerouslySetInnerHTML={{ __html: themeScript }}/>
    </head>
    <body>{children}</body>
  </html>;
}
