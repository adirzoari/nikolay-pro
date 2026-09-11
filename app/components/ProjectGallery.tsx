'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';
import { direction } from '../i18n/config';

/** Photo gallery for a single project: a stacked-preview card that opens a filmstrip lightbox. */
export function ProjectGallery({ title, photos }: { title: string; photos: string[] }) {
    const { t, language } = useLocale();
    const rtl = direction(language) === 'rtl';
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const dialog = useRef<HTMLDialogElement>(null);
    const strip = useRef<HTMLDivElement>(null);
    const total = photos.length;
    const caption = (position: number) => t("תמונה {0} מתוך {1}", position + 1, total);
    const step = useCallback((offset: number) => setIndex(current => (current + offset + total) % total), [total]);

    useEffect(() => {
        if (open && !dialog.current?.open) dialog.current?.showModal();
        if (!open && dialog.current?.open) dialog.current.close();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            // In RTL the visual "next" sits to the left, so the arrows swap meaning.
            if (event.key === 'ArrowRight') { event.preventDefault(); step(rtl ? -1 : 1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); step(rtl ? 1 : -1); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, rtl, step]);

    useEffect(() => {
        strip.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [index]);

    return <>
        <button className="project-gallery-trigger" onClick={() => { setIndex(0); setOpen(true); }} aria-label={t("פתיחת גלריית התמונות של {0}", title)}>
            {photos.slice(0, 3).map((photo, position) => <Image key={photo} src={photo} alt={position === 0 ? `${title} — ${caption(0)}` : ''} aria-hidden={position > 0} width={2560} height={1920} sizes="(max-width: 700px) 100vw, 33vw" priority={false}/>)}
            <span className="project-gallery-badge"><Images size={16}/>{t("{0} תמונות", total)}</span>
        </button>
        <dialog ref={dialog} className="project-gallery-dialog" aria-label={title} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
            {open && <>
                {/* Ambient wash: the current photo, blurred, so the frame picks up the room's light.
                    Requested tiny on purpose — a 58px blur scaled to the viewport cannot show more detail. */}
                <Image className="project-gallery-wash" src={photos[index]} alt="" aria-hidden width={192} height={144}/>
                <header>
                    <div><strong>{title}</strong><small>{caption(index)}</small></div>
                    <button onClick={() => setOpen(false)} aria-label={t("סגירת התצוגה")}><X size={20}/></button>
                </header>
                <div className="project-gallery-stage" onClick={event => event.stopPropagation()}>
                    <button className="project-gallery-arrow" onClick={() => step(rtl ? 1 : -1)} aria-label={t("התמונה הקודמת")}><ChevronRight size={26}/></button>
                    <figure><Image key={photos[index]} src={photos[index]} alt={`${title} — ${caption(index)}`} width={2560} height={1920} sizes="(max-width: 900px) 94vw, 900px" priority/></figure>
                    <button className="project-gallery-arrow" onClick={() => step(rtl ? -1 : 1)} aria-label={t("התמונה הבאה")}><ChevronLeft size={26}/></button>
                </div>
                <div className="project-gallery-strip" ref={strip} onClick={event => event.stopPropagation()}>
                    {photos.map((photo, position) => <button key={photo} className={position === index ? 'active' : ''} onClick={() => setIndex(position)} aria-label={caption(position)} aria-current={position === index}><Image src={photo} alt="" aria-hidden width={112} height={84}/></button>)}
                </div>
            </>}
        </dialog>
    </>;
}
