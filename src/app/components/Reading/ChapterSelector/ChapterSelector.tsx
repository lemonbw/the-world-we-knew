import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { chapters } from "@/src/content/meta/chapters";

type ChapterSelectorProps = {
  chapterQuery: string;
  setChapterQuery: (query: string) => void;
};

export default function ChapterSelector({
  chapterQuery,
  setChapterQuery,
}: ChapterSelectorProps) {

  const params = useParams();

  const slug = params?.slug;

  const [isChaptersHidden, setIsChaptersHidden] = useState(true);

  const [visibleCount, setVisibleCount] = useState(20);

  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  const rowHoverDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getLinkClasses = (chapter: number) => {
    const base = "block w-full h-full z-10 transition-all duration-500";
    const color =
      hoveredChapter === chapter
        ? "text-black duration-1000 outline-black"
        : "text-white outline-white";
    return `${base} ${color}`;
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsChaptersHidden(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="relative border-1 rounded-sm w-78 mr-2 h-8 mt-1" ref={divRef}>
      <input
        type="search"
        value={chapterQuery}
        onClick={() => setIsChaptersHidden(false)}
        onChange={(e) => {
          setChapterQuery(e.target.value);
        }}
        className="absolute w-68 p-1 h-7.5 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]"
      />

      <button
        type="button"
        onClick={() => setIsChaptersHidden(!isChaptersHidden)}
        className="absolute material-icons text-lg w-10 border-l h-7.5 right-0"
      >
        keyboard_arrow_down
      </button>

      {!isChaptersHidden && (
        <div className="border-1 rounded-sm overflow-y-auto overflow-x-hidden mt-8.5 h-102 w-[22.15vw]" ref={listRef} onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
            setVisibleCount((prev) => Math.min(prev + 1, chapters.length));
          }
        }}>
          <table className="bg-black z-50 rounded-sm w-[22.15vw]">
            <tbody>
              {chapters.slice(0, visibleCount).map((chapter) => (
                <tr
                  key={chapter.href}
                  ref={slug === chapter.slug ? chapterRef : null}
                  className={`bg-black border-b transition-colors duration-1000 cursor-pointer z-50 ${slug === chapter.slug ? "font-bold" : ""}`}
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
                  <td className="relative px-4 pb-0 z-10">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.volume}
                    </Link>

                    <span
                      className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10 ${hoveredChapter === chapter.index ? "w-[22.2vw]" : "w-0"
                        }`}
                    ></span>
                  </td>

                  <td className="py-2 relative z-10">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.chapter}
                    </Link>
                  </td>

                  <td className="py-2 relative z-10">
                    <Link
                      href={chapter.href}
                      className={getLinkClasses(chapter.index)}
                    >
                      {chapter.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

