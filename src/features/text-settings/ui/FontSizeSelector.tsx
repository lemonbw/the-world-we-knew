'use client';
import { useEffect } from 'react';
import { useMedia } from 'use-media';
import { fontSizes } from '@/src/shared/lib/fonts/fontSizes';
import { useFontSizeSelectorState } from '@/src/features/text-settings/model';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import { parseFontSize } from '@/src/shared/lib/fonts';

type FontSizeSelectorProps = {
  currentSize: number;
  setCurrentSizeAction: (size: number) => void;
};

export function FontSizeSelector({
  currentSize,
  setCurrentSizeAction,
}: FontSizeSelectorProps) {
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
    <div
      ref={divRef}
      className="relative mt-[1px] mr-1 inline-block h-9 w-21 px-2 py-1"
    >
      <div className="flex rounded-sm border-1">
        <input
          type="text"
          value={tempSize}
          onChange={(e) => setTempSize(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-10 rounded-l-sm p-1 outline-none! focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]"
        />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons w-6 border-l text-lg"
        >
          keyboard_arrow_down
        </button>
      </div>
      <div
        className={`absolute top-10 left-0 z-50 ml-2 flex h-48 w-17 flex-col overflow-y-auto rounded border-1 bg-black text-white shadow ${isHidden ? 'hidden' : ''
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
            className={`relative px-2 py-1 text-left duration-500 ease-in-out hover:text-white lg:hover:text-black ${currentSize === size ? 'font-bold' : ''}`}
          >
            <span
              className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-white transition-all duration-500 ${hoveredSize === size ? 'lg:w-full' : 'w-0'}`}
            ></span>

            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
