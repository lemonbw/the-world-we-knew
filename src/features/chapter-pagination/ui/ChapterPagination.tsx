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

  const [hoveredButton, setHoveredButton] = useState(-1);
  const [triggerIndex, setTriggerIndex] = useState(0);
  const buttonHoverDelayRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (idx: number) => () => {
    buttonHoverDelayRef.current = setTimeout(() => setHoveredButton(idx), 150);
  };
  const handleLeave = () => {
    if (buttonHoverDelayRef.current) clearTimeout(buttonHoverDelayRef.current);
    setHoveredButton(-1);
  };

  const trigger = (
    type: 'start' | 'prev' | 'next' | 'end' | number,
    index: number,
  ) => {
    setTriggerIndex(index);
    setTimeout(() => setTriggerIndex(0), 200);
    onAction(type);
  };

  return (
    <nav className="-my-1 flex max-w-6xl justify-center gap-4 text-[1.3rem]">
      <button
        onClick={() => trigger('start', 1)}
        className={`material-icons -mr-2.5 -ml-2 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mr-0 lg:mb-1.5 lg:ml-0 ${page - 5 < 0 ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 1 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.start}
      </button>

      <button
        onClick={() => trigger('prev', 2)}
        className={`material-icons mr-2 w-3 text-[1.42rem]! transition-all duration-300 hover:text-[1.6rem]! lg:-mr-2 lg:mb-1.5 ${page - 1 < 0 ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 2 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
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
            onMouseEnter={handleEnter(pageIndex)}
            onMouseLeave={handleLeave}
            className={`mx-0.5 my-2 w-6 rounded-md border-2 border-black px-[2px] py-0 text-center text-[1rem] hover:transition-colors hover:duration-200 lg:mx-1 lg:w-9 lg:px-[4px] lg:text-[1.3rem] lg:hover:duration-500 dark:border-white ${hoveredButton === pageIndex && hoveredButton !== page ? 'bg-black/80 text-white dark:bg-white/80 dark:text-black' : 'text-black dark:bg-black dark:text-white'} ${pageIndex === page ? 'bg-black text-white dark:bg-white/80 dark:text-black!' : 'text-black dark:bg-black'}`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </span>

      <button
        onClick={() => trigger('next', 3)}
        className={`material-icons -mr-2 -ml-4.5 w-3 text-[1.3rem]! transition-all duration-300 lg:mb-1.5 lg:-ml-3 lg:text-[1.42rem]! lg:hover:text-[1.6rem]! ${page + 2 > pagesCount ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 3 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.next}
      </button>

      <button
        onClick={() => trigger('end', 4)}
        className={`material-icons -ml-1 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mb-1.5 lg:ml-0 ${page + 6 > pagesCount ? 'pointer-events-none opacity-0' : ''} ${triggerIndex === 4 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
      >
        {arrows.end}
      </button>
    </nav>
  );
};
