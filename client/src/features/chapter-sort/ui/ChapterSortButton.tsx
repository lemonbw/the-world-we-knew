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
      className="relative mx-auto block w-fit cursor-pointer font-bold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className="text-[1.35rem] lg:text-[1.7rem] xl:text-[1.85rem]">
        Сортировка
        <svg
          className={`ml-0.5 inline-block align-middle transition-transform duration-500 lg:ml-1 xl:ml-1.5 h-[1.15rem] w-[1.15rem] lg:h-[1.5rem] lg:w-[1.5rem] xl:h-[1.6rem] xl:w-[1.6rem] ${
            isAsc === 'asc' ? 'rotate-0' : '-rotate-180'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 6L19 6L12 18Z" />
        </svg>
      </span>
      <span
        className={`absolute bottom-0 left-0 hidden h-[2px] w-full origin-left transition-transform duration-500 lg:inline-block ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        } ${isPressed ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}
      />
    </button>
  );
};
