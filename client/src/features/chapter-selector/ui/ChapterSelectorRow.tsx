'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { useCompleteHoverAnimation } from '@/src/shared/hooks/useCompleteHoverAnimation';

type ChapterSelectorRowProps = {
  chapter: {
    href: string;
    chapter: number | string;
    title: string;
    slug: string;
    index: number;
  };
  isCurrent: boolean;
};

export const ChapterSelectorRow = forwardRef<
  HTMLTableRowElement,
  ChapterSelectorRowProps
>(({ chapter, isCurrent }, ref) => {
  const {
    isFilled,
    isTextActive,
    animationRef,
    onMouseEnter,
    onMouseLeave,
    onTransitionEnd,
  } = useCompleteHoverAnimation();

  const textColor = isTextActive
    ? 'text-white dark:text-black'
    : 'text-black dark:text-white';

  const linkClasses = `block w-full h-full relative z-10 ${textColor} transition-colors duration-150 lg:duration-250 outline-none`;

  return (
    <tr
      ref={ref}
      className={`z-50 h-[41px] w-full cursor-pointer border-b-2 bg-transparent ${
        isCurrent ? 'font-bold' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <td className="relative z-10 w-[28.2px] px-2 py-2">
        <Link href={chapter.href} className={linkClasses}>
          {chapter.chapter}
        </Link>

        <span
          ref={animationRef}
          onTransitionEnd={onTransitionEnd}
          className={`pointer-events-none absolute bottom-0 left-0 -z-10 h-full w-full origin-left bg-black transition-transform duration-300 ease-out lg:w-[22.2vw] lg:duration-500 dark:bg-white ${
            isFilled ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </td>

      <td className="relative z-10 w-[280px] py-2">
        <Link href={chapter.href} className={linkClasses}>
          {chapter.title}
        </Link>
      </td>
    </tr>
  );
});

ChapterSelectorRow.displayName = 'ChapterSelectorRow';
