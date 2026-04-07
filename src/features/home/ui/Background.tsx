"use client"
import Image from 'next/image';
import { useMedia } from 'use-media';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

export default function Background() {

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' })

  return (
    <article className="relative mt-20 w-2000 h-40 flex justify-center lg:mt-8">
      <Image
        src={isDark ? whiteChains : blackChains}
        alt="chains"
        width={1370}
        height={750}
        className="absolute z-0 -mt-10"
      />
      <Image
        src={isDark ? whiteChains : blackChains}
        alt="chains"
        width={1370}
        height={750}
        className="absolute rotate-180 mt-50"
      />
    </article>
  );
}
