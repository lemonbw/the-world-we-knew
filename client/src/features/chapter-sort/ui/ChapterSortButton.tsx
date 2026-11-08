'use client';
import { useState } from 'react';

type ChapterSortButtonProps = {
  isAsc: 'asc' | 'desc';
  onSortClick: () => void;
};

export const ChapterSortButton = ({
  isAsc,
  onSortClick,
}: ChapterSortButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    onSortClick();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      className="group transition-color relative mx-auto flex h-13 w-fit cursor-pointer items-center justify-center rounded-[0.55rem] border-2 bg-white/95 px-4 font-bold duration-300 hover:bg-black/95 dark:bg-black/85"
      onClick={handleClick}
    >
      <span className="text-[1.35rem] lg:text-[1.7rem] xl:text-[1.85rem]">
        Сортировка
        <svg
          className={`ml-0.5 inline-block h-[1.15rem] w-[1.15rem] align-middle transition-transform duration-500 lg:ml-1 lg:h-[1.5rem] lg:w-[1.5rem] xl:ml-1.5 xl:h-[1.6rem] xl:w-[1.6rem] ${
            isAsc === 'asc' ? 'rotate-0' : '-rotate-180'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 6L19 6L12 18Z" />
        </svg>
      </span>
    </button>
  );
};
