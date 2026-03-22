'use client';
import { useEffect } from 'react';
import { useMedia } from 'use-media';
import Main from '@/src/shared/ui/Main';
import ChapterSelector from '@/src/features/reading/chapter-selector/ChapterSelector';
import {
  FontSelector,
  FontSizeSelector,
  AlignSelector,
} from '@/src/components/text';
import useFullscreen from '@/src/shared/hooks/useFullscreen';
import ReadingContent from '@/src/components/ReadingContent';
import { useReadingState } from '@/src/shared/hooks/reading/useReadingState';

export default function ReadingPage({ content }: { content: string }) {
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
    readingSection,
  });

  const icon = fullscreen ? 'fullscreen_exit' : 'fullscreen';

  return (
    <Main>
      <section
        ref={readingSection}
        id="reading-section"
        className="mx-auto mt-10 lg:mt-4 flex h-screen w-[80vw] flex-col"
      >
        <div className="mt-4 mb-2 ml-0.5 flex h-10 w-[70vw] flex-none items-center gap-1">
          <ChapterSelector />

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

          <button
            className="material-icons mt-2 ml-7 w-10 text-[2.5rem]! transition-all duration-300 hover:text-[2.6rem]!"
            onClick={toggleFullscreen}
          >
            {icon}
          </button>
        </div>

        <div className="flex-1 overflow-hidden rounded-2xl border">
          <div
            className="h-full overflow-y-auto p-1 select-text"
            style={{
              fontSize: `${currentSize}px`,
              fontFamily: currentFont,
              textAlign: currentAlign,
            }}
          >
            <ReadingContent
              className="h-full overflow-y-auto p-1"
              content={content}
            />
          </div>
        </div>
      </section>
    </Main>
  );
}
