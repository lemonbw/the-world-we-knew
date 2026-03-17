'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [hoveredIndex, setHovered] = useState(0);

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

  const stickClassName = `relative block w-8 h-1.5 bg-white`;

  return (
    <header
      className={`fixed z-10 flex h-[3.5rem] w-full items-center justify-between border-white bg-black px-2 duration-300 lg:duration-500 lg:static lg:mt-5 lg:block lg:h-[15vh] lg:bg-black lg:text-white ${hiddenHeader ? '-translate-y-full' : 'translate-y-0'} lg:translate-y-0`}
    >
      <div className="top-0 left-2 z-10 flex h-[2.5rem] items-center justify-center lg:mt-4">
        <Link
          href="/"
          className="relative"
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(0)}
        >
          <h1 className="text-[1.2rem] font-bold lg:text-[2rem]">
            The World We Knew
          </h1>
          <span
            className="absolute bottom-0 left-0 h-[2px] origin-left bg-white transition-all duration-300 hidden lg:inline"
            style={{ width: hoveredIndex === 5 ? '102%' : '0%' }}
          ></span>
        </Link>
      </div>
      <button className="z-10 flex h-7 w-10 flex-col justify-between lg:hidden" onClick={() => setHiddenNavigation(!hiddenNavigation)}>
        <span className={stickClassName}></span>
        <span className={stickClassName}></span>
        <span className={stickClassName}></span>
      </button>
      <nav className={`z-5 absolute lg:static flex-col lg:flex lg:flex-row lg:translate-x-0 justify-between ${hiddenNavigation ? "translate-x-full" : "translate-x-0"} duration-300 w-full mt-3 mb-4 -ml-2 pl-2 lg:ml-0 lg:pl-0 text-[1.3rem] font-medium ${hiddenHeader ? "translate-x-full" : "translate-x-0"} bg-black`}>
        <div className="lg:ml-45 block lg:flex gap-24 lg:text-[1.7rem]">
          <Link
            href="/"
            className="relative block mt-40 lg:mt-0"
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Главная</span>
            <span
              className="absolute bottom-0 left-0 h-[2px] origin-left bg-white transition-all duration-300 hidden lg:inline"
              style={{ width: hoveredIndex === 1 ? '102%' : '0%' }}
            ></span>
          </Link>

          <Link
            href="/archive"
            className="relative block"
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Архив</span>
            <span
              className="absolute bottom-0 -left-0.5 h-[2px] origin-left bg-white transition-all duration-300 hidden lg:inline"
              style={{ width: hoveredIndex === 2 ? '102%' : '0%' }}
            ></span>
          </Link>
        </div>

        <div className="mr-45 block lg:flex gap-24 lg:text-[1.7rem]">
          <Link
            href="/map"
            className="relative"
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Карта</span>
            <span
              className="absolute bottom-0 left-[1px] h-[2px] origin-left bg-white transition-all duration-300 hidden lg:inline"
              style={{ width: hoveredIndex === 3 ? '103%' : '0%' }}
            ></span>
          </Link>

          <Link
            href="/news"
            className="relative block"
            onMouseEnter={() => setHovered(4)}
            onMouseLeave={() => setHovered(0)}
          >
            <span>Новости</span>
            <span
              className="absolute bottom-0 left-[1px] h-[2px] origin-left bg-white transition-all duration-300 hidden lg:inline"
              style={{ width: hoveredIndex === 4 ? '102%' : '0%' }}
            ></span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
