'use client';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from '@/src/shared/ui/NavLink';
import { Hamburger } from '@/src/shared/ui/Hamburger';

export default function Header() {

  const [hiddenHeader, setHiddenHeader] = useState(false);

  const [hiddenNavigation, setHiddenNavigation] = useState(true);

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScrollPos = () => {
      const currentScroll = window.scrollY;
      const previousScroll = prevScrollY.current;

      setHiddenHeader(currentScroll > previousScroll);

      prevScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScrollPos);

    return () => window.removeEventListener('scroll', handleScrollPos);
  }, []);

  return (
    <header
      className={`fixed z-10 flex h-[3.5rem] w-full items-center justify-between border-white bg-black px-2 duration-300 lg:duration-500 lg:static lg:mt-5 lg:block lg:h-[15vh] lg:bg-black lg:text-white ${hiddenHeader ? '-translate-y-full' : 'translate-y-0'} lg:translate-y-0`}
    >
      <div className="top-0 left-2 z-10 flex h-[2.5rem] items-center justify-center lg:mt-4">
        <NavLink href="/" title="The World We Knew" as="h1" className='text-[1.2rem] font-bold lg:text-[2rem]' />
      </div>
      <Hamburger hiddenHeader={hiddenHeader} hiddenNavigation={hiddenNavigation} setHiddenNavigation={setHiddenNavigation} />
      <nav className={`z-5 absolute lg:static flex-col lg:flex lg:flex-row lg:translate-x-0 justify-between ${hiddenNavigation ? "translate-x-full" : "translate-x-0"} duration-300 w-full mt-3 mb-4 -ml-2 pl-2 lg:ml-0 lg:pl-0 text-[1.3rem] font-medium ${hiddenHeader ? "translate-x-full" : "translate-x-0"} bg-black`}>
        <div className="lg:ml-45 block lg:flex gap-24 lg:text-[1.7rem]">
          <NavLink href="/" title="Главная" className='mt-40 lg:mt-0' />
          <NavLink href="/archive" title="Архив" />
        </div>

        <div className="mr-45 block lg:flex gap-24 lg:text-[1.7rem]">
          <NavLink href="/map" title="Карта" />
          <NavLink href="/news" title="Новости" />
        </div>
      </nav>
    </header>
  );
}
