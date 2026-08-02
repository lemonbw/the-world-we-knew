'use client';

import Link from 'next/link';
import SearchInput from '@/src/shared/ui/SearchInput';
import {
  useChapterListState,
  useChapterListActions,
  useChapterListUI,
} from '../model/index';

export default function ChapterList() {
  const state = useChapterListState();

  const actions = useChapterListActions({
    page: state.page,
    setPage: state.setPage,
    pages: state.pages,
    isAsc: state.isAsc,
    setIsAsc: state.setIsAsc,
  });

  const ui = useChapterListUI({
    direction: actions.direction,
    listPhase: actions.listPhase,
  });

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
  } = state;

  const {
    activateSortButton,
    activateStartButton,
    activatePrevButton,
    activateNextButton,
    activateEndButton,
    goToPage,
    isSortButtonPressed,
    triggerAnimationIndex,
  } = actions;

  const {
    arrows,
    className,
    placeholder,
    hoveredIndex,
    hoveredButton,
    getLinkClasses,
    handleRowEnter,
    handleRowLeave,
    handleButtonEnter,
    handleButtonLeave,
  } = ui;

  const SORT_BUTTON_ID = 5;

  return (
    <section className="z-10 mx-auto mt-4 w-[80vw]">
      <button
        className="relative mx-auto block cursor-pointer font-bold"
        onMouseEnter={handleButtonEnter(SORT_BUTTON_ID)}
        onMouseLeave={handleButtonLeave}
        onClick={activateSortButton}
      >
        <span className="-ml-5 text-[1rem] lg:text-[1.7rem]">
          Сортировка
          <span
            className={`absolute bottom-[-0.05rem] ml-0.5 inline-block text-[1.05rem] transition-transform duration-800 lg:bottom-[-0.5rem] lg:text-[2.1rem] ${
              isAsc === 'asc' ? 'rotate-0' : '-rotate-180'
            }`}
          >
            ▼
          </span>
        </span>

        <span
          className={`absolute bottom-0 -left-5 hidden h-[2px] origin-left transition-all duration-500 lg:inline-block ${
            hoveredButton === SORT_BUTTON_ID ? 'w-[130%]' : 'w-0'
          } ${isSortButtonPressed ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}
        />
      </button>

      <div className="mt-4 overflow-hidden rounded-xl border-2 bg-white lg:mt-6 dark:bg-black">
        <SearchInput
          query={query}
          setQuery={setQuery}
          className={className}
          placeholder={placeholder}
        />

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
            {currentPage.map((c) => (
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
                    className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-black transition-all duration-500 lg:duration-1000 dark:bg-white ${
                      hoveredIndex === c.index ? 'w-[80vw]' : 'w-0'
                    }`}
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

            {Array.from({ length: pageSize - currentPage.length }, (_, i) => (
              <tr
                key={`empty-${i}`}
                className="border-b-2 bg-white dark:bg-black"
              >
                <td colSpan={5} className="h-[33.6px] lg:h-[43.4px]" />
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="-my-1 flex max-w-6xl justify-center gap-4 text-[1.3rem]">
          <button
            onClick={activateStartButton}
            className={`material-icons -mr-2.5 -ml-2 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mr-0 lg:mb-1.5 lg:ml-0 ${
              page - 5 < 0 ? 'pointer-events-none opacity-0' : ''
            } ${triggerAnimationIndex === 1 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.start}
          </button>

          <button
            onClick={activatePrevButton}
            className={`material-icons mr-2 w-3 text-[1.42rem]! transition-all duration-300 hover:text-[1.6rem]! lg:-mr-2 lg:mb-1.5 ${
              page - 1 < 0 ? 'pointer-events-none opacity-0' : ''
            } ${triggerAnimationIndex === 2 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.prev}
          </button>
          <span className="-ml-4 lg:ml-0">
            {Array.from(
              { length: Math.min(panelSize, pages.length) },
              (_, i) => startPage + i,
            ).map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                onMouseEnter={handleButtonEnter(pageIndex)}
                onMouseLeave={handleButtonLeave}
                className={`mx-0.5 my-2 w-6 rounded-md border-2 border-black px-[2px] py-0 text-center text-[1rem] hover:transition-colors hover:duration-200 lg:mx-1 lg:w-9 lg:px-[4px] lg:text-[1.3rem] lg:hover:duration-500 dark:border-white ${
                  hoveredButton === pageIndex && hoveredButton !== page
                    ? 'bg-black/80 text-white dark:bg-white/80 dark:text-black'
                    : 'text-black dark:bg-black dark:text-white'
                } ${
                  pageIndex === page
                    ? 'bg-black text-white dark:bg-white/80 dark:text-black!'
                    : 'text-black dark:bg-black'
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </span>

          <button
            onClick={activateNextButton}
            className={`material-icons -mr-2 -ml-4.5 w-3 text-[1.3rem]! transition-all duration-300 lg:mb-1.5 lg:-ml-3 lg:text-[1.42rem]! lg:hover:text-[1.6rem]! ${
              page + 2 > pages.length ? 'pointer-events-none opacity-0' : ''
            } ${triggerAnimationIndex === 3 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.next}
          </button>

          <button
            onClick={activateEndButton}
            className={`material-icons -ml-1 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! lg:mb-1.5 lg:ml-0 ${
              page + 6 > pages.length ? 'pointer-events-none opacity-0' : ''
            } ${triggerAnimationIndex === 4 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.end}
          </button>
        </nav>
      </div>
    </section>
  );
}
