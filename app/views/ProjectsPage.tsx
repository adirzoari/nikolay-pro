'use client';
import { useLocale } from "../i18n/LocaleProvider";
import Image from 'next/image';
import { ArrowRight, Building2, GraduationCap, House, Layers3 } from 'lucide-react';
import { InnerHeader } from '../components/InnerHeader';
import { ProjectGallery } from '../components/ProjectGallery';
const collegePhotos = [1, 2, 3, 4, 5, 6].map(n => `/images/projects/college-ashkelon-${n}.webp`);
export default function ProjectsPage() {
    const { t, url } = useLocale();
    const projects = [
        { title: t("מערכת מיזוג לבית פרטי"), type: t("בתים ודירות"), image: 'home-ac.png', photos: [], icon: House, text: t("תכנון מערכת שמעניקה טמפרטורה נעימה בכל חלקי הבית, תוך התחשבות בחלוקת החלל ובמראה הנקי.") },
        { title: t("פתרון מיזוג למשרד"), type: t("משרדים ועסקים"), image: 'office-ac.png', photos: [], icon: Building2, text: t("התאמת מיזוג לחלל עבודה פעיל, עם פיזור אוויר נכון ושליטה נוחה באזורים השונים.") },
        { title: t("תכנון והתקנת מערכת VRF"), type: t("מערכות מתקדמות"), image: 'vrf.png', photos: [], icon: Layers3, text: t("פתרון רב־מערכתי למבנה גדול, משלב התכנון והכנת התשתיות ועד להתקנה ולהפעלה.") },
        { title: t("הרכבת המכללה למקצועות"), type: t("מבני ציבור וחינוך"), image: '', photos: collegePhotos, icon: GraduationCap, text: t("התקנת מערכת VRF של טושיבה בהספק של כ־160 טון קירור, בשלושה מעגלים נפרדים. הסרגל 5, אשקלון.") },
    ];
    return <><InnerHeader /><main className="inner-main"><section className="inner-hero container"><a className="back-link" href={url("/")}><ArrowRight size={17}/>{t("חזרה לעמוד הבית")}</a><span className="eyebrow">{t("העבודות שלנו")}</span><h1>{t("פרויקטים במיזוג אוויר")}</h1><p>{t("פתרונות שתוכננו סביב החלל, אופי השימוש והצרכים של הלקוח.")}</p></section><section className="container projects-page-grid">{projects.map(({ title, type, image, photos, icon: Icon, text }) => <article className="project-detail" key={title}><div className="project-detail-image">{photos.length ? <ProjectGallery title={title} photos={photos}/> : <Image src={`/images/${image}`} alt={title} fill sizes="(max-width: 700px) 100vw, 33vw"/>}</div><div className="project-detail-body"><span><Icon size={17}/>{type}</span><h2>{title}</h2><p>{text}</p><a href={`https://wa.me/972523322821?text=${encodeURIComponent(t("שלום ניקולאי, אשמח לשמוע פרטים על {0}", title))}`} target="_blank" rel="noreferrer">{t("רוצים פתרון דומה? דברו איתנו")}</a></div></article>)}</section></main></>;
}
