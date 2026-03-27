import { useEffect } from "react";
import { useMedia } from "use-media";
import {
  FontSelector,
  FontSizeSelector,
  AlignSelector,
} from '@/src/features/text-settings/ui';
import useFullscreen from '@/src/shared/hooks/useFullscreen';
import { useReadingState } from '@/src/features/reading/model/useReadingState';

type ToolbarProps = {
  ChapterSelector?: React.ReactNode;
  children: React.ReactNode;
}

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
    readingSection,
  });

  const icon = fullscreen ? 'fullscreen_exit' : 'fullscreen';

  return (
    <section
      ref={readingSection}
      id="reading-section"
      className={`relative mx-auto mt-12 flex h-[100vh] w-[80vw] flex-col lg:h-[105vh]`}
    >
      <div
        className={`rotate-x-180 *:rotate-x-180 relative -mb-45 h-62 ${ChapterSelector ? "w-[120vw]" : "w-[100vw]"} overflow-x-auto ${fullscreen ? 'lg:mt-4' : ''}`}>
        <div
          className={`absolute bottom-0 mb-2 -ml-[0.225rem] flex h-10 w-[195vw] lg:w-full flex-none items-center gap-1 lg:-ml-1`}
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
          <button
            className="material-icons mt-2 ml-7 w-10 text-[2.5rem]! transition-all duration-300 hover:text-[2.6rem]!"
            onClick={toggleFullscreen}
          >
            {icon}
          </button>
        </div>
      </div>
      <div
        className={`flex-1 overflow-hidden rounded-2xl border ${fullscreen ? 'mb-4 lg:mb-0' : ''}`}
      >
        <div
          className="h-full overflow-y-auto p-1"
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
  )
}
