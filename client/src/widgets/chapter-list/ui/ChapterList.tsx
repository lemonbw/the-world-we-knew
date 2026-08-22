'use client';
import { SearchInput } from '@/src/shared/ui/SearchInput';
import { ChapterTable } from './ChapterTable';
import { ChapterSortButton } from '@/src/features/chapter-sort';
import { ChapterPagination } from '@/src/features/chapter-pagination';
import { useChapterListController } from '../model/useChapterListController';

export const ChapterList = () => {
  const {
    query,
    setQuery,
    isAsc,
    page,
    pages,
    currentPage,
    startPage,
    panelSize,
    pageSize,
    listPhase,
    direction,
    handleSortChange,
    handlePaginationAction,
  } = useChapterListController();

  return (
    <section className="z-10 mx-auto mt-4 w-[calc(100%-1rem)] max-w-6xl lg:w-[80vw] xl:max-w-[90rem]">
      <ChapterSortButton isAsc={isAsc} onSortClick={handleSortChange} />

      <div className="mt-4 overflow-hidden rounded-xl border-2 bg-white lg:mt-6 xl:mt-7 dark:bg-black">
        <div className="mb-8 lg:-mb-3">
          <SearchInput
            query={query}
            setQuery={setQuery}
            className="mt-4 h-9 w-[min(94vw,22rem)] rounded border-2 text-center text-[1.05rem] lg:mt-3 lg:h-8 lg:w-80 lg:text-[1.1rem] xl:mt-3.5 xl:h-9 xl:w-88 xl:text-[1.15rem]"
            placeholder="Chapter, title, date"
          />
        </div>

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
