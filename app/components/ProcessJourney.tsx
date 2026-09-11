'use client';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';

export default function ProcessJourney() {
  const { t, url } = useLocale();
  const steps = [
    { title: t('מדברים ומכירים'), text: t('מספרים לנו על החלל, על הצרכים ועל מה שחשוב לכם.') },
    { title: t('מתכננים את הפתרון'), text: t('בודקים את האפשרויות ומתאימים מערכת ותוכנית עבודה.') },
    { title: t('מתקינים ומפעילים'), text: t('מבצעים את העבודה, בודקים את המערכת, מסבירים על השימוש ונשארים כתובת להמשך.') },
  ];
  return <section className="section journey-section" id="process" aria-labelledby="journey-title">
    <div className="container">
      <div className="journey-heading"><h2 id="journey-title">{t('כך זה עובד')}</h2><p>{t('שלושה צעדים פשוטים, עם ליווי אישי לאורך הדרך.')}</p></div>
      <ol className="journey-track" role="list">{steps.map(({ title, text }, index) => <li key={title} className="journey-step">
        <span className="journey-number" aria-hidden="true">{index + 1}</span>
        <div className="journey-card"><h3>{title}</h3><p>{text}</p></div>
      </li>)}</ol>
      <div className="journey-bottom"><a className="button call" href={url('/#contact')}>{t('בואו נדבר')}<ArrowLeft size={18}/></a></div>
    </div>
  </section>;
}
