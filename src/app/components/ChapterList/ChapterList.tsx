"use client";
import { useState, useMemo, useRef } from "react";
import { useDeferredValue } from "react";
import Link from "next/link";
import ChapterSort from "./ChapterSort";
import chunkChapters from "./chunkChapters";
import { ChapterSearch } from "./ChapterSearch";

export default function ChapterList() {
  const NO_HOVER = -2;
  const pageSize = 20;
  const panelSize = 9;

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [isAsc, setIsAsc] = useState<"asc" | "desc">("asc");
  const [direction, setDirection] = useState<"toRight" | "toLeft" | "toDown" | "toUp">("toRight");
  const [page, setPage] = useState(0);
  const [hoveredIndex, setHovered] = useState(NO_HOVER);
  const [hoveredButton, setHoveredButton] = useState(-1);
  const [isSortButtonPressed, setSortButtonPressed] = useState(false);
  const [listPhase, setListPhase] = useState(0);
  const [triggerAnimationIndex, setTriggerAnimationIndex] = useState(0);
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]);

  const rowHoverDelayRef = useRef<NodeJS.Timeout | null>(null);
  const buttonHoverDelayRef = useRef<NodeJS.Timeout | null>(null);

  const toggleOrder = () => setIsAsc(prev => (prev === "asc" ? "desc" : "asc"));

  const activateButton = (action: () => void) => {
    timerIds.forEach(clearTimeout);
    const newTimers: NodeJS.Timeout[] = [];

    setListPhase(1);
    setTimeout(action, 300);
    newTimers.push(setTimeout(() => setListPhase(2), 300));
    newTimers.push(setTimeout(() => setListPhase(0), 500));

    setTimerIds(newTimers);
  };

  const trigger = (index: number) => {
    setTriggerAnimationIndex(index);
    setTimeout(() => setTriggerAnimationIndex(0), 200);
  };

  const activateSortButton = () => {
    setDirection(isAsc === "asc" ? "toUp" : "toDown");
    activateButton(toggleOrder);
    setSortButtonPressed(true);
    setTimeout(() => setSortButtonPressed(false), 150);
  };

  const activateStartButton = () => { setDirection("toRight"); activateButton(() => setPage(0)); trigger(1); };
  const activatePrevButton = () => { setDirection("toRight"); activateButton(() => setPage(prev => Math.max(prev - 1, 0))); trigger(2); };
  const activateNextButton = () => { setDirection("toLeft"); activateButton(() => setPage(prev => Math.min(prev + 1, pages.length - 1))); trigger(3); };
  const activateEndButton = () => { setDirection("toLeft"); activateButton(() => setPage(pages.length - 1)); trigger(4); };
  const goToPage = (pageIndex: number) => { setDirection(pageIndex > page ? "toLeft" : "toRight"); activateButton(() => setPage(pageIndex)); };

  const sortedChapters = useMemo(() => ChapterSort(isAsc), [isAsc]);

  const filteredChapters = useMemo(() => {
    if (!deferredQuery) return sortedChapters;
    const q = deferredQuery.toLowerCase();
    return sortedChapters.filter(ch => ch.searchIndex?.includes(q));
  }, [deferredQuery, sortedChapters]);

  const listSource = query ? filteredChapters : sortedChapters;

  const pages = useMemo(() => chunkChapters(listSource, pageSize), [listSource, pageSize]);
  const currentPage = pages[page] ?? [];

  const startPage =
    page < Math.floor(panelSize / 2)
      ? 0
      : page > pages.length - Math.ceil(panelSize / 2)
        ? pages.length - panelSize
        : page - Math.floor(panelSize / 2);

  const getLinkClasses = (index: number) => {
    const base = "block w-full h-full z-10 transition-all duration-500";
    const color = hoveredIndex === index ? "text-black duration-1000" : "text-white";
    const opacity = listPhase === 0 ? "opacity-100" : "opacity-0";

    const translateRight = listPhase === 1 ? "translate-x-[30px]" : listPhase === 2 ? "translate-x-[-30px]" : "translate-0";
    const translateLeft = listPhase === 1 ? "translate-x-[-30px]" : listPhase === 2 ? "translate-x-[30px]" : "translate-0";
    const translateDown = listPhase === 1 ? "translate-y-[10px]" : listPhase === 2 ? "translate-y-[-10px]" : "translate-0";
    const translateUp = listPhase === 1 ? "translate-y-[-10px]" : listPhase === 2 ? "translate-y-[10px]" : "translate-0";

    const translate =
      direction === "toLeft" ? translateLeft
        : direction === "toRight" ? translateRight
          : direction === "toUp" ? translateUp
            : translateDown;

    return `${base} ${color} ${opacity} ${translate}`;
  };

  return (
    <section className="w-[80vw] mx-auto mt-4 bg-black">
      <button
        className="relative block mx-auto font-bold cursor-pointer"
        onMouseEnter={() => { buttonHoverDelayRef.current = setTimeout(() => setHoveredButton(5), 100); }}
        onMouseLeave={() => { if (buttonHoverDelayRef.current) { clearTimeout(buttonHoverDelayRef.current); buttonHoverDelayRef.current = null; } setHoveredButton(-1); }}
        onClick={activateSortButton}
      >
        <span className="text-[1.5rem] -ml-2">
          Сортировка
          <span className={`absolute inline-block transition-transform duration-800 ml-0.5 bottom-[-0.5rem] text-[2rem] ${isAsc === "asc" ? "rotate-0" : "-rotate-180"}`}>▼</span>
        </span>
        <span className={`absolute inline-block -left-2.5 bottom-0 h-[2px] origin-left transition-all duration-500 ${hoveredButton === 5 ? "w-[125%]" : "w-0"} ${isSortButtonPressed ? "bg-black" : "bg-white"}`}></span>
      </button>
      <div className="border-1 rounded-xl overflow-hidden mt-6 mb-40">
        <ChapterSearch query={query} setQuery={setQuery} />
        <table className="w-full border-collapse text-[1.1rem] table-fixed">
          <thead>
            <tr className="bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200 text-[1.2rem] border-b">
              <th className="px-4 py-2 text-left w-[6rem]">Том</th>
              <th className="px-4 py-2 text-left w-[7rem]">Глава</th>
              <th className="px-4 py-2 text-left w-[16rem]">Название</th>
              <th className="px-4 py-2 text-left w-[8rem]">Символы</th>
              <th className="px-4 py-2 text-left w-[8rem]">Дата</th>
            </tr>
          </thead>
          <tbody>
            {currentPage.map((c) => (
              <tr
                key={c.href}
                className="bg-black border-b transition-colors duration-1000 cursor-pointer"
                onMouseEnter={() => { rowHoverDelayRef.current = setTimeout(() => setHovered(c.index), 150); }}
                onMouseLeave={() => { if (rowHoverDelayRef.current) { clearTimeout(rowHoverDelayRef.current); rowHoverDelayRef.current = null; } setHovered(NO_HOVER); }}
              >
                <td className="relative px-4 pb-0 z-10">
                  <Link href={c.href} className={getLinkClasses(c.index)}>{c.volume}</Link>
                  <span className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10 ${hoveredIndex === c.index ? "w-[80vw]" : "w-0"}`}></span>
                </td>
                <td className="px-4 py-2 relative z-10"><Link href={c.href} className={getLinkClasses(c.index)}>{c.chapter}</Link></td>
                <td className="px-4 py-2 relative z-10"><Link href={c.href} className={getLinkClasses(c.index)}>{c.title}</Link></td>
                <td className="px-4 py-2 relative z-10"><Link href={c.href} className={getLinkClasses(c.index)}>{c.symbols}</Link></td>
                <td className="px-4 py-2 relative z-10"><Link href={c.href} className={getLinkClasses(c.index)}>{c.date.toLocaleDateString("ru-RU")}</Link></td>
              </tr>
            ))}
            {Array.from({ length: pageSize - currentPage.length }, (_, i) => (
              <tr key={`empty-${i}`} className="bg-black border-b"><td colSpan={5} className="h-[43.4px]" /></tr>
            ))}
          </tbody>
        </table>
        <nav className="flex justify-center gap-4 text-[1.3rem] max-w-6xl">
          <button onClick={activateStartButton} className={`text-[1.42rem] tracking-[-8px] transition-all w-3 hover:text-[1.6rem] ease-in-out duration-300 ${page - 5 < 0 ? "opacity-0 pointer-events-none" : ""} ${triggerAnimationIndex === 1 ? "text-white/80" : "text-white"}`}>⮜⮜</button>
          <button onClick={activatePrevButton} className={`text-[1.42rem] transition-all w-3 hover:text-[1.6rem] ml-2 ease-in-out duration-300 ${page - 1 < 0 ? "opacity-0 pointer-events-none" : ""} ${triggerAnimationIndex === 2 ? "text-white/80" : "text-white"}`}>⮜</button>
          {Array.from({ length: Math.min(panelSize, pages.length) }, (_, i) => startPage + i).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToPage(pageIndex)}
              onMouseEnter={() => { buttonHoverDelayRef.current = setTimeout(() => setHoveredButton(pageIndex), 200); }}
              onMouseLeave={() => { if (buttonHoverDelayRef.current) { clearTimeout(buttonHoverDelayRef.current); buttonHoverDelayRef.current = null; } setHoveredButton(-1); }}
              className={`border-1 rounded-md my-2 py-0 px-[4px] w-9 text-center hover:transition-colors hover:duration-500 ${hoveredButton === pageIndex ? "bg-white/80 text-black" : "bg-black"} ${pageIndex === page ? "bg-white/90 text-black" : "bg-black"}`}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={activateNextButton} className={`text-[1.42rem] transition-all w-3 hover:text-[1.6rem] ease-in-out duration-300 ${page + 2 > pages.length ? "opacity-0 pointer-events-none" : ""} ${triggerAnimationIndex === 3 ? "text-white/80" : "text-white"}`}>⮞</button>
          <button onClick={activateEndButton} className={`text-[1.42rem] tracking-[-8px] transition-all w-3 hover:text-[1.6rem] ease-in-out duration-300 ${page + 6 > pages.length ? "opacity-0 pointer-events-none" : ""} ${triggerAnimationIndex === 4 ? "text-white/80" : "text-white"}`}>⮞⮞</button>
        </nav>
      </div>
    </section>
  );
}

