import { useEffect, useState, useDeferredValue } from 'react';
import { systemFonts, isFontRendered } from '@/src/shared/lib/fonts';

export function useAvailableFonts(query: string, showHidden: boolean) {
  const [availableFonts, setAvailableFonts] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const filtered = systemFonts.filter((font) => isFontRendered(font));
    const frame = requestAnimationFrame(() => {
      setAvailableFonts(showHidden ? systemFonts : filtered);
    });
    return () => cancelAnimationFrame(frame);
  }, [showHidden]);

  const filteredList = availableFonts.filter((f) =>
    f.toLowerCase().includes(deferredQuery.toLowerCase()),
  );

  return filteredList;
}
