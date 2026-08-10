import { useState, useRef, useEffect } from 'react';
import { useMedia } from 'use-media';

export const useHeaderState = () => {
  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [hiddenNavigation, setHiddenNavigation] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHiddenHeader(currentScroll > prevScrollY.current);
      prevScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isDark,
    hiddenHeader,
    setHiddenHeader,
    hiddenNavigation,
    setHiddenNavigation,
  };
};
