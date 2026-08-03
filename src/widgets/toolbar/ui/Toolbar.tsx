import { useEffect } from 'react';
import { useMedia } from 'use-media';
import {
  FontSelector,
  FontSizeSelector,
  AlignSelector,
} from '@/src/features/text-settings/ui';
import { FullscreenButton } from '@/src/features/fullscreen/ui/FullscreenButton';
import { useFullscreen } from '@/src/features/fullscreen/model/useFullscreen';
import { useReadingState } from '../../reading/model/useReadingState';

type ToolbarProps = {
  ChapterSelector?: React.ReactNode;
  children: React.ReactNode;
};

export function Toolbar({ ChapterSelector, children }: ToolbarProps) {
  const {
    readingSection,
    currentSize,
    setCurrentSize,
    currentFont,
    setCurrentFont,
    fontQuery,
    setFontQuery,
    currentAlign,
    setCurrentAlign,
  } = useReadingState();

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
      className={`relative mx-auto mt-12 flex h-[100vh] w-[80vw] flex-col overflow-y-hidden lg:mt-8`}
    >
      <div
        className={`relative -mb-45 h-62 rotate-x-180 *:rotate-x-180 ${fullscreen ? 'w-[100vw]' : 'w-[80vw]'} overflow-x-auto ${fullscreen ? 'lg:mt-4' : ''}`}
      >
        <div
          className={`absolute bottom-0 mb-2 -ml-[0.225rem] flex h-10 w-[160vw] flex-none items-center gap-1 lg:-ml-1 lg:w-full`}
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
        </div>
        <FullscreenButton fullscreen={fullscreen} onToggle={toggleFullscreen} />
      </div>
      <div
        className={`-mt-3 flex-1 overflow-hidden rounded-2xl border-2 ${fullscreen ? 'mb-4 lg:mb-0' : ''} bg-white dark:bg-black`}
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
}
