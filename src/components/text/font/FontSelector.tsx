import { useDeferredValue } from 'react';
import { useAvailableFonts } from '@/src/shared/hooks/fonts';
import { useFontSelectorState } from '@/src/shared/hooks/fonts';
import { useClickOutside } from '@/src/shared/hooks/useClickOutside';
import SearchInput from '@/src/shared/ui/SearchInput';

type FontSelectorProps = {
  currentFont: string;
  setCurrentFont: (font: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

export function FontSelector({
  currentFont,
  setCurrentFont,
  query,
  setQuery,
}: FontSelectorProps) {
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
    'w-28 lg:w-49 p-1 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]';

  return (
    <div
      ref={divRef}
      className="relative mt-[1px] mr-1 inline-block h-9 w-40 lg:w-60 px-2 py-1"
    >
      <div className="flex rounded-sm border-1">
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
          className="material-icons w-6 border-l text-lg"
        >
          keyboard_arrow_down
        </button>
      </div>

      <div
        className={`absolute top-10 left-0 z-50 ml-2 flex h-48 w-36 lg:w-56 flex-col overflow-y-auto rounded border-1 bg-black text-white shadow ${isHidden ? 'hidden' : ''
          }`}
      >
        <button
          key="toggle-hidden"
          className="relative px-2 py-1 text-left duration-500 ease-in-out hover:text-black"
          onClick={() => setIsHiddenFonts(!isHiddenFonts)}
          onMouseEnter={() => setHoveredFont('toggle-hidden')}
          onMouseLeave={() => setHoveredFont(null)}
        >
          {isHiddenFonts
            ? 'Недоступные шрифты скрыты'
            : 'Недоступные отображены'}
          <span
            className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-white transition-all duration-500 ${hoveredFont === 'toggle-hidden' ? 'w-0 lg:w-full' : 'w-0'
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
            className={`relative px-2 py-1 text-left duration-500 ease-in-out hover:text-black ${currentFont === font ? 'font-bold' : ''
              }`}
          >
            <span
              className={`absolute bottom-0 left-0 -z-10 h-full origin-left bg-white transition-all duration-500 ${hoveredFont === font ? 'w-0 lg:w-full' : 'w-0'
                }`}
            ></span>
            {font}
          </button>
        ))}
      </div>
    </div>
  );
}
