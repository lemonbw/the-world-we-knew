'use client';
import Image from 'next/image';
import { useMedia } from 'use-media';

import room from '@/src/shared/assets/images/background/room.png';

export const Background = () => {
  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });

  return (
    <article className="pointer-events-none fixed inset-0 z-5 flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative h-full w-full">
        <Image
          src={room}
          alt="room"
          loading="lazy"
          className="absolute inset-0 top-30 z-10 h-full w-full object-contain"
        />
      </div>
    </article>
  );
};
