'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { getChapterTableLinkClasses } from '../lib/getChapterTableLinkClasses';

type ChapterTableProps = {
  chapters: any[];
  emptyRowsCount: number;
  listPhase: number;
  direction: 'toRight' | 'toLeft' | 'toDown' | 'toUp';
};

export const ChapterTable = ({
  chapters,
  emptyRowsCount,
  listPhase,
  direction,
}: ChapterTableProps) => {
  const NO_HOVER = -2;
  const [hoveredIndex, setHovered] = useState(NO_HOVER);
  const rowHoverDelayRef = useRef<NodeJS.Timeout | null>(null);

  const handleRowEnter = (index: number) => () => {
    rowHoverDelayRef.current = setTimeout(() => setHovered(index), 150);
  };

  const handleRowLeave = () => {
    if (rowHoverDelayRef.current) clearTimeout(rowHoverDelayRef.current);
    setHovered(NO_HOVER);
  };

  return (
    <table className="w-full table-fixed border-collapse bg-white text-[1.1rem] xl:text-[1.15rem] dark:bg-black">
      <thead className="hidden border-b-2 lg:table-header-group">
        <tr className="bg-white text-[1.2rem] text-gray-800 xl:text-[1.25rem] dark:bg-black dark:text-gray-200">
          <th className="py-2 text-left lg:w-[6rem] lg:px-4 xl:w-[7rem] xl:py-3 xl:px-5">Том</th>
          <th className="py-2 text-left lg:w-[7rem] lg:px-4 xl:w-[8rem] xl:py-3 xl:px-5">Глава</th>
          <th className="py-2 text-left lg:w-[16rem] lg:px-4 xl:w-[20rem] xl:py-3 xl:px-5">Название</th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:py-3 xl:px-5">Символы</th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:py-3 xl:px-5">Дата</th>
        </tr>
      </thead>

      <tbody>
        {chapters.map((c) => {
          const linkClasses = getChapterTableLinkClasses({
            index: c.index,
            hoveredIndex,
            listPhase,
            direction,
          });

          return (
            <tr
              key={c.href}
              className="cursor-pointer border-b-2 bg-white transition-colors duration-1000 *:text-[1rem]! *:lg:text-[1.1rem]! *:xl:text-[1.15rem]! dark:bg-black"
              onMouseEnter={handleRowEnter(c.index)}
              onMouseLeave={handleRowLeave}
            >
              <td className="relative z-10 w-[10%] py-3 pl-1.5 lg:w-[6rem] lg:px-4 xl:w-[7rem] xl:py-4 xl:px-5">
                <Link href={c.href} className={linkClasses}>
                  {c.volume}
                </Link>

                <span
                  className={`absolute bottom-0 left-0 -z-10 h-full w-[85vw] origin-left bg-black transition-transform duration-500 lg:duration-1000 dark:bg-white ${
                    hoveredIndex === c.index ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </td>

              <td className="relative z-10 w-[12%] py-3 lg:w-[7rem] lg:px-4 xl:w-[8rem] xl:py-4 xl:px-5">
                <Link href={c.href} className={linkClasses}>
                  {c.chapter}
                </Link>
              </td>

              <td className="relative z-10 w-[38%] py-3 break-words lg:w-[16rem] lg:px-4 xl:w-[20rem] xl:py-4 xl:px-5">
                <Link href={c.href} className={linkClasses}>
                  {c.title}
                </Link>
              </td>

              <td className="relative z-10 w-[16%] py-3 break-words lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:py-4 xl:px-5">
                <Link href={c.href} className={linkClasses}>
                  {c.symbols}
                </Link>
              </td>

              <td className="relative z-10 w-[24%] py-3 break-words lg:w-[8rem] lg:px-4 xl:w-[9rem] xl:py-4 xl:px-5">
                <Link href={c.href} className={linkClasses}>
                  {c.date.toLocaleDateString('ru-RU')}
                </Link>
              </td>
            </tr>
          );
        })}

        {Array.from({ length: emptyRowsCount }, (_, i) => (
          <tr key={`empty-${i}`} className="border-b-2 bg-white dark:bg-black">
            <td colSpan={5} className="h-12 lg:h-[43.4px] xl:h-[51px]" />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
