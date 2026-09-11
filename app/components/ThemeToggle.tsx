'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';

type Theme = 'light' | 'dark';

/**
 * Light/dark switch. The visible icon is chosen by CSS from html[data-theme], so the
 * button renders identically on the server and during hydration; the state below only
 * drives the label, and is read from the document after mount.
 */
export default function ThemeToggle() {
  const { t } = useLocale();
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => { setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'); }, []);

  function flip() {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.dataset.themeAnim = '';
      setTimeout(() => { delete root.dataset.themeAnim; }, 280);
    }
    root.dataset.theme = next;
    setTheme(next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#081529' : '#f7fcff');
    try { localStorage.setItem('nikolai-theme', next); } catch { /* Storage may be disabled. */ }
  }

  const dark = theme === 'dark';
  const label = dark ? t('מעבר למצב בהיר') : t('מעבר למצב כהה');
  return <button type="button" className="theme-toggle" onClick={flip} aria-label={label} title={label} aria-pressed={theme === null ? undefined : dark}>
    <Sun size={19} className="theme-icon-sun" aria-hidden="true"/>
    <Moon size={19} className="theme-icon-moon" aria-hidden="true"/>
  </button>;
}
