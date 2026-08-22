'use client';
import { useState, useRef } from 'react';
import { useMedia } from 'use-media';

type ChapterPaginationProps = {
  page: number;
  pagesCount: number;
  startPage: number;
  panelSize: number;
  onAction: (actionType: 'start' | 'prev' | 'next' | 'end' | number) => void;
};

export const ChapterPagination = ({
  page,
  pagesCount,
  startPage,
  panelSize,
  onAction,
}: ChapterPaginationProps) => {
  const isLarge = useMedia({ minWidth: 1024 });
  const arrows = isLarge
    ? { start: '⮜⮜', prev: '⮜', next: '⮞', end: '⮞⮞' }
    : {
        start: 'keyboard_double_arrow_left',
        prev: 'keyboard_arrow_left',
        next: 'keyboard_arrow_right',
        end: 'keyboard_double_arrow_right',
      };

  const [triggerIndex, setTriggerIndex] = useState(0);

  const trigger = (
    type: 'start' | 'prev' | 'next' | 'end' | number,
    index: number,
  ) => {
    setTriggerIndex(index);
    setTimeout(() => setTriggerIndex(0), 200);
    onAction(type);
  };

  return (
    <nav className="mx-auto -my-1 flex max-w-6xl justify-center gap-4 text-[1.3rem] xl:max-w-[90rem] xl:gap-5 xl:text-[1.4rem]">
      <button
        onClick={() => trigger('start', 1)}
        className={`material-icons -mr-2.5 -ml-2 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mr-0 lg:mb-1.5 lg:ml-0 xl:text-[1.6rem]! ${page - 5 < 0 ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 1 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.start}
      </button>

      <button
        onClick={() => trigger('prev', 2)}
        className={`material-icons mr-2 w-3 text-[1.42rem]! transition-all duration-300 hover:text-[1.6rem]! lg:-mr-2 lg:mb-1.5 xl:text-[1.6rem]! ${page - 1 < 0 ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 2 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.prev}
      </button>

      <span className="-ml-4 lg:ml-0">
        {Array.from(
          { length: Math.min(panelSize, pagesCount) },
          (_, i) => startPage + i,
        ).map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => trigger(pageIndex, 0)}
            className={`mx-0.5 my-2 w-8 rounded-md border-2 border-black px-[2px] py-0.5 text-center text-[1.2rem] transition-colors hover:duration-200 lg:mx-1 lg:w-9 lg:px-[4px] lg:py-0 lg:text-[1.3rem] lg:hover:duration-500 xl:mx-1 xl:w-10 xl:h-9 xl:text-[1.35rem] dark:border-white ${pageIndex === page ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black hover:bg-black/90 hover:text-white dark:bg-black dark:text-white hover:dark:bg-white/70 hover:dark:text-black'}`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </span>

      <button
        onClick={() => trigger('next', 3)}
        className={`material-icons -mr-2 -ml-4.5 w-3 text-[1.3rem]! transition-all duration-300 lg:mb-1.5 lg:-ml-3 lg:text-[1.42rem]! lg:hover:text-[1.6rem]! xl:text-[1.6rem]! ${page + 2 > pagesCount ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 3 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.next}
      </button>

      <button
        onClick={() => trigger('end', 4)}
        className={`material-icons -ml-1 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mb-1.5 lg:ml-0 xl:text-[1.6rem]! ${page + 6 > pagesCount ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 4 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.end}
      </button>
    </nav>
  );
};
