import { useDeferredValue } from 'react';
import { useAvailableFonts } from '@/src/shared/hooks/fonts/useAvailableFonts';
import { useFontSelectorState } from '@/src/features/text-settings';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import { SearchInput } from '@/src/shared/ui/SearchInput';
import { FontOptionButton } from './FontOptionButton';

type FontSelectorProps = {
  currentFont: string;
  setCurrentFont: (font: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const FontSelector = ({
  currentFont,
  setCurrentFont,
  query,
  setQuery,
}: FontSelectorProps) => {
  const { isHidden, setIsHidden, isHiddenFonts, setIsHiddenFonts } =
    useFontSelectorState();

  const deferredQuery = useDeferredValue(query);
  const filteredList = useAvailableFonts(deferredQuery, !isHiddenFonts);

  const divRef = useClickOutside<HTMLDivElement>(() => setIsHidden(true));

  const className =
    'w-full h-full px-1 xl:text-lg outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)] bg-transparent';

  return (
    <div
      ref={divRef}
      className="relative mt-2 ml-1 inline-block h-9 w-[160px] lg:w-[190px] xl:h-11 xl:w-[230px]"
    >
      <div className="flex h-full w-full rounded-sm border-2 bg-white/95 dark:bg-black/95">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onClick={() => setIsHidden(false)}
          containerClassName="flex h-full flex-1 min-w-0 flex-col items-center"
          className={className}
          placeholder={currentFont}
        />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons flex w-[40px] shrink-0 items-center justify-center border-l-2 bg-transparent text-lg xl:w-[44px] xl:text-xl"
        >
          keyboard_arrow_down
        </button>
      </div>

      <div
        className={`absolute top-10 left-0 z-50 flex h-[230px] w-[230px] flex-col overflow-y-auto rounded border-1 bg-white text-black shadow lg:w-[250px] xl:top-12 xl:w-[280px] dark:bg-black dark:text-white ${
          isHidden ? 'hidden' : ''
        }`}
      >
        <FontOptionButton
          key="toggle-hidden"
          font="toggle-hidden"
          onClick={() => setIsHiddenFonts(!isHiddenFonts)}
        >
          {isHiddenFonts
            ? 'Недоступные шрифты скрыты'
            : 'Недоступные отображены'}
        </FontOptionButton>

        {filteredList.map((font) => (
          <FontOptionButton
            key={font}
            font={font}
            isCurrent={currentFont === font}
            onClick={() => {
              setCurrentFont(font);
              setIsHidden(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};
