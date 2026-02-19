import { useState, useEffect, useRef, useDeferredValue } from "react";

type FontSelectorProps = {
  currentFont: string;
  setCurrentFont: (font: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

const systemFonts = [
  "Arial", "Verdana", "Tahoma", "Times New Roman", "Courier New",
  "Georgia", "Helvetica", "Ubuntu", "Liberation Serif", "Noto Sans"
];

export default function FontSelector({ currentFont, setCurrentFont, query, setQuery }: FontSelectorProps) {
  const [availableFonts, setAvailableFonts] = useState<string[]>([]);
  const [tempFont, setTempFont] = useState(currentFont);
  const [isHidden, setIsHidden] = useState(true);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const text = "mmmmmmmmmmlli";
    const fontSize = "72px";
    const baseFonts = ["monospace", "serif", "sans-serif"];

    const filtered = systemFonts.filter(font => {
      const defaultWidths = baseFonts.map(base => {
        context.font = `${fontSize} ${base}`;
        return context.measureText(text).width;
      });

      return baseFonts.some((base, index) => {
        context.font = `${fontSize} '${font}', ${base}`;
        const width = context.measureText(text).width;
        return width !== defaultWidths[index];
      });
    });

    setAvailableFonts(filtered);
  }, []);

  const filteredList = availableFonts.filter(f => f.toLowerCase().includes(deferredQuery.toLowerCase()));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentFont(tempFont);
      setIsHidden(true);
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
            onMouseLeave={() => setHoveredFont(null)}
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
