import { useState } from "react";

type FontSizeSelectorProps = {
  currentSize: number;
  setCurrentSize: (size: number) => void;
};

export default function FontSizeSelector({ currentSize, setCurrentSize }: FontSizeSelectorProps) {

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 34, 36, 38, 40, 45, 50, 55, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];

  const [isHidden, setIsHidden] = useState(true);

  const [hoveredSize, setHoveredSize] = useState(0);

  const [tempSize, setTempSize] = useState(currentSize.toString());

  const filteredSize = tempSize.replace(/[^0-9+\-*/().]/g, "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const result = Function(`"use strict"; return (${filteredSize})`)();

        if (typeof result === "number" && isFinite(result)) {
          setCurrentSize(result > 120 ? 120 : result < 8 ? 8 : result);
          setTempSize(String(result > 120 ? 120 : result < 8 ? 8 : result));
        }
      } catch {
        console.log("Something wrong")
      }
    }
  };

  return (

    <div className="relative w-21 inline-block px-2 py-1 mr-1 h-9 mt-[1px]">
      <div className="flex border-1 rounded-sm">
        <input type="text" value={tempSize}
          onChange={(e) => setTempSize(e.target.value)}
          onKeyDown={handleKeyDown} className="w-10 p-1 outline-none! rounded-l-sm focus:shadow-[inset_0_0_0_1.5px_theme(colors.white)]" />
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="material-icons text-lg w-6 border-l"
        >
          keyboard_arrow_down
        </button>
      </div>
      <div
        className={`absolute h-48 overflow-y-auto border-1 left-0 top-10 w-17 ml-2 bg-black text-white flex flex-col z-50 rounded shadow ${isHidden ? "hidden" : ""
          }`}
      >
        {fontSizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => {
              setCurrentSize(size);
              setTempSize(String(size));
              setIsHidden(true);
            }}
            onMouseEnter={() => setHoveredSize(size)}
            onMouseLeave={() => setHoveredSize(0)}
            className={`relative px-2 py-1 text-left hover:text-black ease-in-out duration-500 ${currentSize === size ? "font-bold" : ""}`}
          >
            <span className={`absolute left-0 bottom-0 h-full bg-white origin-left transition-all duration-500 -z-10 ${hoveredSize === size ? "w-full" : "w-0"}`}></span>

            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

