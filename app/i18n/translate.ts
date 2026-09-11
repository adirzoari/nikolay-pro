import { rows } from './messages';
import { extraRows } from './extra-messages';
import { languages, type Language } from './config';

const dictionary = new Map([...rows, ...extraRows].map(row => [row[0].trim(), row]));
export type Translator = (source: string, ...values: unknown[]) => string;
export function translator(language: Language): Translator {
  const index = languages.findIndex(item => item.code === language);
  return (source, ...values) => {
    const entry = dictionary.get(source.trim());
    const result = index === 0 ? source : entry?.[index];
    if (result === undefined) throw new Error(`Missing ${language} translation: ${source}`);
    const spaced = index === 0 ? result : (source.match(/^\s*/)?.[0] || '') + result.trim() + (source.match(/\s*$/)?.[0] || '');
    return spaced.replace(/\{(\d+)\}/g, (_, key) => String(values[Number(key)] ?? ''));
  };
}
