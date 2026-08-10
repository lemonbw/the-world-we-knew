import { useState } from 'react';

export const useFontSizeSelectorState = (currentSize: number) => {
  const [isHidden, setIsHidden] = useState(true);
  const [hoveredSize, setHoveredSize] = useState(0);
  const [tempSize, setTempSize] = useState(currentSize.toString());

  return {
    isHidden,
    setIsHidden,
    hoveredSize,
    setHoveredSize,
    tempSize,
    setTempSize,
  };
};
