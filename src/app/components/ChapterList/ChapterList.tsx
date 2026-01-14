"use client";
import { useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import ChapterSort from "./ChapterSort"

export default function ChapterList() {

  const [hoveredIndex, setHovered] = useState(-2);

  const [isAsc, setIsAsc] = useState<"asc" | "desc">("asc");

  const NO_HOVER: number = -2;
  const BUTTON_HOVER: number = -1;

  const toggleOrder = () => setIsAsc(prev => (prev === "asc" ? "desc" : "asc"));


  const sortedChapters = useMemo(() => ChapterSort(isAsc), [isAsc]);

  return (
    <section className="w-[80vw] mx-auto mt-4">
      <button className="relative block mx-auto font-bold cursor-pointer" onMouseEnter={() => setHovered(BUTTON_HOVER)
      } onMouseLeave={() => setHovered(NO_HOVER)} onClick={toggleOrder} >
        <span className="">Сортировка ⇧⇩</span>
        <span className={`absolute inline-block left-0 bottom-0 h-[2px] bg-white origin-left transition-all duration-300`} style={{ width: hoveredIndex === -1 ? "100%" : "0%" }}></span>
      </button >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200">
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
              className="bg-black border-b transition-colors duration-1000 cursor-pointer hover:text-black"
              onMouseEnter={() => setHovered(c.index)}
              onMouseLeave={() => setHovered(NO_HOVER)}>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full z-10">{c.volume}</Link>
                <span
                  className="absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-1000 -z-10"
                  style={{ width: hoveredIndex === c.index ? "80vw" : "0%" }}></span>
              </td>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full">{c.chapter}</Link>
              </td>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full">{c.title}</Link>
              </td>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full">{c.symbols}</Link>
              </td>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full">{c.date}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

