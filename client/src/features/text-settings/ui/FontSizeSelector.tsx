import { useEffect } from 'react';
import { useMedia } from 'use-media';
import { fontSizes } from '@/src/shared/lib/fonts';
import { useFontSizeSelectorState } from '@/src/features/text-settings';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import { parseFontSize } from '@/src/shared/lib/fonts';
import { FontSizeOptionButton } from './FontSizeOptionButton';

type FontSizeSelectorProps = {
  currentSize: number;
  setCurrentSizeAction: (size: number) => void;
};

export const FontSizeSelector = ({
  currentSize,
  setCurrentSizeAction,
}: FontSizeSelectorProps) => {
  const { isHidden, setIsHidden, tempSize, setTempSize } =
    useFontSizeSelectorState(currentSize);

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
    <div ref={divRef} className="relative mt-2 h-9 xl:h-11">
      <div className="flex h-full rounded-sm border-2">
        <input
          type="text"
          value={tempSize}
          onChange={(e) => setTempSize(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-full w-10 rounded-l-sm bg-white p-1 outline-none! focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)] xl:w-12 xl:text-lg dark:bg-black"
        />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons w-6 border-l-2 bg-white text-lg xl:w-8 xl:text-xl dark:bg-black"
        >
          keyboard_arrow_down
        </button>
      </div>
      <div
        className={`absolute top-10 left-0 z-50 flex h-[206px] w-17 flex-col overflow-y-auto rounded border-1 bg-white shadow xl:top-12 xl:w-20 dark:bg-black ${
          isHidden ? 'hidden' : ''
        }`}
      >
        {fontSizes.map((size) => (
          <FontSizeOptionButton
            key={size}
            size={size}
            isCurrent={currentSize === size}
            onClick={() => {
              setCurrentSizeAction(size);
              setTempSize(String(size));
              setIsHidden(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};
