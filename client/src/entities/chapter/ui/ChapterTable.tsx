'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

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

  const getLinkClasses = (index: number) => {
    const base = 'block w-full h-full z-10 transition-all duration-500';
    const color =
      hoveredIndex === index
        ? 'text-white dark:text-black duration-1000 outline-black'
        : 'text-black dark:text-white outline-white';
    const opacity = listPhase === 0 ? 'opacity-100' : 'opacity-0';

    const transMap = {
      toRight:
        listPhase === 1
          ? 'translate-x-[30px]'
          : listPhase === 2
            ? '-translate-x-[30px]'
            : 'translate-x-0',
      toLeft:
        listPhase === 1
          ? '-translate-x-[30px]'
          : listPhase === 2
            ? 'translate-x-[30px]'
            : 'translate-x-0',
      toDown:
        listPhase === 1
          ? 'translate-y-[10px]'
          : listPhase === 2
            ? '-translate-y-[10px]'
            : 'translate-y-0',
      toUp:
        listPhase === 1
          ? '-translate-y-[10px]'
          : listPhase === 2
            ? 'translate-y-[10px]'
            : 'translate-y-0',
    };

    return `${base} ${color} ${opacity} ${transMap[direction]}`;
  };

  return (
    <table className="w-full table-fixed border-collapse bg-white text-[1.1rem] dark:bg-black">
      <thead className="hidden border-b-2 lg:table-header-group">
        <tr className="bg-white text-[1.2rem] text-gray-800 dark:bg-black dark:text-gray-200">
          <th className="py-2 text-left lg:w-[6rem] lg:px-4">Том</th>
          <th className="py-2 text-left lg:w-[7rem] lg:px-4">Глава</th>
          <th className="py-2 text-left lg:w-[16rem] lg:px-4">Название</th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4">Символы</th>
          <th className="py-2 text-left lg:w-[8rem] lg:px-4">Дата</th>
        </tr>
      </thead>
      <tbody>
        {chapters.map((c) => (
          <tr
            key={c.href}
            className="cursor-pointer border-b-2 bg-white transition-colors duration-1000 *:text-[0.7rem]! *:lg:text-[1.1rem]! dark:bg-black"
            onMouseEnter={handleRowEnter(c.index)}
            onMouseLeave={handleRowLeave}
          >
            <td className="relative z-10 w-6 pb-0 pl-1.5 lg:w-[6rem] lg:px-4">
              <Link href={c.href} className={getLinkClasses(c.index)}>
                {c.volume}
              </Link>
              <span
                className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-black transition-all duration-500 lg:duration-1000 dark:bg-white ${hoveredIndex === c.index ? 'w-[80vw]' : 'w-0'}`}
              />
            </td>
            <td className="relative z-10 w-6 py-2 lg:w-[7rem] lg:px-4">
              <Link href={c.href} className={getLinkClasses(c.index)}>
                {c.chapter}
              </Link>
            </td>
            <td className="relative z-10 w-23 py-2 lg:w-[16rem] lg:px-4">
              <Link href={c.href} className={getLinkClasses(c.index)}>
                {c.title}
              </Link>
            </td>
            <td className="relative z-10 w-6 py-2 lg:w-[8rem] lg:px-4">
              <Link href={c.href} className={getLinkClasses(c.index)}>
                {c.symbols}
              </Link>
            </td>
            <td className="relative z-10 w-30 py-2 lg:w-[8rem] lg:px-4">
              <Link href={c.href} className={getLinkClasses(c.index)}>
                {c.date.toLocaleDateString('ru-RU')}
              </Link>
            </td>
          </tr>
        ))}
        {Array.from({ length: emptyRowsCount }, (_, i) => (
          <tr key={`empty-${i}`} className="border-b-2 bg-white dark:bg-black">
            <td colSpan={5} className="h-[33.6px] lg:h-[43.4px]" />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
