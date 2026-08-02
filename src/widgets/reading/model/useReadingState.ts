'use client';
import { useState, useRef } from 'react';

export function useReadingState() {
  const readingSection = useRef<HTMLElement | null>(null);

  const [currentSize, setCurrentSize] = useState(20);

  const [currentFont, setCurrentFont] = useState('system-ui');

  const [fontQuery, setFontQuery] = useState('');

  const [currentAlign, setCurrentAlign] = useState<
    'left' | 'center' | 'right' | 'justify'
  >('left');

  return {
    readingSection,
    currentSize,
    setCurrentSize,
    currentFont,
    setCurrentFont,
    fontQuery,
    setFontQuery,
    currentAlign,
    setCurrentAlign,
  };
}
