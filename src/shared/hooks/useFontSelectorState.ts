import { useState } from "react";

export function useFontSelectorState(currentFont: string) {
  const [tempFont, setTempFont] = useState(currentFont);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenFonts, setIsHiddenFonts] = useState(true);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  return {
    tempFont,
    setTempFont,
    isHidden,
    setIsHidden,
    isHiddenFonts,
    setIsHiddenFonts,
    hoveredFont,
    setHoveredFont,
  };
}
