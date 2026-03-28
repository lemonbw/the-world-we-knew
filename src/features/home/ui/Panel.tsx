'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Panel() {
  const pathname = usePathname();
  const section = pathname === '/chapters' ? 'Chapters' : 'Overview';

  return (
    <div className={`mt-7 ${section === 'Overview' ? "-mb-10 lg:-mb-6" : ""} flex h-9 w-35 *:text-[1.2rem] overflow-hidden rounded-[0.55rem] border-2 *:w-1/2 *:pt-[0.2rem] *:pl-[0.3rem] *:text-center lg:h-10 lg:w-55 lg:rounded-xl lg:*:pl-4`}>
      <Link
        href="/"
        className={`flex lg:text-2xl ${section === 'Overview' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`}
      >
        Обзор
      </Link>
      <Link
        href="/chapters"
        className={`flex lg:text-2xl ${section === 'Chapters' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`}
      >
        Главы
      </Link>
    </div>
  );
}
