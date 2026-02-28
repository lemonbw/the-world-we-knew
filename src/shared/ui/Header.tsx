"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {

  const [hoveredIndex, setHovered] = useState(0);

  return (
    <header className="w-full bg-[#010407] border-white mt-5">
      <div className="h-[5vh] mt-4 flex items-center justify-center">
        <Link href="/" className="relative" onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(0)}>
          <h1 className="text-white lg:text-[2rem] font-bold">The World We Knew</h1>
          <span
            className="absolute left-0 bottom-0 h-[2px] bg-white origin-left transition-all duration-300"
            style={{ width: hoveredIndex === 5 ? "102%" : "0%" }}
          ></span>
        </Link>
      </div>

      <div className="flex justify-between mt-3 w-full mb-4">
        <div className="flex gap-24 ml-45 lg:text-[1.7rem]">
          <Link
            href="/"
            className="relative"
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Главная</span>
            <span
              className="absolute left-0 bottom-0 h-[2px] bg-white origin-left transition-all duration-300"
              style={{ width: hoveredIndex === 1 ? "102%" : "0%" }}
            ></span>
          </Link>

          <Link
            href="/archive"
            className="relative"
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Архив</span>
            <span
              className="absolute -left-0.5 bottom-0 h-[2px] bg-white origin-left transition-all duration-300"
              style={{ width: hoveredIndex === 2 ? "102%" : "0%" }}
            ></span>
          </Link>
        </div>

        <div className="flex gap-24 mr-45 lg:text-[1.7rem]">
          <Link
            href="/map"
            className="relative"
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Карта</span>
            <span
              className="absolute left-[1px] bottom-0 h-[2px] bg-white origin-left transition-all duration-300"
              style={{ width: hoveredIndex === 3 ? "103%" : "0%" }}
            ></span>
          </Link>

          <Link
            href="/news"
            className="relative"
            onMouseEnter={() => setHovered(4)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Новости</span>
            <span
              className="absolute left-[1px] bottom-0 h-[2px] bg-white origin-left transition-all duration-300"
              style={{ width: hoveredIndex === 4 ? "102%" : "0%" }}
            ></span>
          </Link>
        </div>
      </div>
    </header>
  );
}

