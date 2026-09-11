import type { Metadata } from 'next';
import { Heebo, Noto_Sans_Arabic, Noto_Sans_Ethiopic } from 'next/font/google';
import '../globals.css';
import '../inner.css';
import '../refinements.css';
import '../dark.css';
import { direction, resolveRoute } from '../i18n/config';

// Self-hosted by next/font, so there is no third-party round trip before first paint.
// The Noto families are attached per language below: only ar/am/ti ever download them.
// No `weight` list: all three are variable fonts, so one file per subset covers 400-900
// instead of one file per weight. preload stays off for the Noto families — the layout
// imports them on every page but only attaches their class for ar/am/ti, so preloading
// would push 364 KB of unused fonts at every other visitor.
const heebo = Heebo({ subsets: ['hebrew', 'latin'], display: 'swap', variable: '--font-heebo' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], display: 'swap', variable: '--font-arabic', preload: false });
const ethiopic = Noto_Sans_Ethiopic({ subsets: ['ethiopic'], display: 'swap', variable: '--font-ethiopic', preload: false });

export const metadata: Metadata = {
  title: 'ניקולאי | מערכות מיזוג אוויר',
  description: 'תכנון, התקנה, שירות ותחזוקה למערכות מיזוג אוויר. פתרונות לבית ולעסק, מערכות VRF וליווי אישי עם ניקולאי.',
};
// Runs before first paint so a stored or system dark preference never flashes a light page.
const themeScript = `try{var s=localStorage.getItem('nikolai-theme');document.documentElement.dataset.theme=(s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches))?'dark':'light'}catch(e){}`;
export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{path?: string[]}>}>) {
  const { language } = resolveRoute((await params).path);
  const script = language === 'ar' ? arabic : language === 'am' || language === 'ti' ? ethiopic : null;
  return <html lang={language} dir={direction(language)} className={[heebo.variable, script?.variable].filter(Boolean).join(' ')} suppressHydrationWarning>
    <head>
      <meta name="theme-color" content="#f7fcff"/>
      <script dangerouslySetInnerHTML={{ __html: themeScript }}/>
    </head>
    <body>{children}</body>
  </html>;
}
