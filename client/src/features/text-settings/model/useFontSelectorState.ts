import { useState } from 'react';

export const useFontSelectorState = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenFonts, setIsHiddenFonts] = useState(true);

  return {
    isHidden,
    setIsHidden,
    isHiddenFonts,
    setIsHiddenFonts,
  };
};
