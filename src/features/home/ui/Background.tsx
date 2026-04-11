"use client"
import Image from 'next/image';
import { useMedia } from 'use-media';
import blackEyes from '@/src/shared/assets/images/book-card/black-eyes.svg';
import whiteEyes from '@/src/shared/assets/images/book-card/white-eyes.svg';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

export default function Background() {

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' })

  return (
    <article className="absolute flex flex-col items-center w-full overflow-hidden">
      <div className="relative h-[37px] w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className="mt-[15vh] lg:mt-[29vh] object-contain opacity-70 blur-[1px]"
        />
      </div>
      <div className="relative mt-40 h-[600px] w-[800px] lg:h-[1000px] lg:w-[1350px]">
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="opacity-90 -mt-70 lg:mt-0 blur-[0.5px]"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="rotate-180 mt-[50vh] lg:mt-0 opacity-90 blur-[0.5px]"
        />
      </div>

    </article>
  );
}
