'use client';
import Link from 'next/link';
import { useNavigationState } from '@/src/entities/navigation';

export const Panel = () => {
  const section = useNavigationState();

  return (
    <div className="lg:*:pl-auto *:px-auto flex h-9 w-35 overflow-hidden rounded-[0.55rem] border-2 *:w-1/2 *:text-center *:text-[1.2rem] lg:mt-10 lg:h-10 lg:w-55 lg:rounded-xl xl:mt-12 xl:h-11 xl:w-63 xl:rounded-2xl">
      <Link
        href="/"
        className={`flex items-center justify-center lg:text-2xl xl:text-[1.6rem] ${section === 'Overview' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`}
      >
        Обзор
      </Link>
      <Link
        href="/chapters"
        className={`flex items-center justify-center lg:text-2xl xl:text-[1.6rem] ${section === 'Chapters' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`}
      >
        Главы
      </Link>
    </div>
  );
};
