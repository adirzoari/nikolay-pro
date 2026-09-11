'use client';
import { useLocale } from "../i18n/LocaleProvider";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Expand, X } from 'lucide-react';
import { InnerHeader } from '../components/InnerHeader';
export const certificateFiles = [
    { file: 1, width: 828, height: 1156, title: "אישור הסמכה — Mitsubishi Electric" },
    { file: 2, width: 940, height: 1297, title: "מתקין מורשה — Fujitsu" },
    { file: 3, width: 1182, height: 1648, title: "הסמכה מקצועית — Samsung" },
    { file: 4, width: 3170, height: 2170, title: "תעודות מקצועיות — Toshiba ו־Tadiran VRF" },
    { file: 5, width: 1552, height: 1940, title: "תעודת טכנאי קירור ומיזוג — מכללת לפיד" },
    { file: 6, width: 1404, height: 2023, title: "תעודת גמר חשמלאי מוסמך — משרד העבודה" },
    { file: 7, width: 738, height: 1024, title: "תעודת חבר — התאחדות קבלני מיזוג אוויר וחימום" },
    { file: 8, width: 752, height: 1337, title: "תעודת סיום קורס — מכללת לפיד" },
    { file: 9, width: 682, height: 976, title: "אישור קבלן מיזוג — LG" },
    { file: 10, width: 825, height: 1174, title: "אישור הסמכה להתקנת מערכות VRF — Tadiran" },
    { file: 11, width: 768, height: 1024, title: "תעודת עוסק מורשה" },
] as const;
export default function CertificatesPage() {
    const { t, url } = useLocale();
    const certificates = certificateFiles.map((item) => ({ ...item, src: `/images/certificates/certificate-${item.file}.webp`, title: t(item.title) }));
    const [selected, setSelected] = useState<(typeof certificates)[number] | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (selected && !dialog.current?.open) dialog.current?.showModal();
        if (!selected && dialog.current?.open) dialog.current.close();
    }, [selected]);
    return <><InnerHeader /><main className="inner-main"><section className="inner-hero container"><a className="back-link" href={url("/")}><ArrowRight size={17}/>{t("חזרה לעמוד הבית")}</a><span className="eyebrow">{t("ידע, ניסיון ומקצועיות")}</span><h1>{t("תעודות והסמכות")}</h1><p>{t("גלריית ההכשרות המקצועיות של ניקולאי. לחצו על כל תעודה לתצוגה גדולה.")}</p></section><section className="container certificate-grid">{certificates.map((item) => <button key={item.src} className="certificate-card" onClick={() => setSelected(item)} aria-label={t("פתיחת {0}", item.title)}><Image src={item.src} alt={item.title} width={item.width} height={item.height} sizes="(max-width: 600px) 100vw, (max-width: 800px) 50vw, 33vw"/><span>{item.title}<Expand size={18}/></span></button>)}</section></main><dialog ref={dialog} className="certificate-dialog" aria-label={selected?.title} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if(event.target === event.currentTarget) setSelected(null); }}>{selected && <><button aria-label={t("סגירת התצוגה")} onClick={() => setSelected(null)}><X /></button><div onClick={(event) => event.stopPropagation()}><Image src={selected.src} alt={selected.title} width={selected.width} height={selected.height} sizes="(max-width: 900px) 94vw, 860px"/></div></>}</dialog></>;
}
