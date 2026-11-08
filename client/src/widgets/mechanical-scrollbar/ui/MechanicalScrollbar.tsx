'use client';

import { chain } from '@/src/shared/assets/images/scrollbar';
import {
  useMechanicalScroll,
  GEAR_TYPES,
  TRACK_SIDES,
  GEAR_ROWS,
} from '../model';

export const MechanicalScrollbar = () => {
  const {
    rootRef,
    repeats,
    gearCount,
    registerTrackRef,
    registerGearRef,
  } = useMechanicalScroll();

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 h-screen h-[100lvh] z-[6] select-none"
      style={{ touchAction: 'none' }}
    >
      {TRACK_SIDES.map(({ side, sideIndex }) => (
        <div
          key={side}
          ref={registerTrackRef(sideIndex)}
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
      {GEAR_ROWS.map(({ position, row }) => (
        <div
          key={position}
          className={`absolute inset-x-0 ${position} pointer-events-none h-10 overflow-hidden dark:invert`}
        >
          <div className="flex h-10 w-max flex-row">
            {Array.from({ length: gearCount }).map((_, i) => (
              <img
                key={i}
                ref={registerGearRef(row, i, gearCount)}
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
