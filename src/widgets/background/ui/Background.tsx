'use client';
import Image from 'next/image';
import { useMedia } from 'use-media';
import blackEyes from '@/src/shared/assets/images/book-card/black-eyes.svg';
import whiteEyes from '@/src/shared/assets/images/book-card/white-eyes.svg';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

export const Background = () => {
  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });

  return (
    <article className="pointer-events-none fixed top-65 flex w-full flex-col items-center">
      <div className="relative h-[30px] w-[200px] lg:h-[37px] lg:w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className={`${isDark ? 'opacity-70' : ''} object-contain blur-[1px]`}
        />
      </div>
      <div
        className={`relative h-[600px] w-[800px] lg:h-[1000px] lg:w-[1450px]`}
      >
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="-mt-[300px] blur-[0.5px] lg:mt-0"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className={`${isDark ? 'lg:mt-0' : 'lg:mt-20px'} mt-[80px] rotate-180 blur-[0.5px]`}
        />
      </div>
    </article>
  );
};
