import { chapters } from '@/src/entities/chapter';
import { SearchInput } from '@/src/shared/ui/SearchInput';
import {
  useChapterSearch,
  useChapterDropdown,
} from '@/src/features/chapter-selector';
import { ChapterSelectorRow } from './ChapterSelectorRow';

export const ChapterSelector = () => {
  const { query, setQuery, listSource, currentChapter } = useChapterSearch();

  const {
    isOpen,
    toggle,
    open,
    visibleCount,
    handleScroll,
    divRef,
    listRef,
    chapterRef,
    slug,
  } = useChapterDropdown(chapters.length);

  const className =
    'w-full h-full px-1 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)] xl:text-lg bg-transparent';

  const placeholder = currentChapter
    ? currentChapter.title
    : 'Chapter, title, date';

  return (
    <div
      ref={divRef}
      className="relative mt-2 ml-1 inline-block h-9 w-[200px] rounded-sm border-2 bg-white/70 dark:bg-black/70 xl:h-11 xl:w-[230px]"
    >
      <div className="flex h-full w-full">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onClick={open}
          containerClassName="flex h-full flex-1 min-w-0 flex-col items-center"
          className={className}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={toggle}
          className="material-icons flex w-[40px] shrink-0 items-center justify-center border-l-2 bg-transparent text-lg xl:w-[44px] xl:text-xl"
        >
          keyboard_arrow_down
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute top-10 left-0 z-50 h-[411px] w-full overflow-x-hidden overflow-y-auto rounded-sm border-1 bg-white/70 shadow dark:bg-black/70 xl:top-12"
          ref={listRef}
          onScroll={handleScroll}
        >
          <table className="w-full rounded-sm bg-transparent">
            <tbody>
              {listSource.slice(0, visibleCount + 10).map((chapter) => (
                <ChapterSelectorRow
                  key={chapter.href}
                  ref={slug === chapter.slug ? chapterRef : null}
                  chapter={chapter}
                  isCurrent={slug === chapter.slug}
                />
              ))}

              {Array.from({
                length: Math.max(0, 10 - listSource.length),
              }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b bg-transparent">
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
