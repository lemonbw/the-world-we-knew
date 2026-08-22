'use client';
import { useEffect } from 'react';
import { useMedia } from 'use-media';
import { fontSizes } from '@/src/shared/lib/fonts';
import { useFontSizeSelectorState } from '@/src/features/text-settings';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import { parseFontSize } from '@/src/shared/lib/fonts';

type FontSizeSelectorProps = {
  currentSize: number;
  setCurrentSizeAction: (size: number) => void;
};

export const FontSizeSelector = ({
  currentSize,
  setCurrentSizeAction,
}: FontSizeSelectorProps) => {
  const {
    isHidden,
    setIsHidden,
    hoveredSize,
    setHoveredSize,
    tempSize,
    setTempSize,
  } = useFontSizeSelectorState(currentSize);

  const divRef = useClickOutside<HTMLDivElement>(() => setIsHidden(true));

  const isLarge = useMedia({ minWidth: 1024 });

  useEffect(() => {
    if (!isLarge) setTempSize('16');
    else setTempSize('20');
  }, [isLarge, setTempSize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseFontSize(tempSize);
      if (parsed !== null) {
        setCurrentSizeAction(parsed);
        setTempSize(String(parsed));
      }
    }
  };

  return (
    <div ref={divRef} className="relative mt-2 h-9">
      <div className="flex h-full rounded-sm border-2">
        <input
          type="text"
          value={tempSize}
          onChange={(e) => setTempSize(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-full w-10 rounded-l-sm bg-white p-1 outline-none! focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)] dark:bg-black"
        />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons w-6 border-l-2 bg-white text-lg dark:bg-black"
        >
          keyboard_arrow_down
        </button>
      </div>
      <div
        className={`absolute top-10 left-0 z-50 flex h-48 w-17 flex-col overflow-y-auto rounded border-1 bg-white shadow dark:bg-black ${
          isHidden ? 'hidden' : ''
        }`}
      >
        {fontSizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => {
              setCurrentSizeAction(size);
              setTempSize(String(size));
              setIsHidden(true);
            }}
            onMouseEnter={() => setHoveredSize(size)}
            onMouseLeave={() => setHoveredSize(0)}
            className={`relative border-b-2 px-2 py-1 text-left duration-500 ease-in-out lg:hover:text-white lg:dark:hover:text-black ${currentSize === size ? 'font-bold' : ''}`}
          >
            <span
              className={`absolute bottom-0 left-0 -z-10 h-full w-full origin-left bg-black transition-transform duration-500 dark:bg-white ${hoveredSize === size ? 'scale-x-0 lg:scale-x-100' : 'scale-x-0'}`}
            ></span>

            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
