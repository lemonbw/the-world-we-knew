import { fontSizes } from "@/src/shared/lib/fonts/fontSizes"
import { useFontSizeSelectorState } from "@/src/shared/hooks/fonts"
import { useClickOutside } from "@/src/shared/hooks/useClickOutside"
import { parseFontSize } from "@/src/shared/lib/fonts";

type FontSizeSelectorProps = {
  currentSize: number;
  setCurrentSize: (size: number) => void;
};

export function FontSizeSelector({ currentSize, setCurrentSize }: FontSizeSelectorProps) {
  const { isHidden, setIsHidden, hoveredSize, setHoveredSize, tempSize, setTempSize } = useFontSizeSelectorState(currentSize)

  const divRef = useClickOutside<HTMLDivElement>(() => setIsHidden(true))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const parsed = parseFontSize(tempSize);
      if (parsed !== null) {
        setCurrentSize(parsed);
        setTempSize(String(parsed));
      }
    }
  };

  return (

    <div ref={divRef} className="relative w-21 inline-block px-2 py-1 mr-1 h-9 mt-[1px]">
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

