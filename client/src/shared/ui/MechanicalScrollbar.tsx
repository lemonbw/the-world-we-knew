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
      setRepeats((prev) => (prev !== Math.max(3, r) ? Math.max(3, r) : prev));
      const count = Math.ceil(window.innerWidth / 30) + 3;
      setGearCount((prev) => (prev !== count ? count : prev));
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
      const delta = sy - lastYRef.current;
      if (delta === 0) return;
      if (!reduced) {
        rotRef.current += delta * 0.35;
        gearRefs.current.forEach((row) => {
          row.forEach((g, i) => {
            if (g) {
              const dir = i === row.length - 1 ? -1 : i % 2 ? -1 : 1;
              g.style.transform = `rotate(${(rotRef.current % 360) * dir}deg)`;
            }
          });
        });
      }
      lastYRef.current = sy;
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
      className="pointer-events-none fixed inset-0 z-[55] select-none"
      style={{ touchAction: 'none' }}
    >
      {[
        { side: '-left-3 sm:-left-5', sideIndex: 0 },
        { side: '-right-3 sm:-right-5', sideIndex: 1 },
      ].map(({ side, sideIndex }) => (
        <div
          key={side}
          ref={(el) => {
            if (el) trackRefs.current[sideIndex] = el;
          }}
          className={`pointer-events-auto absolute top-0 ${side} flex w-6 flex-col dark:invert sm:w-10`}
          style={{ willChange: 'transform' }}
        >
          {Array.from({ length: repeats }).map((_, i) => (
            <img
              key={i}
              src={chain.src}
              alt=""
              className="h-auto w-6 sm:w-10"
            />
          ))}
        </div>
      ))}
      {[
        { position: '-top-5', row: 0 },
        { position: '-bottom-5', row: 1 },
      ].map(({ position, row }) => (
        <div
          key={position}
          className={`fixed inset-x-0 ${position} pointer-events-none z-[55] h-10 overflow-hidden dark:invert`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="flex h-10 w-max flex-row">
            {Array.from({ length: gearCount }).map((_, i) => (
              <img
                key={i}
                ref={(el) => {
                  gearRefs.current[row][i] = el;
                  if (el) {
                    const dir = i === gearCount - 1 ? -1 : i % 2 ? -1 : 1;
                    el.style.transform = `rotate(${(rotRef.current % 360) * dir}deg)`;
                  }
                }}
                src={GEAR_TYPES[i % GEAR_TYPES.length].src}
                alt=""
                className="h-10 w-10 shrink-0"
                style={{
                  transformOrigin: 'center',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
