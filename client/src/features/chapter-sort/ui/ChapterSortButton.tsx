'use client';
import { useState, useRef } from 'react';

type ChapterSortButtonProps = {
  isAsc: 'asc' | 'desc';
  onSortClick: () => void;
};

export const ChapterSortButton = ({
  isAsc,
  onSortClick,
}: ChapterSortButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const hoverDelayRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverDelayRef.current = setTimeout(() => setIsHovered(true), 150);
  };
  const handleMouseLeave = () => {
    if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current);
    setIsHovered(false);
  };

  const handleClick = () => {
    onSortClick();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      className="relative mx-auto block cursor-pointer font-bold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className="-ml-5 text-[1rem] lg:text-[1.7rem]">
        Сортировка
        <span
          className={`absolute bottom-[-0.05rem] ml-0.5 inline-block text-[1.05rem] transition-transform duration-800 lg:bottom-[-0.5rem] lg:text-[2.1rem] ${isAsc === 'asc' ? 'rotate-0' : '-rotate-180'}`}
        >
          ▼
        </span>
      </span>
      <span
        className={`absolute bottom-0 -left-5 hidden h-[2px] origin-left transition-all duration-500 lg:inline-block ${isHovered ? 'w-[130%]' : 'w-0'} ${isPressed ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}
      />
    </button>
  );
};
