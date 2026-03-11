"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Panel() {
  const pathname = usePathname();
  const section = pathname === "/chapters" ? "Chapters" : "Overview";

  return (
    <div className="flex border rounded-xl w-55 h-10 my-7 overflow-hidden *:w-1/2 *:pt-0.5 *:pl-4 *:text-center">
      <Link
        href="/"
        className={`flex text-2xl ${section === "Overview" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Обзор
      </Link>
      <Link
        href="/chapters"
        className={`flex text-2xl ${section === "Chapters" ? "bg-white text-black" : "bg-black text-white"}`}
      >
        Главы
      </Link>
    </div >
  )
}
