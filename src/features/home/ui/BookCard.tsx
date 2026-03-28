"use client"
import Image from 'next/image';
import { useMedia } from 'use-media';
import darkBookCover from '@/src/shared/assets/images/book-card/dark-book-cover.jpg';
import whiteBookCover from '@/src/shared/assets/images/book-card/white-book-cover.png'

export default function BookCard() {

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' })

  return (
    <article className="mt-20 flex justify-center lg:mt-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative h-46 w-40 border-4 lg:h-80 lg:w-64">
          <Image
            src={isDark ? darkBookCover : whiteBookCover}
            alt="book cover"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
