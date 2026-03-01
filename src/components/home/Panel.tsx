"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Panel() {
  const pathname = usePathname();
  const section = pathname === "/chapters" ? "Chapters" : "Overview";

  return (
    <div className="flex relative border rounded-xl w-60 h-10 mt-7 overflow-hidden *:duration-500">
      <Link
        href="/"
        className={`flex-1 text-2xl ${section === "Overview" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Описание
      </Link>
      <Link
        href="/chapters"
        className={`flex-1 text-2xl ${section === "Chapters" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Главы
      </Link>

      <div className="absolute left-1/2 h-full w-[1.5px] bg-white"></div>
    </div >
  )
}
