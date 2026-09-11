'use client';
import { Facebook, Instagram, Youtube, type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import { useLocale } from '../i18n/LocaleProvider';
import { socialProfiles } from '../social';

/** Lucide has no TikTok glyph, so the brand mark is drawn inline at the same stroke weight. */
function TikTok({ size = 19 }: LucideProps) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
        <path d="M15.5 3a5 5 0 0 0 5 5"/>
        <path d="M15.5 3v11.5a5 5 0 1 1-5-5"/>
    </svg>;
}

const icons: Record<string, ComponentType<LucideProps>> = { Facebook, Instagram, YouTube: Youtube, TikTok };

export function SocialLinks({ className = '' }: { className?: string }) {
    const { t } = useLocale();
    return <nav className={`social-links ${className}`} aria-label={t("רשתות חברתיות")}>
        {socialProfiles.map(({ name, href }) => {
            const Icon = icons[name];
            return <a key={name} href={href} target="_blank" rel="noreferrer noopener" aria-label={t("ניקולאי ב־{0}", name)} title={name}><Icon size={19}/></a>;
        })}
    </nav>;
}
