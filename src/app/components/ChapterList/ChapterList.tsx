"use client";
import { useState } from "react";
import Link from "next/link";
import ChapterSort from "./ChapterSort"

export default function ChapterList() {

  const [hoveredIndex, setHovered] = useState(-1);

  const chapters = [
    {
      volume: "1",
      chapter: "1",
      index: 0,
      title: "Начало конца",
      symbols: "5К",
      date: "2026.01.09",
      href: "/chapter/1",
    },
    {
      volume: "1",
      chapter: "2",
      index: 1,
      title: "Обыкновенные деньки",
      symbols: "5К",
      date: "2026.01.09",
      href: "/chapter/2",
    },
  ];

  return (
    <section className="w-[80vw] mx-auto mt-4">
      <ChapterSort></ChapterSort>
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
          {chapters.map((c) => (
            <tr
              key={c.href}
              className="bg-black border-b transmition-colors duration-100 cursor-pointer hover:text-black"
              onMouseEnter={() => setHovered(c.index)}
              onMouseLeave={() => setHovered(-1)}>
              <td className="px-4 py-2 relative z-10">
                <Link href={c.href} className="block w-full h-full z-10">{c.volume}</Link>
                <span
                  className="absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-300 -z-10"
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

