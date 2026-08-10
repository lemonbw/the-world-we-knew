import { useState } from 'react';

export const useFontSelectorState = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenFonts, setIsHiddenFonts] = useState(true);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  return {
    isHidden,
    setIsHidden,
    isHiddenFonts,
    setIsHiddenFonts,
    hoveredFont,
    setHoveredFont,
  };
};
