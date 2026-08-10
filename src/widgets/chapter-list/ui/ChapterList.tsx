'use client';

import { useState } from 'react';
import { SearchInput } from '@/src/shared/ui/SearchInput';
import { useChapterListState } from '../model/useChapterListState';
import { ChapterTable } from '@/src/entities/chapter';
import { ChapterSortButton } from '@/src/features/chapter-sort';
import { ChapterPagination } from '@/src/features/chapter-pagination';

export const ChapterList = () => {
  const {
    query,
    setQuery,
    isAsc,
    setIsAsc,
    page,
    setPage,
    pages,
    currentPage,
    startPage,
    panelSize,
    pageSize,
  } = useChapterListState();

  const [direction, setDirection] = useState<
    'toRight' | 'toLeft' | 'toDown' | 'toUp'
  >('toRight');
  const [listPhase, setListPhase] = useState(0);

  const activateTransition = (
    newDirection: typeof direction,
    action: () => void,
  ) => {
    setDirection(newDirection);
    setListPhase(1);
    setTimeout(action, 300);
    setTimeout(() => setListPhase(2), 300);
    setTimeout(() => setListPhase(0), 500);
  };

  const handleSortChange = () => {
    activateTransition(isAsc === 'asc' ? 'toUp' : 'toDown', () => {
      setIsAsc((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    });
  };

  const handlePaginationAction = (
    action: 'start' | 'prev' | 'next' | 'end' | number,
  ) => {
    if (action === 'start') {
      activateTransition('toRight', () => setPage(0));
    } else if (action === 'prev') {
      activateTransition('toRight', () => setPage((p) => Math.max(p - 1, 0)));
    } else if (action === 'next') {
      activateTransition('toLeft', () =>
        setPage((p) => Math.min(p + 1, pages.length - 1)),
      );
    } else if (action === 'end') {
      activateTransition('toLeft', () => setPage(pages.length - 1));
    } else if (typeof action === 'number') {
      activateTransition(action > page ? 'toLeft' : 'toRight', () =>
        setPage(action),
      );
    }
  };

  return (
    <section className="z-10 mx-auto mt-4 w-[80vw]">
      <ChapterSortButton isAsc={isAsc} onSortClick={handleSortChange} />

      <div className="mt-4 overflow-hidden rounded-xl border-2 bg-white lg:mt-6 dark:bg-black">
        <SearchInput
          query={query}
          setQuery={setQuery}
          className="mt-3 mb-2 h-5 w-30 rounded border-2 text-center text-[0.7rem] lg:h-8 lg:w-80 lg:text-[1.1rem]"
          placeholder="Chapter, title, date"
        />

        <ChapterTable
          chapters={currentPage}
          emptyRowsCount={pageSize - currentPage.length}
          listPhase={listPhase}
          direction={direction}
        />

        <ChapterPagination
          page={page}
          pagesCount={pages.length}
          startPage={startPage}
          panelSize={panelSize}
          onAction={handlePaginationAction}
        />
      </div>
    </section>
  );
};
