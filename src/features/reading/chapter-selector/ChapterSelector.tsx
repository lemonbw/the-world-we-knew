import { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDeferredValue } from "react";
import Link from "next/link";
import { chapters } from "@/src/shared/content/meta/chapters";
import SearchInput from "@/src/shared/ui/SearchInput"
import { useClickOutside } from "@/src/shared/hooks/useClickOutside";

export default function ChapterSelector() {

  const params = useParams();

  const slug = params?.slug;

  const [query, setQuery] = useState("")

  const deferredQuery = useDeferredValue(query);

  const [isChaptersHidden, setIsChaptersHidden] = useState(true);

  const [visibleCount, setVisibleCount] = useState(10);

  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  const rowHoverDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const divRef = useClickOutside<HTMLDivElement>(() => setIsChaptersHidden(true))

  const filteredChapters = useMemo(() => {
    if (!deferredQuery) return chapters;
    const q = deferredQuery.toLowerCase();
    return chapters.filter(ch => ch.searchIndex?.includes(q));
  }, [deferredQuery]);

  const listSource = query ? filteredChapters : chapters;

  const getLinkClasses = (chapter: number) => {
    const base = "block w-full h-full z-10 transition-all duration-500";
    const color =
      hoveredChapter === chapter
        ? "text-black duration-1000 outline-black"
        : "text-white outline-white";
    return `${base} ${color}`;
  };


  const listRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (!isChaptersHidden && chapterRef.current && listRef.current) {
      const container = listRef.current;
      const element = chapterRef.current;

      const offsetTop = element.offsetTop;
      container.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [isChaptersHidden, slug]);

  const className = "absolute left-0 w-68 p-1 h-[34px] outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]"

  const currentChapter = chapters.find(ch => ch.slug === slug);

  const placeholder = currentChapter
    ? `${currentChapter.title}`
    : "Chapter, title, date";

  return (
    <div className="relative border-1 rounded-sm w-78 mr-2 h-[34px] mt-[5px]" ref={divRef}>
      <SearchInput query={query} setQuery={setQuery} onClick={() => setIsChaptersHidden(false)} className={className} placeholder={placeholder} />
      <button
        type="button"
        onClick={() => setIsChaptersHidden(!isChaptersHidden)}
        className="absolute material-icons text-lg w-10 border-l h-8 right-0"
      >
        keyboard_arrow_down
      </button>

      {!isChaptersHidden && (
        <div className="border-1 rounded-sm overflow-y-auto overflow-x-hidden mt-8.5 h-[25.41rem] w-[22.15vw]" ref={listRef} onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
            setVisibleCount((prev) => Math.min(prev + 20, chapters.length));
          }
        }}>
          <table className="bg-black z-50 rounded-sm w-[22.15vw]">
            <tbody>
              {listSource.slice(0, visibleCount + 10).map((chapter) => (
                <tr
                  key={chapter.href}
                  ref={slug === chapter.slug ? chapterRef : null}
                  className={`bg-black border-b transition-colors duration-1000 cursor-pointer z-50 h-[41px] ${slug === chapter.slug ? "font-bold" : ""}`}
                  onMouseEnter={() => {
                    rowHoverDelayRef.current = setTimeout(
                      () => setHoveredChapter(chapter.index),
                      150
                    );
                  }}
                  onMouseLeave={() => {
                    if (rowHoverDelayRef.current) {
                      clearTimeout(rowHoverDelayRef.current);
                      rowHoverDelayRef.current = null;
                    }
                    setHoveredChapter(null);
                  }}
                >
                  <td className="py-2 relative z-10 pl-2 pr-2 w-[28.2]">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.chapter}
                    </Link>
                    <span
                      className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10 ${hoveredChapter === chapter.index ? "w-[22.2vw]" : "w-0"
                        }`}
                    ></span>
                  </td>

                  <td className="py-2 relative z-10 w-[280px]">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.title}
                    </Link>
                  </td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 10 - listSource.length) }, (_, i) => (
                <tr key={`empty-${i}`} className="bg-black border-b">
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

