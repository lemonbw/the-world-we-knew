"use client"

import Image from "next/image"
import { useState } from "react"


export default function BookCard() {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const rating: number = 5;

  const getStarType = (i: number) => {
    if (hoveredIndex !== null) {
      return i < hoveredIndex ? "★" : "☆";
    }

    if (i < rating) {
      return "★"
    }

    return "☆"
  }

  const stars =
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {getStarType(i)}
      </span >
    ));


  return (
    <article className="flex justify-center mt-8">
      <div className="flex flex-col justify-center">
        <div className="relative w-64 h-80 border-2 border-white">
          <Image src="/MK.jpg" alt="book cover" layout="fill" className="object-cover" />
        </div>
        <div className="flex justify-center" role="img" aria-label={`Рейтинг книги: ${rating} из 5`}>
          {stars}
        </div>
      </div>
    </article>
  )
}
