"use client"
import Image from 'next/image';
import { useMedia } from 'use-media';
import blackBookCover from '@/src/shared/assets/images/book-card/black-book-cover.jpg';
import whiteBookCover from '@/src/shared/assets/images/book-card/white-book-cover.png';
import blackChains from '@/src/shared/assets/images/book-card/black-chains.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-chains.svg';

export default function BookCard() {

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' })

  return (
    <article className="mt-20 flex justify-center lg:mt-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="z-10 relative h-46 w-40 border-4 lg:h-80 lg:w-64">
          <Image
            src={isDark ? blackBookCover : whiteBookCover}
            alt="book cover"
            fill
            className="object-cover"
          />
        </div>
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="z-0 mt-30"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="z-0 mt-30 rotate-x-180"
        />
      </div>
    </article>
  );
}
