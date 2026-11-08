'use client';

import { useEffect, useRef, useState } from 'react';
import {
  chain,
  gear1,
  gear2,
  gear3,
  gearWide,
  gearSettings,
} from '@/src/shared/assets/images/scrollbar';

const GEAR_TYPES = [
  gear1,
  gear2,
  gear3,
  gearWide,
  gearSettings,
  gear1,
  gear2,
  gear3,
];

export const MechanicalScrollbar = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<HTMLDivElement[]>([]);
  const gearRefs = useRef<Array<Array<HTMLImageElement | null>>>([[], []]);
  const draggingRef = useRef(false);
  const lastYRef = useRef(0);
  const rotRef = useRef(0);
  const [repeats, setRepeats] = useState(3);
  const [gearCount, setGearCount] = useState(1);

  useEffect(() => {
    const updateRepeats = () => {
      const h = document.documentElement.scrollHeight;
      const r = Math.ceil((h + window.innerHeight) / 2380) + 2;
      setRepeats(Math.max(3, r));
      setGearCount(Math.ceil(window.innerWidth / 40) + 1);
    };
    updateRepeats();
    const ro = new ResizeObserver(updateRepeats);
    ro.observe(document.documentElement);
    window.addEventListener('resize', updateRepeats);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateRepeats);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let raf = 0;
    const update = () => {
      raf = 0;
      const sy = window.scrollY;
      trackRefs.current.forEach((track) => {
        if (track) track.style.transform = `translate3d(0, ${-sy}px, 0)`;
      });
      if (!reduced) {
        const delta = sy - lastYRef.current;
        rotRef.current += delta * 0.35;
        lastYRef.current = sy;
        gearRefs.current.forEach((row) => {
          row.forEach((g, i) => {
            if (g) {
              const dir = i === row.length - 1 ? -1 : i % 2 ? -1 : 1;
              g.style.transform = `rotate(${rotRef.current * dir}deg)`;
            }
          });
        });
      }
    };
    const scheduleUpdate = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    lastYRef.current = window.scrollY;
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !root) return;
      const rect = root.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (e.clientY - rect.top) / rect.height),
      );
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      window.scrollTo(0, progress * max);
    };
    const onPointerUp = () => {
      draggingRef.current = false;
    };
    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleUpdate);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[6] select-none"
      style={{ touchAction: 'none' }}
    >
      {(['left-0', 'right-0'] as const).map((side, sideIndex) => (
        <div
          key={side}
          ref={(el) => {
            if (el) trackRefs.current[sideIndex] = el;
          }}
          className={`pointer-events-auto absolute top-0 ${side} flex w-10 flex-col dark:invert`}
          style={{ willChange: 'transform' }}
        >
          {Array.from({ length: repeats }).map((_, i) => (
            <img
              key={i}
              src={chain.src}
              alt=""
              className="w-10"
              style={{ height: 2380 }}
            />
          ))}
        </div>
      ))}
      {(['top-[-20px]', 'bottom-[-20px]'] as const).map((position, row) => (
        <div
          key={position}
          className={`absolute inset-x-0 ${position} h-10 overflow-hidden dark:invert`}
        >
          <div className="flex h-10 w-max flex-row">
            {Array.from({ length: gearCount }).map((_, i) => (
              <img
                key={i}
                ref={(el) => {
                  gearRefs.current[row][i] = el;
                }}
                src={GEAR_TYPES[i % GEAR_TYPES.length].src}
                alt=""
                className="h-10 w-10 shrink-0"
                style={{ transformOrigin: 'center' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
