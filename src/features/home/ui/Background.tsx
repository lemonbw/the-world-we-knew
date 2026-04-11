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
    <article className="absolute flex flex-col items-center w-full overflow-hidden">
      <div className="relative h-[30px] w-[200px] lg:h-[37px] lg:w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className={`${section === "Overview" ? "mt-[15vh] lg:mt-[29vh]" : "mt-[26vh] lg:mt-[15vh]"} object-contain opacity-70 blur-[1px]`}
        />
      </div>
      <div className={`${section === "Overview" ? "mt-40" : "mt-50 lg:mb-40"} relative h-[600px] w-[800px] lg:h-[1000px] lg:w-[1350px]`}>
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="opacity-90 -mt-70 lg:mt-0 blur-[0.5px]"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className={`${section === "Overview" ? "mt-[50vh] lg:mt-0" : "mt-[40vh] lg:mt-0"} rotate-180 opacity-90 blur-[0.5px]`}
        />
      </div>

    </article>
  );
}
