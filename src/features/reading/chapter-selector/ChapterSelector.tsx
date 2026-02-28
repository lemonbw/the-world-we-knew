import Link from "next/link";
import { chapters } from "@/src/shared/content/meta/chapters";
import SearchInput from "@/src/shared/ui/SearchInput";
import {
  useChapterSearch,
  useChapterDropdown,
} from "@/src/shared/hooks/chapter-selector";

export default function ChapterSelector() {
  const {
    query,
    setQuery,
    listSource,
    currentChapter,
  } = useChapterSearch();

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
    "absolute left-0 w-68 p-1 h-[34px] outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]";

  const placeholder = currentChapter
    ? currentChapter.title
    : "Chapter, title, date";

  const getLinkClasses = (chapterIndex: number) => {
    const base =
      "block w-full h-full z-10 transition-all duration-500";

    const color =
      hoveredChapter === chapterIndex
        ? "text-black duration-1000 outline-black"
        : "text-white outline-white";

    return `${base} ${color}`;
  };

  return (
    <div
      className="relative border-1 rounded-sm w-78 mr-2 h-[34px] mt-[5px]"
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
        className="absolute material-icons text-lg w-10 border-l h-8 right-0"
      >
        keyboard_arrow_down
      </button>

      {isOpen && (
        <div
          className="border-1 rounded-sm overflow-y-auto overflow-x-hidden mt-8.5 h-[25.41rem] w-[22.15vw]"
          ref={listRef}
          onScroll={handleScroll}
        >
          <table className="bg-black z-50 rounded-sm w-[22.15vw]">
            <tbody>
              {listSource
                .slice(0, visibleCount + 10)
                .map((chapter) => (
                  <tr
                    key={chapter.href}
                    ref={
                      slug === chapter.slug
                        ? chapterRef
                        : null
                    }
                    className={`bg-black border-b transition-colors duration-1000 cursor-pointer z-50 h-[41px] ${slug === chapter.slug
                      ? "font-bold"
                      : ""
                      }`}
                    onMouseEnter={() =>
                      handleMouseEnter(chapter.index)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="py-2 relative z-10 pl-2 pr-2 w-[28.2]">
                      <Link
                        href={chapter.href}
                        className={getLinkClasses(
                          chapter.index
                        )}
                      >
                        {chapter.chapter}
                      </Link>

                      <span
                        className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10 ${hoveredChapter === chapter.index
                          ? "w-[22.2vw]"
                          : "w-0"
                          }`}
                      />
                    </td>

                    <td className="py-2 relative z-10 w-[280px]">
                      <Link
                        href={chapter.href}
                        className={getLinkClasses(
                          chapter.index
                        )}
                      >
                        {chapter.title}
                      </Link>
                    </td>
                  </tr>
                ))}

              {Array.from({
                length: Math.max(
                  0,
                  10 - listSource.length
                ),
              }).map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className="bg-black border-b"
                >
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
