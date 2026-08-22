import Link from 'next/link';
import { chapters } from '@/src/entities/chapter';
import { SearchInput } from '@/src/shared/ui/SearchInput';
import {
  useChapterSearch,
  useChapterDropdown,
} from '@/src/features/chapter-selector';

export const ChapterSelector = () => {
  const { query, setQuery, listSource, currentChapter } = useChapterSearch();

  const {
    isOpen,
    toggle,
    open,
    visibleCount,
    hoveredChapter,
    handleMouseEnter,
    handleMouseLeave,
    handleScroll,
    divRef,
    listRef,
    chapterRef,
    slug,
  } = useChapterDropdown(chapters.length);

  const className =
    'absolute left-0 w-[158px] -mt-[1px] p-1 h-[33px] outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]';

  const placeholder = currentChapter
    ? currentChapter.title
    : 'Chapter, title, date';

  const getLinkClasses = (chapterIndex: number) => {
    const base = 'block w-full h-full z-10 transition-all duration-500';

    const color =
      hoveredChapter === chapterIndex
        ? 'text-white outline-white dark:text-black duration-1000 dark:outline-black'
        : 'tex-black outline-black dark:text-white dark:outline-white';

    return `${base} ${color}`;
  };

  return (
    <div
      className="relative mx-2 mt-2.5 h-9.5 w-[200px] rounded-sm border-2"
      ref={divRef}
    >
      <SearchInput
        query={query}
        setQuery={setQuery}
        onClick={open}
        className={className}
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={toggle}
        className="material-icons absolute top-0 right-0 h-full w-10 border-l-2 text-lg"
      >
        keyboard_arrow_down
      </button>

      {isOpen && (
        <div
          className="mt-1 -ml-[2px] h-[25.41rem] w-[200px] overflow-x-hidden overflow-y-auto rounded-sm border-1"
          ref={listRef}
          onScroll={handleScroll}
        >
          <table className="z-50 w-[200px] rounded-sm bg-black">
            <tbody>
              {listSource.slice(0, visibleCount + 10).map((chapter) => (
                <tr
                  key={chapter.href}
                  ref={slug === chapter.slug ? chapterRef : null}
                  className={`z-50 h-[41px] w-full cursor-pointer border-b-2 bg-white transition-colors duration-1000 dark:bg-black ${
                    slug === chapter.slug ? 'font-bold' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(chapter.index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="relative z-10 w-[28.2px] px-2 py-2">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.chapter}
                    </Link>

                    <span
                      className={`absolute bottom-0 left-0 -z-10 h-full w-50 origin-left bg-black transition-transform duration-500 lg:w-[22.2vw] lg:duration-1000 dark:bg-white ${
                        hoveredChapter === chapter.index
                          ? 'scale-x-100'
                          : 'scale-x-0'
                      }`}
                    />
                  </td>

                  <td className="relative z-10 w-[280px] py-2">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.title}
                    </Link>
                  </td>
                </tr>
              ))}

              {Array.from({
                length: Math.max(0, 10 - listSource.length),
              }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b bg-black">
                  <td colSpan={2} className="h-[41px]" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
