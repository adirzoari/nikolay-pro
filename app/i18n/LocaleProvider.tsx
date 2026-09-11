'use client';
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { localizedUrl, type Language } from './config';
import { translator } from './translate';

const LocaleContext = createContext<Language>('he');
export function LocaleProvider({ language, children }: { language: Language; children: ReactNode }) {
  useEffect(() => { try { localStorage.setItem('nikolai-language', language); } catch { /* Storage may be disabled. */ } }, [language]);
  return <LocaleContext.Provider value={language}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const language = useContext(LocaleContext);
  return { language, t: translator(language), url: (path: string) => localizedUrl(language, path) };
}
