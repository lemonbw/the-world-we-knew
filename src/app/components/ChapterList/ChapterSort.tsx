"use client"
import { useState } from "react";

export default function ChapterSort() {

  const [hovered, setHovered] = useState(false);

  return (
    <button className="relative block mx-auto font-bold cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span className="">Сортировка ⇧⇩</span>
      <span className={`absolute inline-block left-0 bottom-0 h-[2px] bg-white origin-left transition-all duration-300`} style={{ width: hovered ? "100%" : "0%" }}></span>
    </button>
  );
}
