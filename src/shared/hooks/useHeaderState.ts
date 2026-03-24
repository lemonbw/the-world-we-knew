import { useState, useRef, useEffect } from 'react';

export function useHeaderState() {
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

  return { hiddenHeader, setHiddenHeader, hiddenNavigation, setHiddenNavigation };
}
