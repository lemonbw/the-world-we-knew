"use client"
import Image from 'next/image';
import { useMedia } from 'use-media';
import usePanelState from '@/src/features/home/model/usePanelState';
import blackEyes from '@/src/shared/assets/images/book-card/black-eyes.svg';
import whiteEyes from '@/src/shared/assets/images/book-card/white-eyes.svg';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

export default function Background() {

  const section = usePanelState();

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' })

  return (
    <article className="fixed flex flex-col items-center w-full pointer-events-none">
      <div className="relative h-[30px] w-[200px] lg:h-[37px] lg:w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className={`${section === "Overview" ? "mt-[60px] lg:mt-[150px]" : "mt-[160px] lg:-mt-[220px] z-40"} ${isDark ? "opacity-70" : ""} blur-[1px] object-contain`}
        />
      </div>
      <div className={`${section === "Overview" ? "mt-[100px]" : "mt-50 lg:-mt-[280px]"} relative h-[600px] w-[800px] lg:h-[1000px] lg:w-[1450px]`}>
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="-mt-[300px] lg:mt-0 blur-[0.5px]"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className={`${isDark ? "lg:mt-0" : "lg:mt-20px"} mt-[80px]  rotate-180 blur-[0.5px]`}
        />
      </div>

    </article>
  );
}
