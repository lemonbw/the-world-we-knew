"use client";
import { useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import ChapterSort from "./ChapterSort"
import ChapterListToggle from "./ChapterListToggle";

export default function ChapterList() {

  const [hoveredIndex, setHovered] = useState(-2);

  const [pressedIndex, setPressed] = useState(-2);

  const [page, setPage] = useState(0)

  const [isAsc, setIsAsc] = useState<"asc" | "desc">("asc");

  const [isPressed, setIsPressed] = useState(false);

  const NO_HOVER: number = -2;
  const BUTTON_HOVER: number = -1;

  const toggleOrder = () => setIsAsc(prev => (prev === "asc" ? "desc" : "asc"));

  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]);

  const activateSortButton = () => {
    timerIds.forEach(clearTimeout);

    const newTimers: NodeJS.Timeout[] = [];

    setPressed(-1);
    newTimers.push(setTimeout(() => setPressed(-2), 150));
    setIsPressed(true);
    newTimers.push(setTimeout(() => toggleOrder(), 800));
    newTimers.push(setTimeout(() => setIsPressed(false), 1000));

    setTimerIds(newTimers);
  }

  const FIRST_DISPLAYED_CHAPTER: number = 0;

  const LAST_DISPLAYED_CHAPTER: number = 20;

  const sortedChapters = useMemo(() => {
    return ChapterSort(isAsc).slice(FIRST_DISPLAYED_CHAPTER, LAST_DISPLAYED_CHAPTER);
  }, [isAsc]);

  console.log(page)

  return (
    <section className="w-[80vw] mx-auto mt-4">
      <button className="relative block mx-auto font-bold cursor-pointer" onMouseEnter={() => setHovered(BUTTON_HOVER)
      } onMouseLeave={() => setHovered(NO_HOVER)} onClick={activateSortButton} >
        <span className="text-[1.5rem] -ml-2">Сортировка
          <span className={`absolute inline-block transition-transform duration-800 ml-0.5 bottom-[-0.5rem] text-[2rem] ${isAsc === "asc" ? "rotate-0" : "-rotate-180"}`}>▼</span>
        </span>
        <span className={`absolute inline-block -left-2.5 bottom-0 h-[2px] origin-left transition-all duration-300 ${hoveredIndex === -1 ? "w-[125%]" : "w-0"} ${pressedIndex === -1 ? "bg-black" : "bg-white"}`}></span>
      </button >
      <div className="border-1 rounded-xl overflow-hidden mt-10 mb-40">
        <table className="w-full border-collapse text-[1.1rem]">
          <thead>
            <tr className="bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200 text-[1.2rem] border-b">
              <th className="px-4 py-2 text-left">Том</th>
              <th className="px-4 py-2 text-left">Глава</th>
              <th className="px-4 py-2 text-left">Название</th>
              <th className="px-4 py-2 text-left">Символы</th>
              <th className="px-4 py-2 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            {sortedChapters.map((c) => (
              <tr
                key={c.href}
                className="bg-black border-b transition-colors duration-1000 cursor-pointer"
                onMouseEnter={() => setHovered(c.index)}
                onMouseLeave={() => setHovered(NO_HOVER)}>
                <td className="relative px-4 pb-0 z-10">
                  <Link href={c.href} className={`block w-full h-full z-10 transition-colors duration-1000 ${isPressed || hoveredIndex === c.index ? "text-black" : "text-white"}`}>{c.volume}</Link>
                  <span
                    className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10
                  ${hoveredIndex === c.index ? "w-[80vw]" : "w-0"}`}></span>
                </td>
                <td className="px-4 py-2 relative z-10">
                  <Link href={c.href} className={`block w-full h-full z-10 transition-colors duration-1000 ${isPressed || hoveredIndex === c.index ? "text-black" : "text-white"}`}>{c.chapter}</Link>
                </td>
                <td className="px-4 py-2 relative z-10">
                  <Link href={c.href} className={`block w-full h-full z-10 transition-colors duration-1000 ${isPressed || hoveredIndex === c.index ? "text-black" : "text-white"}`}>{c.title}</Link>
                </td>
                <td className="px-4 py-2 relative z-10">
                  <Link href={c.href} className={`block w-full h-full z-10 transition-colors duration-1000 ${isPressed || hoveredIndex === c.index ? "text-black" : "text-white"}`}>{c.symbols}</Link>
                </td>
                <td className="px-4 py-2 relative z-10">
                  <Link href={c.href} className={`block w-full h-full z-10 transition-colors duration-1000 ${isPressed || hoveredIndex === c.index ? "text-black" : "text-white"}`}>{c.date.toLocaleDateString("ru-RU")}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex justify-center gap-4 text-[1.2rem]">
          <button onClick={() => setPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0))}>⮜</button>
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              className="border-1 rounded-md my-2 py-0 px-[4px]">
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(prevPage => prevPage + 1)}>⮞</button>
        </nav>

      </div>

    </section>
  );
}

