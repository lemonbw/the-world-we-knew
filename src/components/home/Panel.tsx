"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Panel() {
  const pathname = usePathname();
  const section = pathname === "/chapters" ? "Chapters" : "Overview";

  return (
    <div className="flex border rounded-[0.55rem] lg:rounded-xl w-40 h-9 lg:w-55 lg:h-10 mt-7 overflow-hidden *:w-1/2 *:pt-[0.2rem] *:pl-[0.5rem] lg:*:pl-4 *:text-center">
      <Link
        href="/"
        className={`flex text-xl lg:text-2xl ${section === "Overview" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Обзор
      </Link>
      <Link
        href="/chapters"
        className={`flex text-xl lg:text-2xl ${section === "Chapters" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Главы
      </Link>
    </div >
  )
}
