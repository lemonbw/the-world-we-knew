import { useState } from 'react';

export const useFontSizeSelectorState = (currentSize: number) => {
  const [isHidden, setIsHidden] = useState(true);
  const [tempSize, setTempSize] = useState(currentSize.toString());

  return {
    isHidden,
    setIsHidden,
    tempSize,
    setTempSize,
  };
};
