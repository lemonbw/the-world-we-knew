'use client';
import { useState, useEffect, useRef } from 'react';
import { useMedia } from 'use-media';
import {
  FontSelector,
  FontSizeSelector,
  AlignSelector,
} from '@/src/components/text';
import useFullscreen from '@/src/shared/hooks/useFullscreen';
import ReadingContent from '@/src/components/ReadingContent';
import { useReadingState } from '@/src/shared/hooks/reading/useReadingState';

export default function Description() {
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

  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/overview.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) setCurrentSize(16);
    else setCurrentSize(20);
  }, [isLarge, setCurrentSize]);

  const { fullscreen, toggleFullscreen } = useFullscreen({
    readingSection,
  });

  const icon = fullscreen ? 'fullscreen_exit' : 'fullscreen';

  const genres = [
    'хоррор',
    'военная проза',
    'тёмное фэнтези',
    'научная фантастика',
    'романтика',
  ];

  const topScrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topScroll = topScrollRef.current;
    const content = contentRef.current;

    if (!topScroll || !content) return;

    let syncing = false;

    const syncTop = () => {
      if (syncing) return;
      syncing = true;
      content.scrollLeft = topScroll.scrollLeft;
      syncing = false;
    };

    const syncContent = () => {
      if (syncing) return;
      syncing = true;
      topScroll.scrollLeft = content.scrollLeft;
      syncing = false;
    };

    topScroll.addEventListener('scroll', syncTop);
    content.addEventListener('scroll', syncContent);

    return () => {
      topScroll.removeEventListener('scroll', syncTop);
      content?.removeEventListener('scroll', syncContent);
    };
  }, []);

  return (
    <section
      ref={readingSection}
      id="reading-section"
      className={`mx-auto mt-4 flex h-[100vh] w-[80vw] flex-col lg:h-[105vh]`}
    >
      <div
        className="h-5 w-[100vw] overflow-x-auto lg:hidden"
        ref={topScrollRef}
      >
        <div className="w-[195vw]"></div>
      </div>
      <div
        className={`-mb-48 h-60 w-[100vw] overflow-x-auto ${fullscreen ? 'lg:mt-4' : ''} scrollbar-hide`}
        ref={contentRef}
      >
        <div
          className={`mb-2 -ml-[0.225rem] flex h-10 w-[195vw] flex-none items-center gap-1 lg:-ml-1`}
        >
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
          <ReadingContent className="p-1 select-text" content={content} />
          <div className="mt-3 flex flex-row flex-wrap gap-2 p-1 *:rounded-sm *:border *:px-1 *:duration-300 *:hover:bg-white *:hover:text-black">
            {genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
