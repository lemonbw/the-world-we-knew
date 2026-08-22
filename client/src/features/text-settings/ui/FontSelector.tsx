import { useDeferredValue } from 'react';
import { useAvailableFonts } from '@/src/shared/hooks/fonts/useAvailableFonts';
import { useFontSelectorState } from '@/src/features/text-settings';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import { SearchInput } from '@/src/shared/ui/SearchInput';

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
  const {
    isHidden,
    setIsHidden,
    isHiddenFonts,
    setIsHiddenFonts,
    hoveredFont,
    setHoveredFont,
  } = useFontSelectorState();

  const deferredQuery = useDeferredValue(query);
  const filteredList = useAvailableFonts(deferredQuery, !isHiddenFonts);

  const divRef = useClickOutside<HTMLDivElement>(() => setIsHidden(true));

  const className =
    'w-[115px] h-full px-1 lg:w-full xl:text-lg outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)] bg-white dark:bg-black';

  return (
    <div
      ref={divRef}
      className="relative mt-2 ml-1 inline-block h-9 w-[160px] lg:w-[190px] xl:h-11 xl:w-[230px]"
    >
      <div className="flex h-full w-full rounded-sm border-2">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onClick={() => setIsHidden(false)}
          className={className}
          placeholder={currentFont}
        />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons text-lgbg-white w-[40px] border-l-2 text-lg xl:w-[44px] xl:text-xl dark:bg-black"
        >
          keyboard_arrow_down
        </button>
      </div>

      <div
        className={`absolute top-10 left-0 z-50 flex h-48 w-full flex-col overflow-y-auto rounded border-1 bg-white text-black shadow xl:top-12 dark:bg-black dark:text-white ${
          isHidden ? 'hidden' : ''
        }`}
      >
        <button
          key="toggle-hidden"
          className="relative border-b-2 px-2 py-1 text-left duration-500 ease-in-out lg:hover:text-white lg:dark:hover:text-black"
          onClick={() => setIsHiddenFonts(!isHiddenFonts)}
          onMouseEnter={() => setHoveredFont('toggle-hidden')}
          onMouseLeave={() => setHoveredFont(null)}
        >
          {isHiddenFonts
            ? 'Недоступные шрифты скрыты'
            : 'Недоступные отображены'}
          <span
            className={`absolute bottom-0 left-0 -z-10 h-full w-full origin-left bg-black transition-transform duration-500 dark:bg-white ${
              hoveredFont === 'toggle-hidden'
                ? 'scale-x-0 lg:scale-x-100'
                : 'scale-x-0'
            }`}
          ></span>
        </button>

        {filteredList.map((font) => (
          <button
            key={font}
            type="button"
            onClick={() => {
              setCurrentFont(font);
              setIsHidden(true);
            }}
            onMouseEnter={() => setHoveredFont(font)}
            onMouseLeave={() => setHoveredFont(null)}
            className={`relative border-b-2 px-2 py-1 text-left duration-500 ease-in-out lg:hover:text-white lg:dark:hover:text-black ${
              currentFont === font ? 'font-bold' : ''
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 -z-10 h-full w-full origin-left bg-black transition-transform duration-500 dark:bg-white ${
                hoveredFont === font ? 'scale-x-0 lg:scale-x-100' : 'scale-x-0'
              }`}
            ></span>
            {font}
          </button>
        ))}
      </div>
    </div>
  );
};
