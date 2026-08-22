'use client';
import Image from 'next/image';
import Link from 'next/link';
import whiteTitle from '@/src/shared/assets/images/book-card/white-title.svg';
import blackTitle from '@/src/shared/assets/images/book-card/black-title.svg';
import { useHeaderState } from '../model/useHeaderState';
import { NavLink } from './NavLink';
import { FalseNavLink } from './FalseNavLink';
import { Hamburger } from './Hamburger';
import {
  whiteArchive,
  blackArchive,
  whiteMap,
  blackMap,
  whiteNews,
  blackNews,
} from '@/src/shared/assets/images/header';

export const Header = () => {
  const { isDark, hiddenHeader, hiddenNavigation, setHiddenNavigation } =
    useHeaderState();

  return (
    <header
      className={`fixed z-50 flex h-[3.5rem] w-full items-center justify-between bg-white px-2 duration-300 lg:static lg:z-0 lg:mt-5 lg:block lg:h-70 xl:h-76 lg:duration-500 dark:bg-black ${hiddenHeader ? '-translate-y-full' : 'translate-y-0'} lg:translate-y-0`}
    >
      <Link
        href="/"
        className="top-0 left-2 z-30 flex h-[2.5rem] items-center justify-center lg:mt-4 xl:mt-5"
      >
        <h1 className="relative -ml-5 h-10 w-[calc(100vw-4rem)] max-w-65 lg:ml-0 lg:h-15 lg:w-180 lg:max-w-none xl:h-17 xl:w-200">
          <span className="sr-only">The World We Knew</span>
          <Image
            src={isDark ? whiteTitle : blackTitle}
            alt="The World We Knew"
            fill
            className="object-cover"
          />
        </h1>
      </Link>
      <Hamburger
        hiddenHeader={hiddenHeader}
        hiddenNavigation={hiddenNavigation}
        setHiddenNavigation={setHiddenNavigation}
      />
      <nav
        className={`absolute z-20 flex-col justify-between bg-white lg:static lg:flex lg:translate-x-0 lg:flex-col dark:bg-black ${hiddenNavigation ? 'translate-x-full' : 'translate-x-0'} mt-3 mb-4 -ml-2 w-full pl-2 text-[1.3rem] font-medium duration-300 lg:ml-0 lg:pl-0 ${hiddenHeader ? 'translate-x-full' : 'translate-x-0'} mt-10 xl:mt-12`}
      >
        <div className="flex flex-col lg:w-full lg:flex-row lg:justify-between">
          <div className="block gap-24 lg:ml-45 lg:flex lg:text-[1.7rem] xl:ml-52 xl:gap-28 xl:text-[1.85rem]">
            <NavLink href="/" title="Главная" className="mt-35 lg:mt-0" />
            <FalseNavLink
              src={isDark ? whiteArchive : blackArchive}
              alt="Архив"
              title="Архив"
              message="Бах!"
            />
          </div>

          <div className="flex flex-col gap-1 lg:mr-45 lg:flex-row lg:gap-24 lg:text-[1.7rem] xl:mr-52 xl:gap-28 xl:text-[1.85rem]">
            <FalseNavLink
              src={isDark ? whiteMap : blackMap}
              alt="Карта"
              title="Карта"
              message="Увы"
            />
            <FalseNavLink
              src={isDark ? whiteNews : blackNews}
              alt="Новости"
              title="Новости"
              message="Когда-нибудь"
            />
          </div>
        </div>

      </nav>
    </header>
  );
};
