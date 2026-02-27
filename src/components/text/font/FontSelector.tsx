import { useDeferredValue } from "react";
import { useAvailableFonts } from "@/src/shared/hooks/fonts";
import { useFontSelectorState } from "@/src/shared/hooks/fonts";
import { useClickOutside } from "@/src/shared/hooks/useClickOutside";

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
  setQuery
}: FontSelectorProps) {
  const {
    tempFont,
    setTempFont,
    isHidden,
    setIsHidden,
    isHiddenFonts,
    setIsHiddenFonts,
    hoveredFont,
    setHoveredFont
  } = useFontSelectorState(currentFont);

  const deferredQuery = useDeferredValue(query);
  const filteredList = useAvailableFonts(deferredQuery, isHiddenFonts);

  const divRef = useClickOutside<HTMLDivElement>(() => setIsHidden(true))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentFont(tempFont);
      setIsHidden(true);
    }
  };

  return (
    <div ref={divRef} className="relative w-60 inline-block px-2 py-1 mr-1 h-9 mt-[1px]">
      <div className="flex border-1 rounded-sm">
        <input
          type="search"
          value={tempFont}
          onClick={() => setIsHidden(false)}
          onChange={(e) => {
            setTempFont(e.target.value);
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="w-49 p-1 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]"
        />

        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons text-lg w-6 border-l"
        >
          keyboard_arrow_down
        </button>
      </div>

      <div
        className={`absolute h-48 overflow-y-auto border-1 left-0 top-10 w-56 ml-2 bg-black text-white flex flex-col z-50 rounded shadow ${isHidden ? "hidden" : ""
          }`}
      >
        <button
          key="toggle-hidden"
          className="relative px-2 py-1 text-left hover:text-black ease-in-out duration-500"
          onClick={() => setIsHiddenFonts(!isHiddenFonts)}
          onMouseEnter={() => setHoveredFont("toggle-hidden")}
          onMouseLeave={() => setHoveredFont(null)}
        >
          {isHiddenFonts ? "Недоступные шрифты скрыты" : "Недоступные шрифты отображены"}
          <span
            className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-500 -z-10 ${hoveredFont === "toggle-hidden" ? "w-full" : "w-0"
              }`}
          ></span>
        </button>

        {filteredList.map((font) => (
          <button
            key={font}
            type="button"
            onClick={() => {
              setCurrentFont(font);
              setTempFont(font);
              setIsHidden(true);
            }}
            onMouseEnter={() => setHoveredFont(font)}
            onMouseLeave={() => setHoveredFont(null)}
            className={`relative px-2 py-1 text-left hover:text-black ease-in-out duration-500 ${currentFont === font ? "font-bold" : ""
              }`}
          >
            <span
              className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-500 -z-10 ${hoveredFont === font ? "w-full" : "w-0"
                }`}
            ></span>
            {font}
          </button>
        ))}
      </div>
    </div>
  );
}
