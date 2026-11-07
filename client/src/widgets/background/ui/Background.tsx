'use client';
import Image from 'next/image';
import { useMedia } from 'use-media';
import blackEyes from '@/src/shared/assets/images/book-card/black-eyes.svg';
import whiteEyes from '@/src/shared/assets/images/book-card/white-eyes.svg';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

import room from '@/src/shared/assets/images/background/room.png';

export const Background = () => {
  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });

  return (
    <article className="pointer-events-none fixed top-20 z-[1] flex w-full flex-col items-center lg:top-65">
      <div className="relative h-[30px] w-[200px] lg:h-[37px] lg:w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className={`${isDark ? 'opacity-70' : ''} object-contain`}
        />
      </div>
      <div className="relative h-[600px] w-[800px] lg:aspect-[403/268] lg:h-auto lg:w-[110vw]">
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="z-0 mt-[100px] object-cover lg:mt-0"
        />
        <Image
          src={room}
          alt="room"
          loading="lazy"
          className="absolute top-1/7 left-1/2 z-10 h-250 w-330 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </article>
  );
};
