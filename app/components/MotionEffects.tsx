'use client';

import { useEffect } from 'react';
import AirflowCanvas from './AirflowCanvas';

export default function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const revealGroups = [
      '.section-heading', '.service-card', '.service-tags span', '.about-photo',
      '.about-copy > *', '.project-card', '.process-step',
      '.tips-intro > *', '.tip-card', '.faq-item', '.contact-copy > *',
      '.contact-panel form', '.benefits > div'
    ];
    const items = Array.from(document.querySelectorAll<HTMLElement>(revealGroups.join(',')));
    items.forEach((item, index) => {
      item.classList.add('motion-reveal');
      item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 90}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -7% 0px' });
    items.forEach((item) => observer.observe(item));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        root.style.setProperty('--scroll-progress', `${max > 0 ? scrollY / max : 0}`);
        root.style.setProperty('--hero-shift', `${Math.min(scrollY * 0.12, 72)}px`);
        frame = 0;
      });
    };

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.service-card, .project-card, .tip-card'));
    const moveHandlers = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - box.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - box.top}px`);
      };
      card.addEventListener('pointermove', move);
      return { card, move };
    });

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      moveHandlers.forEach(({ card, move }) => card.removeEventListener('pointermove', move));
    };
  }, []);

  return <><AirflowCanvas/><div className="scroll-progress" aria-hidden="true"/><div className="ambient-orb orb-one" aria-hidden="true"/><div className="ambient-orb orb-two" aria-hidden="true"/></>;
}
