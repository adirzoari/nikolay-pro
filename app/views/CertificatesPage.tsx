'use client';
import { useLocale } from "../i18n/LocaleProvider";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Expand, X } from 'lucide-react';
import { InnerHeader } from '../components/InnerHeader';
export default function CertificatesPage() {
    const { t, url } = useLocale();
    const certificates = [1, 2, 3].map((number) => ({ src: `/images/certificate-${number}.png`, title: t("תעודה מקצועית {0}", number) }));
    const [selected, setSelected] = useState<(typeof certificates)[number] | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (selected && !dialog.current?.open) dialog.current?.showModal();
        if (!selected && dialog.current?.open) dialog.current.close();
    }, [selected]);
    return <><InnerHeader /><main className="inner-main"><section className="inner-hero container"><a className="back-link" href={url("/")}><ArrowRight size={17}/>{t("חזרה לעמוד הבית")}</a><span className="eyebrow">{t("ידע, ניסיון ומקצועיות")}</span><h1>{t("תעודות והסמכות")}</h1><p>{t("גלריית ההכשרות המקצועיות של ניקולאי. לחצו על כל תעודה לתצוגה גדולה. התעודות המוצגות כרגע הן תמונות זמניות ויוחלפו במסמכים המקוריים.")}</p></section><section className="container certificate-grid">{certificates.map((item) => <button key={item.src} className="certificate-card" onClick={() => setSelected(item)} aria-label={t("פתיחת {0}", item.title)}><Image src={item.src} alt={t("{0} — תמונה זמנית", item.title)} width={600} height={650}/><span>{item.title}<Expand size={18}/></span></button>)}</section></main><dialog ref={dialog} className="certificate-dialog" aria-label={selected?.title} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if(event.target === event.currentTarget) setSelected(null); }}>{selected && <><button aria-label={t("סגירת התצוגה")} onClick={() => setSelected(null)}><X /></button><div onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.title} width={900} height={975}/></div></>}</dialog></>;
}
