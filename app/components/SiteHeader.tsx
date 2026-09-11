'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Languages, Menu, Phone, X, ChevronDown, Check } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';
import { languages, localizedUrl, resolveRoute } from '../i18n/config';

export default function SiteHeader() {
  const { t, url, language } = useLocale();
  const pathname = usePathname();
  const { slug } = resolveRoute(pathname.split('/').filter(Boolean));
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      root.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'));
      toggle.current?.focus();
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false);
        root.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'));
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, []);
  const links = [
    ['/', t('בית')], ['/#services', t('שירותים')], ['/#about', t('אודות')],
    ['/projects', t('פרויקטים')], ['/certificates', t('תעודות')], ['/guide', t('מדריך שימושי')],
  ];
  return <header ref={root} className="site-nav-shell">
    <div className="site-nav-bar">
      <a className="nav-brand" href={url('/')} aria-label={t('ניקולאי — לעמוד הראשי')}>
        <Image src="/images/logo-nikolay.png" alt={t('ניקולאי מערכות מיזוג אוויר')} width={66} height={70} priority/>
      </a>
      <nav id="primary-navigation" className={`primary-navigation ${open ? 'is-open' : ''}`} aria-label={t('ניווט ראשי')}>
        {links.map(([href, text]) => <a key={href} href={url(href)} aria-current={href === '/' + slug ? 'page' : undefined} onClick={() => setOpen(false)}>{text}</a>)}
        <a className="nav-mobile-contact" href={url('/#contact')} onClick={() => setOpen(false)}>{t('צור קשר')}</a>
      </nav>
      <div className="nav-actions">
        <details className="language-menu">
          <summary aria-label={t('בחירת שפה')}><Languages size={19}/><span>{languages.find(item => item.code === language)?.label}</span><ChevronDown size={14}/></summary>
          <nav aria-label={t('בחירת שפה')}>
            {languages.map(item => <a key={item.code} href={localizedUrl(item.code, '/' + slug)} hrefLang={item.code} lang={item.code} aria-current={item.code === language ? 'true' : undefined} onClick={() => { try { localStorage.setItem('nikolai-language', item.code); } catch {} }}><span>{item.label}</span>{item.code === language && <Check size={15}/>}</a>)}
          </nav>
        </details>
        <a className="button call nav-phone" href="tel:0523322821" aria-label={t('חייגו עכשיו')}><Phone size={18}/><span dir="ltr">052-332-2821</span></a>
        <button ref={toggle} className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={t(open ? 'סגירת תפריט' : 'פתיחת תפריט')} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}
