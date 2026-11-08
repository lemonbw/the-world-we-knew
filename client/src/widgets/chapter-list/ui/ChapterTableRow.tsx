'use client';

import Link from 'next/link';
import { useCompleteHoverAnimation } from '@/src/shared/hooks/useCompleteHoverAnimation';

type ChapterTableRowProps = {
  chapter: any;
  linkClasses: string;
};

export const ChapterTableRow = ({
  chapter: c,
  linkClasses,
}: ChapterTableRowProps) => {
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

  return (
    <tr
      key={c.href}
      className="cursor-pointer border-b-2 bg-transparent *:text-[1rem]! *:lg:text-[1.1rem]! *:xl:text-[1.15rem]!"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <td className="relative z-10 w-[10%] py-3 pl-1.5 lg:w-[6rem] lg:px-4 xl:w-[7rem] xl:px-5 xl:py-4">
        <Link
          href={c.href}
          className={`${linkClasses} ${textColor} transition-colors duration-150 lg:duration-250`}
        >
          {c.volume}
        </Link>

        <span
          ref={animationRef}
          onTransitionEnd={onTransitionEnd}
          className={`pointer-events-none absolute bottom-0 left-0 -z-10 h-full w-[85vw] origin-left bg-black transition-transform duration-300 ease-out lg:duration-500 dark:bg-white ${
            isFilled ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </td>

      <td className="relative z-10 w-[12%] py-3 lg:w-[7rem] lg:px-4 xl:w-[8rem] xl:px-5 xl:py-4">
        <Link
          href={c.href}
          className={`${linkClasses} ${textColor} transition-colors duration-150 lg:duration-250`}
        >
          {c.chapter}
        </Link>
      </td>

      <td className="relative z-10 w-[38%] py-3 break-words lg:w-[16rem] lg:px-4 xl:w-[20rem] xl:px-5 xl:py-4">
        <Link
          href={c.href}
          className={`${linkClasses} ${textColor} transition-colors duration-150 lg:duration-250`}
        >
          {c.title}
        </Link>
      </td>

      <td className="relative z-10 w-[16%] py-3 break-words lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:px-5 xl:py-4">
        <Link
          href={c.href}
          className={`${linkClasses} ${textColor} transition-colors duration-150 lg:duration-250`}
        >
          {c.symbols}
        </Link>
      </td>

      <td className="relative z-10 w-[24%] py-3 break-words lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:px-5 xl:py-4">
        <Link
          href={c.href}
          className={`${linkClasses} ${textColor} transition-colors duration-150 lg:duration-250`}
        >
          {c.date.toLocaleDateString('ru-RU')}
        </Link>
      </td>
    </tr>
  );
};
