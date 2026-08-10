'use client';
import { useState } from 'react';

export const useTextSettings = () => {
  const [currentSize, setCurrentSize] = useState(20);
  const [currentFont, setCurrentFont] = useState('system-ui');
  const [fontQuery, setFontQuery] = useState('');
  const [currentAlign, setCurrentAlign] = useState<
    'left' | 'center' | 'right' | 'justify'
  >('left');

  return {
    currentSize,
    setCurrentSize,
    currentFont,
    setCurrentFont,
    fontQuery,
    setFontQuery,
    currentAlign,
    setCurrentAlign,
  };
};
