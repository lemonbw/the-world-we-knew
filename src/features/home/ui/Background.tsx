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
    <article className="relative mt-20 -mb-25 w-2000 h-40 flex justify-center lg:mt-8">
      <div className="relative h-[37px] w-65 overflow-hidden">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className="object-cover opacity-70 blur-[1px]"
        />
      </div>
      <Image
        src={isDark ? whiteChains : blackChains}
        alt="chains"
        width={1500}
        height={750}
        className="absolute z-0 -mt-10 opacity-90 blur-[0.5px]"
      />
      <Image
        src={isDark ? whiteChains : blackChains}
        alt="chains"
        width={1500}
        height={750}
        className="absolute rotate-180 mt-20 opacity-90 blur-[0.5px]"
      />
    </article>
  );
}
