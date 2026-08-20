import { useEffect, useRef } from 'react';
import { useMedia } from 'use-media';
import {
  FontSelector,
  FontSizeSelector,
  AlignSelector,
} from '@/src/features/text-settings/ui';
import { FullscreenButton } from '@/src/features/fullscreen';
import { useFullscreen } from '@/src/features/fullscreen';
import { useTextSettings } from '@/src/features/text-settings';

type ToolbarProps = {
  ChapterSelector?: React.ReactNode;
  children: React.ReactNode;
};

export const Toolbar = ({ ChapterSelector, children }: ToolbarProps) => {
  const {
    currentSize,
    setCurrentSize,
    currentFont,
    setCurrentFont,
    fontQuery,
    setFontQuery,
    currentAlign,
    setCurrentAlign,
  } = useTextSettings();

  const readingSection = useRef<HTMLElement | null>(null);

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) setCurrentSize(16);
    else setCurrentSize(20);
  }, [isLarge, setCurrentSize]);

  const { fullscreen, toggleFullscreen } = useFullscreen({
    element: readingSection,
  });

  return (
    <section
      ref={readingSection}
      id="reading-section"
      className={`relative mx-auto mt-2 flex h-[calc(100dvh-5rem)] w-[calc(100%-1rem)] max-w-6xl flex-col overflow-y-hidden lg:mt-8 lg:h-screen lg:w-[80vw]`}
    >
      <div
        className={`relative -mb-45 h-62 w-full rotate-x-180 overflow-x-auto *:rotate-x-180 ${fullscreen ? 'lg:mt-4' : ''}`}
      >
        <div
          className="absolute bottom-0 mb-2 -ml-[0.225rem] flex h-10 w-max min-w-full flex-none items-center gap-1 lg:-ml-1 lg:w-full"
        >
          {ChapterSelector}
          <FontSelector
            currentFont={currentFont}
            setCurrentFont={setCurrentFont}
            query={fontQuery}
            setQuery={setFontQuery}
          />
          <FontSizeSelector
            currentSize={currentSize}
            setCurrentSizeAction={setCurrentSize}
          />
          <AlignSelector
            currentAlign={currentAlign}
            setCurrentAlign={setCurrentAlign}
          />
          <FullscreenButton
            fullscreen={fullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
      <div
        className={`-mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl border-2 ${fullscreen ? 'mb-4 lg:mb-0' : ''} bg-white dark:bg-black`}
      >
        <div
          className="h-full p-1"
          style={{
            fontSize: `${currentSize}px`,
            fontFamily: currentFont,
            textAlign: currentAlign,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
