export const languages = [
  { code: 'he', label: 'עברית' }, { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }, { code: 'ar', label: 'العربية' },
  { code: 'am', label: 'አማርኛ' }, { code: 'ti', label: 'ትግርኛ' },
  { code: 'es', label: 'Español' },
] as const;
export type Language = typeof languages[number]['code'];
export const isLanguage = (value?: string): value is Language => languages.some(item => item.code === value);
export const direction = (lang: Language) => lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
export function localizedUrl(lang: Language, path = '/') {
  const target = path.startsWith('#') ? '/' + path : path;
  const suffix = lang === 'he' ? target : target === '/' ? '' : target.startsWith('/#') ? target.slice(1) : target;
  return (lang === 'he' ? '' : '/' + lang) + suffix;
}
export function resolveRoute(parts: string[] = []) {
  const language: Language = isLanguage(parts[0]) ? parts[0] : 'he';
  const slug = (isLanguage(parts[0]) ? parts.slice(1) : parts).join('/');
  return { language, slug };
}
