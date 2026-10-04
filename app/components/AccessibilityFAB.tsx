'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, Minus, Plus, RotateCcw, Contrast, ZapOff } from 'lucide-react';

type FontScale = 0 | 1 | 2;

/** Minimal built-in translations so the FAB works without LocaleProvider context. */
const LABELS: Record<string, Record<string, string>> = {
  he: {
    fab: 'כלי נגישות',
    fontSize: 'גודל טקסט',
    decrease: 'הקטנת גופן',
    increase: 'הגדלת גופן',
    contrast: 'ניגודיות גבוהה',
    motion: 'הפחתת אנימציות',
    reset: 'איפוס',
  },
  ar: {
    fab: 'أدوات إمكانية الوصول',
    fontSize: 'حجم الخط',
    decrease: 'تصغير الخط',
    increase: 'تكبير الخط',
    contrast: 'تباين عالٍ',
    motion: 'تقليل الحركة',
    reset: 'إعادة ضبط',
  },
  ru: {
    fab: 'Доступность',
    fontSize: 'Размер текста',
    decrease: 'Уменьшить',
    increase: 'Увеличить',
    contrast: 'Высокий контраст',
    motion: 'Меньше анимаций',
    reset: 'Сбросить',
  },
  es: {
    fab: 'Accesibilidad',
    fontSize: 'Tamaño de texto',
    decrease: 'Reducir texto',
    increase: 'Ampliar texto',
    contrast: 'Alto contraste',
    motion: 'Reducir animaciones',
    reset: 'Restablecer',
  },
  en: {
    fab: 'Accessibility',
    fontSize: 'Text size',
    decrease: 'Decrease text size',
    increase: 'Increase text size',
    contrast: 'High contrast',
    motion: 'Reduce animations',
    reset: 'Reset',
  },
};

function lbl(lang: string, key: string): string {
  return (LABELS[lang] ?? LABELS.en)[key] ?? LABELS.en[key];
}

interface Props {
  lang: string;
}

export default function AccessibilityFAB({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>(0);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Restore persisted preferences on mount (the init script already applied them to the DOM,
  // this syncs React state to match so buttons render correctly).
  useEffect(() => {
    try {
      const scale = Number(localStorage.getItem('nikolai-a11y-font') ?? 0) as FontScale;
      const contrast = localStorage.getItem('nikolai-a11y-contrast') === 'high';
      const motion = localStorage.getItem('nikolai-a11y-motion') === 'reduced';
      if (scale) setFontScale(scale);
      if (contrast) setHighContrast(true);
      if (motion) setReducedMotion(true);
    } catch { /* Storage may be disabled. */ }
  }, []);

  // Apply data-fontscale to <html>.
  useEffect(() => {
    const root = document.documentElement;
    if (fontScale > 0) root.dataset.fontscale = String(fontScale);
    else delete root.dataset.fontscale;
  }, [fontScale]);

  // Apply data-contrast to <html>.
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) root.dataset.contrast = 'high';
    else delete root.dataset.contrast;
  }, [highContrast]);

  // Apply data-motion to <html>.
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) root.dataset.motion = 'reduced';
    else delete root.dataset.motion;
  }, [reducedMotion]);

  // Close panel on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    };
    const onOutside = (e: PointerEvent) => {
      if (
        !panelRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, [open]);

  function changeFontScale(delta: number) {
    const next = Math.max(0, Math.min(2, fontScale + delta)) as FontScale;
    setFontScale(next);
    try { localStorage.setItem('nikolai-a11y-font', String(next)); } catch { /* ignore */ }
  }

  function toggleContrast() {
    const next = !highContrast;
    setHighContrast(next);
    try { localStorage.setItem('nikolai-a11y-contrast', next ? 'high' : ''); } catch { /* ignore */ }
  }

  function toggleMotion() {
    const next = !reducedMotion;
    setReducedMotion(next);
    try { localStorage.setItem('nikolai-a11y-motion', next ? 'reduced' : ''); } catch { /* ignore */ }
  }

  function reset() {
    setFontScale(0);
    setHighContrast(false);
    setReducedMotion(false);
    try {
      localStorage.removeItem('nikolai-a11y-font');
      localStorage.removeItem('nikolai-a11y-contrast');
      localStorage.removeItem('nikolai-a11y-motion');
    } catch { /* ignore */ }
  }

  const isModified = fontScale > 0 || highContrast || reducedMotion;
  const t = (key: string) => lbl(lang, key);

  return (
    <div className="a11y-shell">
      {open && (
        <div ref={panelRef} className="a11y-panel" role="dialog" aria-label={t('fab')}>

          {/* Font size row */}
          <p className="a11y-section-label">{t('fontSize')}</p>
          <div className="a11y-font-row" dir="ltr">
            <button
              type="button"
              className="a11y-font-btn"
              onClick={() => changeFontScale(-1)}
              disabled={fontScale === 0}
              aria-label={t('decrease')}
            >
              <Minus size={14} aria-hidden="true"/>
            </button>
            <span className="a11y-font-sample" aria-live="polite" aria-atomic="true">
              {fontScale === 0 ? 'A' : fontScale === 1 ? 'A+' : 'A++'}
            </span>
            <button
              type="button"
              className="a11y-font-btn"
              onClick={() => changeFontScale(1)}
              disabled={fontScale === 2}
              aria-label={t('increase')}
            >
              <Plus size={14} aria-hidden="true"/>
            </button>
          </div>

          <div className="a11y-divider" role="separator"/>

          {/* High contrast toggle */}
          <button
            type="button"
            className={`a11y-toggle${highContrast ? ' on' : ''}`}
            onClick={toggleContrast}
            aria-pressed={highContrast}
          >
            <Contrast size={16} aria-hidden="true"/>
            <span>{t('contrast')}</span>
          </button>

          {/* Reduced motion toggle */}
          <button
            type="button"
            className={`a11y-toggle${reducedMotion ? ' on' : ''}`}
            onClick={toggleMotion}
            aria-pressed={reducedMotion}
          >
            <ZapOff size={16} aria-hidden="true"/>
            <span>{t('motion')}</span>
          </button>

          {/* Reset — only shown when something is active */}
          {isModified && (
            <button type="button" className="a11y-reset-btn" onClick={reset}>
              <RotateCcw size={13} aria-hidden="true"/>
              {t('reset')}
            </button>
          )}
        </div>
      )}

      {/* FAB trigger */}
      <button
        ref={triggerRef}
        type="button"
        className={`a11y-fab${isModified ? ' has-active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={t('fab')}
        title={t('fab')}
      >
        <Accessibility size={22} aria-hidden="true"/>
      </button>
    </div>
  );
}
