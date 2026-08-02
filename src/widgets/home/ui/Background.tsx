'use client';
import Image from 'next/image';
import { useMedia } from 'use-media';
import usePanelState from '../model/usePanelState';
import blackEyes from '@/src/shared/assets/images/book-card/black-eyes.svg';
import whiteEyes from '@/src/shared/assets/images/book-card/white-eyes.svg';
import blackChains from '@/src/shared/assets/images/book-card/black-broken-chains-part.svg';
import whiteChains from '@/src/shared/assets/images/book-card/white-broken-chains-part.svg';

export const Background = () => {
  const section = usePanelState();

  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });

  return (
    <article className="pointer-events-none fixed flex w-full flex-col items-center">
      <div className="relative h-[30px] w-[200px] lg:h-[37px] lg:w-[260px]">
        <Image
          src={isDark ? whiteEyes : blackEyes}
          alt="eyes"
          fill
          className={`${section === 'Overview' ? 'mt-[60px] lg:mt-[150px]' : 'z-40 mt-[160px] lg:-mt-[220px]'} ${isDark ? 'opacity-70' : ''} object-contain blur-[1px]`}
        />
      </div>
      <div
        className={`${section === 'Overview' ? 'mt-[100px]' : 'mt-50 lg:-mt-[280px]'} relative h-[600px] w-[800px] lg:h-[1000px] lg:w-[1450px]`}
      >
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className="-mt-[300px] blur-[0.5px] lg:mt-0"
        />
        <Image
          src={isDark ? whiteChains : blackChains}
          alt="chains"
          fill
          className={`${isDark ? 'lg:mt-0' : 'lg:mt-20px'} mt-[80px] rotate-180 blur-[0.5px]`}
        />
      </div>
    </article>
  );
};
