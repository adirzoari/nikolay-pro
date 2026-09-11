'use client';
import { useState } from 'react';
import { ArrowRight, ClipboardCheck, MessageCircle, RotateCcw } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import { useLocale } from '../i18n/LocaleProvider';

export default function GuidePage() {
  const { t, url } = useLocale();
  const [checked, setChecked] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const checks = [t('רשמתי את דגם המזגן'), t('תיעדתי מתי התקלה מופיעה'), t('הכנתי תמונה או סרטון'), t('וידאתי שיש גישה פנויה למזגן')];
  const articles = [
    [t('איך בוחרים מזגן שמתאים לבית?'), t('כדאי לבחון את גודל החלל, כיווני השמש, הבידוד ואופן השימוש. מערכת גדולה יותר אינה תמיד הבחירה הנכונה. תכנון מקצועי עוזר להתאים את המערכת לצרכים ולאילוצי הבית.')],
    [t('איך שומרים על המזגן לאורך זמן?'), t('נקו מסננים בהתאם להוראות היצרן, שמרו על פתחי האוויר פנויים ושימו לב לרעשים חריגים או לירידה בביצועים. לפני ניקוי יש לכבות ולנתק את המכשיר לפי הוראות היצרן. עבודות חשמל וטיפול פנימי משאירים לאיש מקצוע.')],
    [t('מתי מפסיקים שימוש ופונים לאיש מקצוע?'), t('בריח שרוף, עשן, מים ליד חשמל או מפסק שקופץ שוב ושוב — הפסיקו שימוש ואל תנסו לתקן לבד. אל תגעו בחיבורים רטובים. פנו לאיש מקצוע; במקרה חירום פנו לשירותי החירום.')],
  ];
  const message = t('שלום ניקולאי, אני מתכונן לביקור טכנאי.\nהכנתי: {0}\nפרטים נוספים: {1}', checked.map(i => checks[i]).join('; '), notes);
  return <><SiteHeader/><main className="inner-main" id="main">
    <section className="inner-hero container"><a className="back-link" href={url('/')}><ArrowRight size={17}/>{t('חזרה לעמוד הבית')}</a><span className="eyebrow">{t('טיפים ומידע שימושי')}</span><h1>{t('לפני שמזמינים טכנאי מזגנים')}</h1><p>{t('בדיקות פשוטות, שאלות טובות ורשימת הכנה לביקור — כדי להתחיל ברגל ימין.')}</p></section>
    <div className="container guide-layout"><section className="guide-articles" aria-label={t('מדריך שימושי')}>
      {articles.map(([title, text], i) => <article key={title} id={`advice-${i + 1}`}><span className="eyebrow">0{i + 1}</span><h2>{title}</h2><p>{text}</p></article>)}
      <a className="text-link" href={url('/#quick-check')}>{t('לבדיקת התקלה המהירה')}</a>
    </section><aside className="visit-checklist" aria-labelledby="checklist-title"><ClipboardCheck size={30}/><h2 id="checklist-title">{t('מוכנים לביקור?')}</h2><p>{t('סמנו מה כבר הכנתם. אין צורך לפרק או לפתוח את המזגן.')}</p>
      <progress value={checked.length} max={checks.length} aria-label={t('התקדמות ההכנה')}/><span className="checklist-count" role="status">{t('{0} מתוך {1} הושלמו', checked.length, checks.length)}</span>
      <div className="checklist-items">{checks.map((label, i) => <label key={i}><input type="checkbox" checked={checked.includes(i)} onChange={() => setChecked(current => current.includes(i) ? current.filter(n => n !== i) : [...current, i])}/><span>{label}</span></label>)}</div>
      <label className="checklist-notes">{t('כמה מילים על הפנייה')}<textarea value={notes} maxLength={700} rows={3} onChange={event => setNotes(event.target.value)} placeholder={t('סוג החלל, המזגן או התקלה...')}/></label>
      <a className="button whatsapp" href={`https://wa.me/972523322821?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle size={19}/>{t('שליחת סיכום לניקולאי')}</a>
      <button type="button" className="checklist-reset" onClick={() => { setChecked([]); setNotes(''); }}><RotateCcw size={15}/>{t('איפוס הרשימה')}</button><p className="form-note">{t('הפרטים ייפתחו בהודעה מוכנה בוואטסאפ. השליחה מתבצעת על ידכם.')}</p>
    </aside></div>
  </main></>;
}
