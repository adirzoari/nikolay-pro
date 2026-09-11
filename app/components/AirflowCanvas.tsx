'use client';

import { useEffect, useRef } from 'react';

export default function AirflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, tick = 0, width = 0, height = 0;
    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mobile = width < 620;
      // Match the outlet in hero-background.png instead of crossing the headline.
      const sourceX = width * (mobile ? .43 : .46);
      const sourceY = height * (mobile ? .27 : .285);
      const length = width * (mobile ? .34 : .29);
      ctx.lineCap = 'round'; ctx.globalCompositeOperation = 'screen';
      for (let index = 0; index < 7; index += 1) {
        const spread = index - 3;
        const startX = sourceX + spread * (mobile ? 9 : 14);
        const startY = sourceY + Math.abs(spread) * 1.5;
        const endX = startX - length - Math.abs(spread) * 8;
        const endY = sourceY + height * (mobile ? .34 : .36) + Math.abs(spread) * 7;
        const gradient = ctx.createLinearGradient(startX, sourceY, endX, endY);
        gradient.addColorStop(0, 'rgba(67,197,255,.95)');
        gradient.addColorStop(.52, 'rgba(179,244,255,.62)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = gradient; ctx.lineWidth = index === 3 ? 2.5 : 1.7;
        ctx.setLineDash([20, 16]); ctx.lineDashOffset = -(tick * .75 + index * 9);
        ctx.beginPath(); ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(startX - length * .03, sourceY + height * .14, endX + length * .3, endY - height * .04, endX, endY);
        ctx.stroke();
      }
      ctx.setLineDash([]); ctx.globalCompositeOperation = 'source-over';
    };
    const animate = () => { tick += 1; draw(); raf = requestAnimationFrame(animate); };
    resize(); draw(); if (!reduced) animate(); addEventListener('resize', resize);
    return () => { removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="airflow-canvas" aria-hidden="true" />;
}
