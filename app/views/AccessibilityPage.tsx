'use client';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import { useLocale } from '../i18n/LocaleProvider';

const UPDATED = 'אוקטובר 2026';
const PHONE = '052-332-2821';
const WHATSAPP = 'https://wa.me/972523322821';

export default function AccessibilityPage() {
  const { url } = useLocale();
  return (
    <>
      <SiteHeader />
      <main className="inner-main" id="main">
        <section className="inner-hero container">
          <a className="back-link" href={url('/')}>
            <ArrowRight size={17} />
            חזרה לעמוד הבית
          </a>
          <span className="eyebrow">מידע משפטי</span>
          <h1>הצהרת נגישות</h1>
          <p>אנו מחויבים להנגשת האתר לכלל המשתמשים, לרבות אנשים עם מוגבלויות.</p>
        </section>

        <div className="container legal-page-content">
          <p className="legal-meta">עודכן לאחרונה: {UPDATED}</p>

          <h2>1. מחויבותנו לנגישות</h2>
          <p>
            ניקולאי אנדריצ׳נקו / אשל המיזוג מאמינים כי לכל אדם הזכות לגשת למידע ולשירותים שלנו, ללא קשר ליכולותיו הפיזיות, קוגניטיביות או הטכנולוגיות.
            אנו שואפים לעמוד בתקן WCAG 2.1 ברמה AA, כפי שמוגדר על-ידי הקונסורציום הבינלאומי לרשת האינטרנט (W3C).
          </p>
          <p>
            האתר נבנה תוך תשומת לב לעקרונות הנגישות, ואנו ממשיכים לשפר אותו בהתאם לתקנות הנגישות ולמשוב המשתמשים.
          </p>

          <h2>2. התאמות נגישות שבוצעו</h2>
          <p>בין ההתאמות שיושמו באתר:</p>
          <ul>
            <li><strong>דילוג לתוכן הראשי</strong> — קישור "דלגו לתוכן" בראש כל עמוד לניווט מקלדת מהיר</li>
            <li><strong>תגיות ARIA ושמות נגישים</strong> — כפתורים, אזורי ניווט ואלמנטים אינטראקטיביים מסומנים בתגיות <code>aria-label</code>, <code>aria-expanded</code>, <code>aria-current</code> ו-<code>role</code> מתאימות</li>
            <li><strong>ניווט במקלדת</strong> — כל הפעולות זמינות למשתמשי מקלדת בלבד; סגירת תפריטים בלחיצת Escape</li>
            <li><strong>מחוון פוקוס גלוי</strong> — כל האלמנטים האינטראקטיביים מציגים מסגרת פוקוס ברורה</li>
            <li><strong>HTML סמנטי</strong> — שימוש נכון ב-<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;h1&gt;–&lt;h3&gt;</code> לפי היררכיה</li>
            <li><strong>טקסט חלופי לתמונות</strong> — תמונות תוכן מכילות תיאור <code>alt</code> רלוונטי; תמונות קישוט מוגדרות עם <code>alt=""</code></li>
            <li><strong>כיוון קריאה (RTL/LTR)</strong> — תמיכה מלאה בעברית ובערבית מימין לשמאל, ובשפות נוספות משמאל לימין</li>
            <li><strong>רספונסיביות</strong> — האתר מתאים לטווח רחב של מסכים, ממכשירים ניידים ועד תצוגות שולחן עבודה</li>
            <li><strong>תמיכה ב-prefers-reduced-motion</strong> — אנימציות ואפקטים מבוטלים למשתמשים שהגדירו העדפה להפחתת תנועה</li>
            <li><strong>ניגודיות צבעים</strong> — שמירה על יחס ניגודיות מינימלי לפי תקן WCAG</li>
            <li><strong>גופנים ברי-קריאה</strong> — שימוש בגופן Heebo המותאם לעברית ולאנגלית</li>
          </ul>

          <h2>3. מגבלות ידועות</h2>
          <p>
            אנו ממשיכים לשפר את נגישות האתר ונשמח לשמוע על כל בעיה שנתקלתם בה.
            אם גיליתם תוכן שאינו נגיש או פונקציונליות שאינה עובדת כראוי עם טכנולוגיות מסייעות, אנא צרו קשר (ראו סעיף 5).
          </p>

          <h2>4. רכז נגישות</h2>
          <p>
            <strong>שם רכז הנגישות:</strong> ניקולאי אנדריצ׳נקו
          </p>
          <p>
            לפנייה בנושאי נגישות ניתן לפנות לרכז הנגישות בדרכים המפורטות בסעיף 5 להלן.
          </p>

          <h2>5. דיווח על בעיית נגישות</h2>
          <p>
            נתקלתם בבעיית נגישות באתר? אנחנו כאן לעזור. ניתן לפנות אלינו בכל אחת מהדרכים הבאות:
          </p>
          <ul>
            <li>טלפון: <a href="tel:0523322821" dir="ltr">{PHONE}</a></li>
            <li>WhatsApp: <a href={WHATSAPP} target="_blank" rel="noreferrer">שלחו הודעה</a></li>
            <li>דוא&quot;ל: <a href="mailto:mizug.alef@gmail.com">mizug.alef@gmail.com</a></li>
          </ul>
          <p>
            אנו נשתדל להגיב לפניות נגישות בתוך 5 ימי עבודה ולטפל בבעיות בהקדם האפשרי.
          </p>

          <h2>6. בסיס החוקי</h2>
          <p>
            הצהרה זו נערכת בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
            תשע&quot;ג-2013, ותקן ישראלי 5568 לנגישות תכנים באינטרנט.
          </p>

          <h2>7. תאריך עדכון ההצהרה</h2>
          <p>
            הצהרת נגישות זו עודכנה לאחרונה בחודש {UPDATED}.
            אנו בוחנים ומעדכנים הצהרה זו באופן שוטף בהתאם לשינויים באתר ובתקנים הרלוונטיים.
          </p>
        </div>
      </main>
    </>
  );
}
