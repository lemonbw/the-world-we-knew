import { useState, useMemo } from "react";
import { useDeferredValue } from "react";
type FontSelectorProps = {
  currentFont: string;
  setCurrentFont: (font: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

const systemFonts = [
  // Generic families
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "serif",
  "sans-serif",
  "monospace",

  // Windows common
  "Arial",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Segoe UI",
  "Calibri",
  "Cambria",

  // macOS common
  "Helvetica",
  "Helvetica Neue",
  "San Francisco",
  "Menlo",
  "Geneva",
  "Avenir",
  "American Typewriter",

  // Linux common
  "Ubuntu",
  "Liberation Serif",
  "Liberation Sans",
  "Liberation Mono",
  "DejaVu Serif",
  "DejaVu Sans",
  "DejaVu Sans Mono",
  "Noto Serif",
  "Noto Sans",
  "Noto Mono"
];



export default function FontSelector({ currentFont, setCurrentFont, query, setQuery }: FontSelectorProps) {

  const [isHidden, setIsHidden] = useState(true);

  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  const [tempFont, setTempFont] = useState(currentFont);

  const deferredQuery = useDeferredValue(query);

  const filteredList = useMemo(() => {
    if (!deferredQuery) return systemFonts;
    const q = deferredQuery.toLowerCase();
    return systemFonts.filter(font => font.includes(q));
  }, [deferredQuery]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        setCurrentFont(tempFont);
        setIsHidden(true);
      } catch {
        console.log("Something wrong")
      }
    }
  };

  return (

    <div className="relative w-60 inline-block px-2 py-1 mr-1 h-9 mt-[1px]">
      <div className="flex border-1 rounded-sm">
        <input type="search" value={tempFont}
          onClick={() => setIsHidden(false)}
          onChange={(e) => {
            setTempFont(e.target.value);
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown} className="w-49 p-1 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]" />
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
            onMouseLeave={() => setHoveredFont("0")}
            className={`relative px-2 py-1 text-left hover:text-black ease-in-out duration-500 ${currentFont === font ? "font-bold" : ""}`}
          >
            <span className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-500 -z-10 ${hoveredFont === font ? "w-full" : "w-0"}`}></span>

            {font}
          </button>
        ))}
      </div>
    </div>
  );
}


