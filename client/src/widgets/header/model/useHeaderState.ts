import { useState, useRef, useEffect } from 'react';
import { useMedia } from 'use-media';

export const useHeaderState = () => {
  const isDark = useMedia({ 'prefers-color-scheme': 'dark' });
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [hiddenNavigation, setHiddenNavigation] = useState(true);
  const prevScrollY = useRef(0);

  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const shouldHide = currentScroll > prevScrollY.current && currentScroll > 50;
          setHiddenHeader((prev) => (prev !== shouldHide ? shouldHide : prev));
          prevScrollY.current = currentScroll;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
