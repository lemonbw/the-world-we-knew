import Link from 'next/link';
import { chapters } from '@/src/shared/content/meta/chapters';
import SearchInput from '@/src/shared/ui/SearchInput';
import {
  useChapterSearch,
  useChapterDropdown,
} from '@/src/shared/hooks/chapter-selector';

export default function ChapterSelector() {
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
    'absolute left-0 w-68 p-1 h-[34px] outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]';

  const placeholder = currentChapter
    ? currentChapter.title
    : 'Chapter, title, date';

  const getLinkClasses = (chapterIndex: number) => {
    const base = 'block w-full h-full z-10 transition-all duration-500';

    const color =
      hoveredChapter === chapterIndex
        ? 'text-black duration-1000 outline-black'
        : 'text-white outline-white';

    return `${base} ${color}`;
  };

  return (
    <div
      className="relative mt-[5px] mr-2 h-[34px] w-78 rounded-sm border-1"
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
        className="material-icons absolute right-0 h-8 w-10 border-l text-lg"
      >
        keyboard_arrow_down
      </button>

      {isOpen && (
        <div
          className="mt-8.5 h-[25.41rem] w-[22.15vw] overflow-x-hidden overflow-y-auto rounded-sm border-1"
          ref={listRef}
          onScroll={handleScroll}
        >
          <table className="z-50 w-[22.15vw] rounded-sm bg-black">
            <tbody>
              {listSource.slice(0, visibleCount + 10).map((chapter) => (
                <tr
                  key={chapter.href}
                  ref={slug === chapter.slug ? chapterRef : null}
                  className={`z-50 h-[41px] cursor-pointer border-b bg-black transition-colors duration-1000 ${
                    slug === chapter.slug ? 'font-bold' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(chapter.index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="relative z-10 w-[28.2] py-2 pr-2 pl-2">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.chapter}
                    </Link>

                    <span
                      className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-white transition-all duration-1000 ${
                        hoveredChapter === chapter.index ? 'w-[22.2vw]' : 'w-0'
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
}
