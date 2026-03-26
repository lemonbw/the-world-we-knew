'use client';

import { useState } from 'react';

export default function Rating() {
  const [hoveredIndex, SetHoveredIndex] = useState<number | null>(null);

  const rating: number = 5;

  const getStarType = (i: number) => {
    if (hoveredIndex !== null) {
      return i <= hoveredIndex ? '★' : '☆';
    } else if (i < rating) {
      return '★';
    } else {
      return '☆';
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      className="cursor-pointer text-5xl select-none"
      key={i}
      onMouseEnter={() => SetHoveredIndex(i)}
      onMouseLeave={() => SetHoveredIndex(null)}
    >
      {getStarType(i)}
    </span>
  ));
  return (
    <div
      className="flex justify-center"
      role="img"
      aria-label={`Рейтинг книги: ${rating} из 5`}
    >
      {stars}
    </div>
  );
}
