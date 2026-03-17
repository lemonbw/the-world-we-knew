'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Panel() {
  const pathname = usePathname();
  const section = pathname === '/chapters' ? 'Chapters' : 'Overview';

  return (
    <div className="mt-7 flex h-9 w-40 overflow-hidden rounded-[0.55rem] border *:w-1/2 *:pt-[0.2rem] *:pl-[0.5rem] *:text-center lg:h-10 lg:w-55 lg:rounded-xl lg:*:pl-4">
      <Link
        href="/"
        className={`flex text-xl lg:text-2xl ${section === 'Overview' ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        Обзор
      </Link>
      <Link
        href="/chapters"
        className={`flex text-xl lg:text-2xl ${section === 'Chapters' ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        Главы
      </Link>
    </div>
  );
}
