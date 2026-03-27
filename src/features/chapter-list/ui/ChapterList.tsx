'use client';

import Link from 'next/link';
import SearchInput from '@/src/shared/ui/SearchInput';
import {
  useChapterListState,
  useChapterListActions,
  useChapterListUI,
} from '@/src/features/chapter-list/model';

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
    <section className="mx-auto mt-4 w-[80vw]">
      <button
        className="relative mx-auto block cursor-pointer font-bold"
        onMouseEnter={handleButtonEnter(SORT_BUTTON_ID)}
        onMouseLeave={handleButtonLeave}
        onClick={activateSortButton}
      >
        <span className="-ml-5 text-[1rem] lg:text-[1.7rem]">
          Сортировка
          <span
            className={`absolute bottom-[-0.05rem] lg:bottom-[-0.5rem] ml-0.5 inline-block text-[1.05rem] lg:text-[2.1rem] transition-transform duration-800 ${isAsc === 'asc' ? 'rotate-0' : '-rotate-180'
              }`}
          >
            ▼
          </span>
        </span>

        <span
          className={`hidden lg:inline-block absolute bottom-0 -left-5 h-[2px] origin-left transition-all duration-500 ${hoveredButton === SORT_BUTTON_ID ? 'w-[130%]' : 'w-0'
            } ${isSortButtonPressed ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}
        />
      </button>

      <div className="mt-4 lg:mt-6 overflow-hidden rounded-xl border-2 dark:border-1">
        <SearchInput
          query={query}
          setQuery={setQuery}
          className={className}
          placeholder={placeholder}
        />

        <table className="w-full table-fixed border-collapse text-[1.1rem]">
          <thead className='border-b-2 dark:border-b hidden lg:table-header-group'>
            <tr className="bg-white text-[1.2rem] text-gray-800 dark:bg-black dark:text-gray-200">
              <th className="lg:w-[6rem] lg:px-4 py-2 text-left">Том</th>
              <th className="lg:w-[7rem] lg:px-4 py-2 text-left">Глава</th>
              <th className="lg:w-[16rem] lg:px-4 py-2 text-left">Название</th>
              <th className="lg:w-[8rem] lg:px-4 py-2 text-left">Символы</th>
              <th className="lg:w-[8rem] lg:px-4 py-2 text-left">Дата</th>
            </tr>
          </thead>

          <tbody>
            {currentPage.map((c) => (
              <tr
                key={c.href}
                className="cursor-pointer border-b-2 dark:border-b bg-white dark:bg-black transition-colors duration-1000 *:text-[0.7rem]! *:lg:text-[1.1rem]!"
                onMouseEnter={handleRowEnter(c.index)}
                onMouseLeave={handleRowLeave}
              >
                <td className="relative w-6 lg:w-[6rem] pl-1.5 z-10 lg:px-4 pb-0">
                  <Link href={c.href} className={getLinkClasses(c.index)}>
                    {c.volume}
                  </Link>

                  <span
                    className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-black dark:bg-white transition-all duration-500 lg:duration-1000 ${hoveredIndex === c.index ? 'w-[80vw]' : 'w-0'
                      }`}
                  />
                </td>

                <td className="relative w-6 lg:w-[7rem] z-10 lg:px-4 py-2">
                  <Link href={c.href} className={getLinkClasses(c.index)}>
                    {c.chapter}
                  </Link>
                </td>

                <td className="relative w-23 lg:w-[16rem] z-10 lg:px-4 py-2">
                  <Link href={c.href} className={getLinkClasses(c.index)}>
                    {c.title}
                  </Link>
                </td>

                <td className="relative w-6 lg:w-[8rem] z-10 lg:px-4 py-2">
                  <Link href={c.href} className={getLinkClasses(c.index)}>
                    {c.symbols}
                  </Link>
                </td>

                <td className="relative w-30 lg:w-[8rem] z-10 lg:px-4 py-2">
                  <Link href={c.href} className={getLinkClasses(c.index)}>
                    {c.date.toLocaleDateString('ru-RU')}
                  </Link>
                </td>
              </tr>
            ))}

            {Array.from(
              { length: pageSize - currentPage.length },
              (_, i) => (
                <tr key={`empty-${i}`} className="border-b-2 dark:border-b bg-white dark:bg-black">
                  <td colSpan={5} className="h-[33.6px] lg:h-[43.4px]" />
                </tr>
              )
            )}
          </tbody>
        </table>

        <nav className="flex max-w-6xl justify-center gap-4 text-[1.3rem] -my-1">
          <button
            onClick={activateStartButton}
            className={`material-icons -ml-2 -mr-2.5 lg:ml-0 lg:mr-0 lg:mb-1.5 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! ${page - 5 < 0 ? 'pointer-events-none opacity-0' : ''
              } ${triggerAnimationIndex === 1 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.start}
          </button>

          <button
            onClick={activatePrevButton}
            className={`material-icons mr-2 lg:-mr-2 lg:mb-1.5 w-3 text-[1.42rem]! transition-all duration-300 hover:text-[1.6rem]! ${page - 1 < 0 ? 'pointer-events-none opacity-0' : ''
              } ${triggerAnimationIndex === 2 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.prev}
          </button>
          <span className='-ml-4 lg:ml-0'>
            {Array.from(
              { length: Math.min(panelSize, pages.length) },
              (_, i) => startPage + i
            ).map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                onMouseEnter={handleButtonEnter(pageIndex)}
                onMouseLeave={handleButtonLeave}
                className={`my-2 w-6 mx-0.5 lg:mx-1 lg:w-9 rounded-md border-black border-2 dark:border-white dark:border-1 px-[2px] lg:px-[4px] py-0 text-[1rem] lg:text-[1.3rem] text-center hover:transition-colors hover:duration-200 lg:hover:duration-500 ${hoveredButton === pageIndex
                  ? 'bg-black/80 text-white dark:bg-white/80 dark:text-black'
                  : 'text-black dark:bg-black dark:text-white'
                  } ${pageIndex === page
                    ? 'bg-black text-white dark:bg-white/90 dark:text-black'
                    : 'text-black dark:bg-black dark:text-white'
                  }`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </span>

          <button
            onClick={activateNextButton}
            className={`material-icons -ml-4.5 lg:-ml-3 lg:mb-1.5 w-3 text-[1.3rem]! lg:text-[1.42rem]! lg:hover:text-[1.6rem]! transition-all duration-300 -mr-2 ${page + 2 > pages.length
              ? 'pointer-events-none opacity-0'
              : ''
              } ${triggerAnimationIndex === 3 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.next}
          </button>

          <button
            onClick={activateEndButton}
            className={`material-icons -ml-1 lg:ml-0 lg:mb-1.5 w-3 text-[1.42rem]! tracking-[-8px]! transition-all duration-300 hover:text-[1.6rem]! ${page + 6 > pages.length
              ? 'pointer-events-none opacity-0'
              : ''
              } ${triggerAnimationIndex === 4 ? 'text-black/80 dark:text-white/80' : 'text-black dark:text-white'}`}
          >
            {arrows.end}
          </button>
        </nav>
      </div>
    </section>
  );
}
